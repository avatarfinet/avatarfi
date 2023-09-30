import { Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { portStatusCalc } from '../lib/utils/Calculations'

const { Title, Text } = Typography

export const Results = ({ isLoading, prices, portfolio }: any) => {
  const [state, setState] = useState({
    entryCalc: 0,
    entryTotal: 0,
    currentTotal: 0,
    realizedLp: 0,
    unrealizedLp: 0,
    fundingTotal: 0,
  })

  const setResultState = () => {
    let results = portStatusCalc({ portfolio, prices })
    setState({
      entryCalc: results.entryCalc,
      fundingTotal: results.fundingTotal,
      currentTotal: results.currentTotal,
      entryTotal: results.entryTotal,
      realizedLp: results.realizedLp,
      unrealizedLp: results.unrealizedLp,
    })
  }

  useEffect(() => {
    setResultState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  let eC = state.entryCalc
  let eT = state.entryTotal
  let cT = state.currentTotal
  let rP = state.realizedLp
  let uRL = state.unrealizedLp
  let fT = state.fundingTotal

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        margin: 12,
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
      }}
    >
      <Title level={4} style={{ marginBottom: '10px' }}>
        Portfolio Results
      </Title>
      <Space align="center">
        <Text style={{ fontSize: '16px', paddingRight: '10px' }}>
          Current Total:{' '}
          <Text
            strong
            style={{
              color:
                eT <= 0
                  ? cT < fT
                    ? 'yellow'
                    : 'green'
                  : cT < eT
                  ? 'yellow'
                  : 'green',
            }}
          >
            &nbsp;${isNaN(cT) ? 0 : +parseFloat(cT.toFixed(0))}
          </Text>
        </Text>
      </Space>
      <Space align="center">
        Potential l/p:{' '}
        <Text
          strong
          style={{ color: uRL < 0 ? 'yellow' : 'green', paddingLeft: '10px' }}
        >
          &nbsp;${+parseFloat(uRL.toFixed(0))}
        </Text>
      </Space>
      <Space align="center" style={{ marginLeft: 'auto' }}>
        Realized l/p:{' '}
        <Text
          strong
          style={{ color: rP < 0 ? 'yellow' : 'green', paddingLeft: '10px' }}
        >
          &nbsp;${+parseFloat(rP.toFixed(0))}
        </Text>
      </Space>
      <Space style={{ justifyContent: 'center' }}>
        <div>
          <Text>
            Entry:{' '}
            <Text
              strong
              style={{ fontSize: '14px', paddingTop: '5px', display: 'block' }}
            >
              {isNaN(eT) ? (
                0
              ) : (
                <>
                  <Text>{+parseFloat(eC.toFixed(0))}</Text> -{' '}
                  <Text>{rP <= 0 ? 0 : +parseFloat(rP.toFixed(0))}</Text> ={' '}
                  {eT < 0 ? '+' : null}$
                  <Text>{+parseFloat((eT < 0 ? eT * -1 : eT).toFixed(0))}</Text>
                </>
              )}
            </Text>
          </Text>
        </div>
        <div>
          <Text>
            Funding: <br />
            <Text strong style={{ fontSize: '14px' }}>
              ${isNaN(fT) ? 0 : +parseFloat(fT.toFixed(0))}
            </Text>
          </Text>
        </div>
      </Space>
    </div>
  )
}
