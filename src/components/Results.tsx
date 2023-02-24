import React, { useEffect, useState } from 'react'
import { portStatusCalc } from '../utils/Calculations'

export const Results = (props) => {
  const v = props.v
  const [state, setState] = useState({
    entryCalc: 0,
    entryTotal: 0,
    currentTotal: 0,
    realizedLp: 0,
    unrealizedLp: 0,
    fundingTotal: 0,
  })

  const step = props.step
  const prices = props.prices
  const portfolio = props.portfolio

  useEffect(() => {
    setResultState({ step, portfolio, prices })
  }, [prices, step, v, portfolio])

  const setResultState = (rData) => {
    let step = rData.step
    let port = rData.portfolio
    let portfolio = step === 2 ? port.filter((f) => f.isHedge) : port
    let results = portStatusCalc({ portfolio: portfolio, prices: rData.prices })
    setState({
      entryCalc: results.entryCalc,
      fundingTotal: results.fundingTotal,
      currentTotal: results.currentTotal,
      entryTotal: results.entryTotal,
      realizedLp: results.realizedLp,
      unrealizedLp: results.unrealizedLp,
    })
  }

  let eC = state.entryCalc
  let eT = state.entryTotal
  let cT = state.currentTotal
  let rP = state.realizedLp
  let uRL = state.unrealizedLp
  let fT = state.fundingTotal

  return (
    <div className="dfc jc-c pt-3 pb-3">
      <p className="mb-2 pt-0 f-1-4">
        {v === 'sub'
          ? 'Customer'
          : v === 'hedge'
          ? 'Hedge'
          : step === 1
          ? 'Whole Portfolio'
          : 'Hedge'}{' '}
        Results
      </p>
      <h5 className="p-2 df mlra ">
        Current Total:{' '}
        <i className="df mlra bold-color1">
          <p></p>
          <p
            className={
              eT <= 0
                ? cT < fT
                  ? 'c-warning'
                  : 'c-success'
                : cT < eT
                ? 'c-warning'
                : 'c-success'
            }
          >
            &nbsp;${isNaN(cT) ? 0 : +parseFloat(cT.toFixed(0))}
          </p>
        </i>
      </h5>
      <h5 className="df mlra p-2">
        Potential l/p:{' '}
        <i
          className={
            uRL < 0 ? 'c-warning bold-color1' : 'c-success bold-color1'
          }
        >
          &nbsp;${+parseFloat(uRL.toFixed(0))}
        </i>
      </h5>
      <h5 className="df mlra p-2">
        Realized l/p:{' '}
        <i
          className={rP < 0 ? 'c-warning bold-color1' : 'c-success bold-color1'}
        >
          &nbsp;${+parseFloat(rP.toFixed(0))}
        </i>
      </h5>
      <div className="df jc-c">
        <h5 className="p-2">
          Entry:{' '}
          <i className="bold-color1 f-09 df pt-1">
            {isNaN(eT) ? (
              0
            ) : (
              <>
                <p>{+parseFloat(eC.toFixed(0))}</p> -{' '}
                <p>{rP <= 0 ? 0 : +parseFloat(rP.toFixed(0))}</p> ={' '}
                {eT < 0 ? '+' : null}$
                <p>{+parseFloat((eT < 0 ? eT * -1 : eT).toFixed(0))}</p>
              </>
            )}
          </i>
        </h5>
        <h5 className="p-2">
          Funding: <br />
          <i className="bold-color1">
            ${isNaN(fT) ? 0 : +parseFloat(fT.toFixed(0))}
          </i>
        </h5>
      </div>
    </div>
  )
}
