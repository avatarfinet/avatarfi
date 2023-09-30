import { statusWidgetCalc } from '@/lib/utils/Calculations'
import { AvatarSpinner } from '../ui'
import { Divider, Typography, Image } from 'antd'
import { Prices } from '@/portfolio/page'

const { Text } = Typography

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
        const currTotal = f.amount * prices[f.value].usd
        const lossProfit = Number(currTotal) - Number(entryTotal)
        return (
          <div key={index}>
            {f.amount === 0 ? (
              <></>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '4px',
                      fontSize: '14px',
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                      padding: '8px',
                    }}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={prices[f.value].image}
                      alt={f.value + '-img'}
                      preview={false}
                      style={{ borderRadius: '50%', marginRight: '8px' }}
                    />
                    <Text strong>{f.ticker}</Text>
                    <Text style={{ marginLeft: '8px' }}>
                      ${+parseFloat(String(prices[f.value].usd)).toFixed(3)}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                      padding: '8px',
                      marginLeft: '4px',
                    }}
                  >
                    <Text
                      strong
                      style={{ color: lossProfit < 0 ? 'yellow' : 'green' }}
                    >
                      L/P $
                      {isNaN(lossProfit)
                        ? 0
                        : +parseFloat(String(lossProfit)).toFixed(2)}
                    </Text>
                    <Text>
                      {+parseFloat(String(f.amount)).toFixed(2)} {f.ticker}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                      padding: '8px',
                      marginLeft: '4px',
                    }}
                  >
                    <Text style={{ marginBottom: '8px' }}>
                      now $
                      {isNaN(currTotal)
                        ? 0
                        : +parseFloat(String(currTotal)).toFixed(0)}
                    </Text>
                    <Text style={{ marginBottom: '8px' }}>
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
                  </div>
                </div>
                <Divider />
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
