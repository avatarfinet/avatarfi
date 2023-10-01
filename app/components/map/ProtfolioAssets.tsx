import { statusWidgetCalc } from '@/lib/utils/Calculations'
import { AvatarSpinner } from '../ui'
import { Flex, Divider, Box, Text, Image } from '@chakra-ui/react'
import { Prices } from '@/portfolio/page'

export const ProtfolioAssets = ({
  isLoading,
  prices,
  portfolio,
}: {
  isLoading: boolean
  prices: Prices
  portfolio: any
}) => {
  let step = 1

  if (isLoading) return <AvatarSpinner />

  return (
    <>
      {statusWidgetCalc(portfolio).map((f, index) => {
        const entryTotal = f.amount * f.price
        const currTotal = f.amount * prices?.[f.value].usd
        const lossProfit = Number(currTotal) - Number(entryTotal)
        return (
          <div key={index}>
            {f.amount === 0 ? (
              <></>
            ) : (
              <>
                <Flex align="center" justify="space-between" p={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    m={1}
                    fontSize="sm"
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="blackAlpha.100"
                    py={2}
                    px={3}
                  >
                    <Image
                      borderRadius="full"
                      boxSize="20px"
                      mr={2}
                      src={prices?.[f.value].image}
                      alt={f.value + '-img'}
                    />
                    <Text fontWeight="bold">{f.ticker}</Text>
                    <Text ml={2}>
                      ${+parseFloat(String(prices?.[f.value].usd)).toFixed(3)}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="blackAlpha.200"
                    p={2}
                    ml={1}
                  >
                    <Text
                      fontWeight="bold"
                      color={lossProfit < 0 ? 'yellow.500' : 'green.500'}
                    >
                      L/P $
                      {isNaN(lossProfit)
                        ? 0
                        : +parseFloat(String(lossProfit)).toFixed(2)}
                    </Text>
                    <Text>
                      {+parseFloat(String(f.amount)).toFixed(2)} {f.ticker}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="blackAlpha.200"
                    p={2}
                    ml={1}
                  >
                    <Text mb={1}>
                      now $
                      {isNaN(currTotal)
                        ? 0
                        : +parseFloat(String(currTotal)).toFixed(0)}
                    </Text>
                    <Text mb={1}>
                      cost $
                      {isNaN(entryTotal)
                        ? 0
                        : +parseFloat(String(entryTotal)).toFixed(0)}
                    </Text>
                    <Text>
                      avg $
                      {isNaN(f.price)
                        ? 0
                        : +parseFloat(String(f.price)).toFixed(3)}
                    </Text>
                  </Box>
                </Flex>
                <Divider />
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
