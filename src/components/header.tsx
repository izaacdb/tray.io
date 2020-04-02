import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 10px 10px;
`

const Header = () => {
  const [date, setDate] = useState(format(Date.now(), 'hh:mm:ss.S'))

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(format(Date.now(), 'H:mm:ss.S'))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <Container>
      <span>&lt;You&gt;'s visualiser</span>
      <span>{date}⏱</span>
    </Container>
  )
}

export default Header
