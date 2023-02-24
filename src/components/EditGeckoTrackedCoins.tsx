import { patchUserField, PATCH_PULL_USER_TRACKED_GECKO_COINS } from '@/lib'
import { setComp, setUser } from '@/store'
import {
  Button,
  HStack,
  Stack,
  Switch,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function EditGeckoTrackedCoins() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
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
  const shadowColor = useColorModeValue(
    'rgb(125, 125, 125, 0.2)',
    'rgb(250, 250, 250, 0.1)'
  )
  if (!id || !trackedGeckoCoinsLength) return <></>
  return (
    <HStack
      spacing={3}
      p={3}
      borderRadius={10}
      boxShadow={`0 0 10px ${shadowColor}`}
      border={'1px solid'}
      borderColor={'whiteAlpha.400'}
    >
      <Stack>
        <HStack>
          <Text>Edit</Text>
          <Switch
            isChecked={editingTrackedGeckoCoins}
            onChange={() => {
              dispatch(
                setComp({
                  editingTrackedGeckoCoins: !editingTrackedGeckoCoins,
                })
              )
              !editingTrackedGeckoCoins &&
                dispatch(setComp({ selectedGeckoCoins: [] }))
            }}
            size="md"
          />
        </HStack>
        {editingTrackedGeckoCoins && selectedGeckoCoins.length && (
          <Button
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true)
              patchUserField({
                id,
                actionType: PATCH_PULL_USER_TRACKED_GECKO_COINS,
                field: 'trackedGeckoCoins',
                value: selectedGeckoCoins,
              }).then((res) => {
                dispatch(
                  setUser({
                    trackedGeckoCoins: res.data.trackedGeckoCoins,
                  })
                )
                dispatch(setComp({ selectedGeckoCoins: [] }))
                setIsLoading(false)
              })
            }}
            colorScheme={'orange'}
            size={'xs'}
          >
            Stop Tracking
          </Button>
        )}
      </Stack>
      {editingTrackedGeckoCoins && (
        <Stack
          spacing={2}
          p={3}
          borderRadius={10}
          boxShadow={`0 0 10px ${shadowColor}`}
          border={'1px solid'}
          borderColor={'whiteAlpha.400'}
        >
          {!selectedGeckoCoins.length ? (
            <Text size={'xs'}>Please select the coins below</Text>
          ) : (
            <Wrap justify={'center'}>
              <Text size={'xs'}>Selected Coins</Text>
              {selectedGeckoCoins.map((i) => (
                <Tag key={i} size={'sm'}>
                  {i}
                </Tag>
              ))}
            </Wrap>
          )}
        </Stack>
      )}
    </HStack>
  )
}
