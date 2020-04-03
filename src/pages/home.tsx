import React from 'react'
import styled from 'styled-components'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import Connectors from '../components/connectors'
import Header from '../components/header'
import Visualiser from '../components/visualiser'

import { DataTray } from '../components/interfaces'

interface Props {
  'data-tray'?: DataTray
}

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`

/**
 * For now, only the home page will ever load. Can use something like react router later.
 * This renders the visualiser, connector and log components.
 * @param dataTray
 * @constructor
 */
const Home: React.FC<Props> = ({ 'data-tray': dataTray = null }) => (
  <Container>
    <Header />
    <DndProvider backend={Backend}>
      <Visualiser dataTray={dataTray} dropEffect="move" />
      <br />
      <Connectors dropEffect="copy" />
    </DndProvider>
    {/*<Logs dataTray={dataTray} />*/}
  </Container>
)

export default Home
