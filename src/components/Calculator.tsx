import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { selectStyleT } from '@/styles'
import { Button } from '@chakra-ui/react'

export const Calculator = () => {
  const param = useSelector((state: any) => state.param)
  let prices = param.prices

  const [firstBar, setFirstBar] = useState('')
  const [secondBar, setSecondBar] = useState('')

  const [state, setState] = useState({
    assetSelect: { value: 'avalanche-2', label: 'AVAX', ticker: 'AVAX' },
    secAssetSelect: { value: 'ethereum', label: 'ETH', ticker: 'ETH ' },
    flip: false,
    satoshi: 30,
    gwei: 1000,
    try: 1,
  })
  let flip = state.flip
  let firstBarId = state.assetSelect.value
  let secondBarId = state.secAssetSelect.value

  useEffect(() => {
    handleBarChange(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip, state.assetSelect, state.secAssetSelect])

  //onChange Calc
  const handleFlipChange = (x) => {
    setState({
      ...state,
      flip: !state.flip,
    })
    setFirstBar(secondBar)
  }
  const handleAssetSelectChange = (e, name) => {
    setState({
      ...state,
      [!flip
        ? name.name === 'assetSelect'
          ? 'assetSelect'
          : 'secAssetSelect'
        : name.name !== 'assetSelect'
        ? 'assetSelect'
        : 'secAssetSelect']: e,
    })
  }

  const handleBarChange = (x: any) => {
    let isFirstBar =
      x == null ? true : x.target.name === 'firstBar' ? true : false
    let value =
      x == null
        ? firstBar
        : x.target.value.replace(/,/g, '.').replace(/[^0-9\.]+/g, '')
    let secBarForFrst = !flip
      ? prices[firstBarId].usd * (value / prices[secondBarId].usd)
      : prices[secondBarId].usd * (value / prices[firstBarId].usd)
    let firstBarForSec = !flip
      ? prices[secondBarId].usd * (value / prices[firstBarId].usd)
      : prices[firstBarId].usd * (value / prices[secondBarId].usd)
    let input = value
    if (isFirstBar) {
      let output = secBarForFrst.toFixed(3)
      setFirstBar(input)
      setSecondBar(output)
    } else {
      let output = firstBarForSec.toFixed(3)
      setFirstBar(output)
      setSecondBar(input)
    }
  }

  let assetOps = param.params.assetOptions.map((x) => ({
    value: x.value,
    label: x.ticker,
    ticker: x.ticker,
  }))
  return (
    <>
      {param.isLoaded && (
        <div className="dfc w-100 pb-4">
          <p className="preview bb-0 brt-lr tc f-09">Compare Currency</p>
          <p className="bl-1 br-1 boc-b1">
            Usd: $
            {!flip
              ? (prices[firstBarId].usd * Number(firstBar)).toFixed(2)
              : (prices[secondBarId].usd * Number(firstBar)).toFixed(2)}
          </p>
          <div className="preview jc-sb ai-c brb-lr bt-0 h-mc">
            <span className="dfc jc-c ai-c">
              <Button
                className="mb-2"
                variant="info"
                onClick={() => {
                  setFirstBar('')
                  setSecondBar('')
                }}
              >
                Reset
              </Button>
              {/* <ToggleSlideSwitch
                id="calc-switch"
                small={false}
                checked={flip}
                optionLabels={['flip', 'flip']}
                onChange={(x) => handleFlipChange(x)}
              /> */}
            </span>
            <span className="dfc w-30 p-1">
              <Select
                name="assetSelect"
                isSearchable={true}
                value={!flip ? state.assetSelect : state.secAssetSelect}
                onChange={handleAssetSelectChange}
                options={assetOps}
                styles={selectStyleT}
              />
              <input
                name="firstBar"
                type="text"
                inputMode="decimal"
                className="preview br-1 brb-lr ta-c bt-0"
                onChange={(x) => handleBarChange(x)}
                value={firstBar}
              />
            </span>
            <span className="dfc w-30 p-1">
              <Select
                name="secAssetSelect"
                isSearchable={true}
                value={flip ? state.assetSelect : state.secAssetSelect}
                onChange={handleAssetSelectChange}
                options={assetOps}
                styles={selectStyleT}
              />
              <input
                name="secBar"
                type="text"
                inputMode="decimal"
                className="preview brb-lr ta-c bt-0"
                onChange={(x) => handleBarChange(x)}
                value={secondBar}
              />
            </span>
          </div>
        </div>
      )}
    </>
  )
}
