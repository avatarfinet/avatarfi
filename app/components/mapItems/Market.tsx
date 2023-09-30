import { toggleToSelectedGeckoCoins } from '@/lib/store'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Image, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Dispatch } from 'react'

function convertToInternationalCurrencySystem(
  value: string | number | undefined
) {
  // Nine Zeroes for Billions
  return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(value)).toFixed(5)
}

interface MarketProps {
  data: GeckoMarketResult
  editing?: boolean
  selected?: boolean
  dispatch?: Dispatch<any>
}

const percentageChanges = [
  'price_change_percentage_1h_in_currency',
  'price_change_percentage_24h_in_currency',
  'price_change_percentage_7d_in_currency',
]

const Market = ({ data, editing, selected, dispatch }: MarketProps) => {
  const {
    id,
    symbol,
    image,
    current_price,
    ath,
    market_cap,
    total_volume,
    interest,
    max_supply,
    total_supply,
    circulating_supply,
  } = data

  const ticker = symbol.toUpperCase()

  const columns: ColumnsType<any> = [
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              style={{ cursor: 'grab', color: '#1DA1F2' }}
              onClick={() =>
                window.confirm('Open CoinGecko ' + ticker + ' Link?') &&
                window.open('https://www.coingecko.com/en/coins/' + id)
              }
            >
              {ticker}
            </span>
            <Image
              style={{ marginLeft: 5 }}
              width={15}
              height={15}
              src={image}
              alt={id + '-img'}
            />
          </div>
          {!!current_price && <div>${current_price.toFixed(5)}</div>}
          <div>Ath ${convertToInternationalCurrencySystem(ath)}</div>
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {!!market_cap && (
            <div>Cap {convertToInternationalCurrencySystem(market_cap)}</div>
          )}
          {!!total_volume && (
            <div>Vol ${convertToInternationalCurrencySystem(total_volume)}</div>
          )}
          {!!interest && (
            <div>Int {convertToInternationalCurrencySystem(interest)}</div>
          )}
          {!percentageChanges.every((i) => !data?.[i]) && (
            <>
              {percentageChanges.map((m, index) => {
                const value = data?.[m]
                if (!!value) {
                  return (
                    <div
                      key={index}
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <div>
                        {m.substring(24, 27).replace('_', '')} %
                        {value.toFixed(0)}
                      </div>
                      {value > 0 ? (
                        <UpOutlined style={{ color: 'green' }} />
                      ) : (
                        <DownOutlined style={{ color: 'red' }} />
                      )}
                    </div>
                  )
                }
                return null
              })}
            </>
          )}
          {!!max_supply && (
            <div>Max {convertToInternationalCurrencySystem(max_supply)}</div>
          )}
          {!!total_supply && (
            <div>
              Total {convertToInternationalCurrencySystem(total_supply)}
            </div>
          )}
          {!!circulating_supply && (
            <div>
              Circ {convertToInternationalCurrencySystem(circulating_supply)}
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={[{ key: id, name: 'Market' }]}
      pagination={false}
      rowKey="key"
      onRow={(record) => ({
        onClick: () => {
          if (editing && !!dispatch) {
            dispatch(toggleToSelectedGeckoCoins(id))
          }
        },
        style: {
          cursor: !editing ? 'default' : 'grab',
          borderRadius: '1rem',
          boxShadow: `0px 0px 4px 4px ${
            !editing ? 'rgba(0, 0, 0, 0.05)' : !selected ? '#5C7CC0' : '#D39A41'
          }`,
          border: '1px solid',
          borderColor: 'white',
          padding: '1rem',
          maxWidth: 140,
        },
      })}
    />
  )
}

export default Market
