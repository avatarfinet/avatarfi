import Marquee from 'react-fast-marquee'
import { Space, Statistic, Image } from 'antd'
import { useGetGeckoMarqueMarketsQuery } from '@/lib/store'
import { memo } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const TickerMarque = memo(function TickerMarque() {
  const { isLoading, data } = useGetGeckoMarqueMarketsQuery({})
  return (
    <Marquee gradient={false} speed={5} pauseOnHover>
      {!isLoading &&
        (data ?? []).map((i, index) => {
          const ticker = i.symbol.toUpperCase()
          return (
            <Statistic
              key={index}
              style={{ padding: 10 }}
              title={
                <Space>
                  <Image
                    src={i.image}
                    height={20}
                    width={20}
                    alt={ticker + '_img'}
                    preview={false}
                  />
                  {ticker}
                </Space>
              }
              value={i.price_change_percentage_24h_in_currency}
              precision={2}
              prefix={
                i.price_change_percentage_24h_in_currency < 0 ? (
                  <ArrowDownOutlined />
                ) : (
                  <ArrowUpOutlined />
                )
              }
              valueStyle={{
                color:
                  i.price_change_percentage_24h_in_currency < 0
                    ? 'red'
                    : 'green',
              }}
              suffix="%"
            />
          )
        })}
    </Marquee>
  )
})

export default TickerMarque
