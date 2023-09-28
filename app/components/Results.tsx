'use client'

import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { portStatusCalc } from '../lib/utils/Calculations'

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
    <VStack
      align="center"
      py={3}
      spacing={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor="blackAlpha.200"
    >
      <Heading as="h4" size="lg" mb={2} pt={0}>
        Portfolio Results
      </Heading>
      <Flex align="center" ml="auto">
        <Text fontSize="lg" px={2}>
          Current Total:{' '}
          <Text
            as="span"
            fontWeight="bold"
            color={
              eT <= 0
                ? cT < fT
                  ? 'yellow.500'
                  : 'green.500'
                : cT < eT
                ? 'yellow.500'
                : 'green.500'
            }
          >
            &nbsp;${isNaN(cT) ? 0 : +parseFloat(cT.toFixed(0))}
          </Text>
        </Text>
      </Flex>
      <Flex align="center" ml="auto" px={2}>
        Potential l/p:{' '}
        <Text
          as="span"
          fontWeight="bold"
          color={uRL < 0 ? 'yellow.500' : 'green.500'}
        >
          &nbsp;${+parseFloat(uRL.toFixed(0))}
        </Text>
      </Flex>
      <Flex align="center" ml="auto" px={2}>
        Realized l/p:{' '}
        <Text
          as="span"
          fontWeight="bold"
          color={rP < 0 ? 'yellow.500' : 'green.500'}
        >
          &nbsp;${+parseFloat(rP.toFixed(0))}
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Box px={2}>
          <Text>
            Entry:{' '}
            <Text as="span" fontWeight="bold" fontSize="sm" pt={1}>
              {isNaN(eT) ? (
                0
              ) : (
                <>
                  <Text as="span">{+parseFloat(eC.toFixed(0))}</Text> -{' '}
                  <Text as="span">
                    {rP <= 0 ? 0 : +parseFloat(rP.toFixed(0))}
                  </Text>{' '}
                  = {eT < 0 ? '+' : null}$
                  <Text as="span">
                    {+parseFloat((eT < 0 ? eT * -1 : eT).toFixed(0))}
                  </Text>
                </>
              )}
            </Text>
          </Text>
        </Box>
        <Box px={2}>
          <Text>
            Funding: <br />
            <Text as="span" fontWeight="bold">
              ${isNaN(fT) ? 0 : +parseFloat(fT.toFixed(0))}
            </Text>
          </Text>
        </Box>
      </Flex>
    </VStack>
  )
}
