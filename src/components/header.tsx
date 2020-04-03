import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { lengths } from './constants'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${lengths.padding}px;
`

/**
 * This guy is in charge of updating the clock every 100ms, uses date-fns because its a very small import
 * @constructor
 */
const Header = () => {
  const [date, setDate] = useState(format(Date.now(), 'hh:mm:ss.S'))

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(format(Date.now(), 'HH:mm:ss.S'))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <Container>
      <span>Izaac's visualiser</span>
      <span>{date}⏱</span>
    </Container>
  )
}

export default Header
