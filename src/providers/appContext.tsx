import { getUserFields } from '@/lib'
import { setUser } from '@/store'
import clientAuth from '@/utils/middlewares/clientAuth'
import isEmpty from 'is-empty'
import { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface AppContextInterface {}

const AppContext = createContext({} as AppContextInterface)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Hooks
  const dispatch = useDispatch()
  // States
  const { id } = useSelector((state: RootState) => state.auth)

  // CONTEXT
  //==============================================
  const contextData: AppContextInterface = {}
  // EFFECTS
  //==============================================
  // HANDLE AUTH
  useEffect(() => {
    if (!!id && !!clientAuth().get('avatarfi_access_token'))
      clientAuth().remove({ field: 'avatarfi_access_token', path: '/' })

    if (!!id)
      getUserFields({ id, fields: ['trackedGeckoCoins'] }).then((res: any) =>
        dispatch(
          setUser({ trackedGeckoCoins: res.data?.trackedGeckoCoins ?? [] })
        )
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
