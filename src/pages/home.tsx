import React from 'react'
import styled from 'styled-components'

import Visualiser from '../components/visualiser'
import Header from '../components/header'

interface Props {
  'data-tray'?: {
    coords: {
      x: number
      y: number
    }
    connector: {
      name: string
      iconURL: string
    }
    trayTrollSays?: string // This event brought to you by... Friday Night Deployment!
  }
}

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`

const Home = ({ 'data-tray': dataTray = null }) => (
  <Container>
    <Header />
    <Visualiser />
    <br />
    hello {JSON.stringify(dataTray)}
  </Container>
)

export default Home
