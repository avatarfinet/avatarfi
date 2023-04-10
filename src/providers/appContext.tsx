import { getUserFields } from '@/lib'
import { setUser } from '@/store'
import clientAuth from '@/utils/middlewares/clientAuth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface AppContextInterface {}

const AppContext = createContext({} as AppContextInterface)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  // States
  const authId = useSelector((state: RootState) => state.auth.id)

  // CONTEXT
  //==============================================
  const contextData: AppContextInterface = {}
  // EFFECTS
  //==============================================
  // HANDLE AUTH
  useEffect(() => {
    if (!authId && !!clientAuth().get('avatarfi_access_token'))
      clientAuth().remove({ field: 'avatarfi_access_token', path: '/' })

    if (!authId && ['/profile', '/portfolio'].includes(router.pathname))
      router.push('/')

    if (!!authId)
      getUserFields({ id: authId, fields: ['trackedGeckoCoins'] })
        .then((res: any) =>
          dispatch(
            setUser({ trackedGeckoCoins: res.data?.trackedGeckoCoins ?? [] })
          )
        )
        .catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authId])

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
