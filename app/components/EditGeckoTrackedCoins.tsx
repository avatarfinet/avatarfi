import { setComp, setUser } from '@/lib/store'
import { usePatchUserTrackedGeckoCoinsMutation } from '@/lib/store'
import { Button, Space, Switch, Tag, Typography, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AvatarSpinner } from './ui'

const { Text } = Typography

export default function EditGeckoTrackedCoins() {
  const dispatch = useDispatch()
  const { editingTrackedGeckoCoins, selectedGeckoCoins } = useSelector(
    (state: RootState) => {
      return {
        editingTrackedGeckoCoins: state.comp.editingTrackedGeckoCoins,
        selectedGeckoCoins: state.comp.selectedGeckoCoins,
      }
    }
  )
  const trackedGeckoCoinsLength = useSelector(
    (state: RootState) => state.user.trackedGeckoCoins.length
  )
  const id = useSelector((state: RootState) => state.auth.id)
  const [patchTrackedGeckoCoins, trackedGeckoCoinsResult] =
    usePatchUserTrackedGeckoCoinsMutation()

  const StopTracking = () => (
    <Button
      icon={<AvatarSpinner />}
      loading={trackedGeckoCoinsResult.isLoading}
      onClick={() => {
        patchTrackedGeckoCoins({
          id,
          selectedGeckoCoins,
          type: 'pull',
        })
          .then((res: any) => {
            dispatch(
              setUser({
                trackedGeckoCoins: res.data,
              })
            )
            dispatch(setComp({ selectedGeckoCoins: [] }))
            dispatch(
              setComp({
                editingTrackedGeckoCoins: !editingTrackedGeckoCoins,
              })
            )
          })
          .catch((error: any) => {
            message.error('Failed to stop tracking coins')
          })
      }}
      type={'primary'}
      size={'small'}
    >
      Stop Tracking
    </Button>
  )

  return (
    <div style={{ display: id && trackedGeckoCoinsLength ? 'block' : 'none' }}>
      <Space
        size={3}
        direction="horizontal"
        style={{
          borderRadius: 10,
          boxShadow: `0 0 10px rgba(125, 125, 125, 0.2)`,
          border: '1px solid white',
        }}
      >
        <div>
          <Space>
            <Text>Edit</Text>
            <Switch
              checked={editingTrackedGeckoCoins}
              onChange={() => {
                dispatch(
                  setComp({
                    editingTrackedGeckoCoins: !editingTrackedGeckoCoins,
                  })
                )
                !editingTrackedGeckoCoins &&
                  dispatch(setComp({ selectedGeckoCoins: [] }))
              }}
              size="small"
            />
          </Space>
        </div>
        <div style={{ display: editingTrackedGeckoCoins ? 'block' : 'none' }}>
          <div
            style={{
              padding: 3,
              borderRadius: 10,
              boxShadow: `0 0 10px rgba(125, 125, 125, 0.2)`,
              border: '1px solid white',
            }}
          >
            <div
              style={{ display: selectedGeckoCoins.length ? 'block' : 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Text>Selected Coins</Text>
                {selectedGeckoCoins.map((i) => (
                  <Tag key={i} style={{ margin: '0 5px' }}>
                    {i}
                  </Tag>
                ))}
                <StopTracking />
              </div>
            </div>
            <div
              style={{ display: selectedGeckoCoins.length ? 'none' : 'block' }}
            >
              <Text>Please select the coins below</Text>
            </div>
          </div>
        </div>
      </Space>
    </div>
  )
}
