import React, { useEffect } from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

const TvWidgets = (props) => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let options = [
    /*{s:"BINANCE:MATICUSDT", i:"D", h:"20rem", mxw:"580px"},
        {s:"BINANCE:ADAUSDT", i:"D", h:"20rem", mxw:"580px"},
        ,{ s: "INDEX:DXY", i: "D", h: "20rem", mxw: "385px" }
        { s: "OKEX:AVAXETH", i: "D", h: "20rem", mxw: "385px" }*/
    { s: 'BINANCE:AVAXUSDT', i: 'D', h: '20rem', mxw: '385px' },
  ]

  return (
    <div className="df fw p-3 ai-c jc-c">
      {options.map((x, index) => (
        <div
          className="w-100 p-1"
          style={{ height: x.h, maxWidth: x.mxw }}
          key={index}
        >
          <TradingViewWidget
            symbol={x.s}
            theme={Themes.DARK}
            interval={x.i}
            locale="en"
            autosize
          />
        </div>
      ))}
    </div>
  )
}

export default TvWidgets
