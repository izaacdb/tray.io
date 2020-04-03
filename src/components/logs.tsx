import React from 'react'
import styled from 'styled-components'
import { DataTray } from './interfaces'
import { colours } from './constants'

interface Props {
  dataTray: DataTray
}

const Container = styled.pre`
  min-height: 100px;
  border: 1px solid black;
  background-color: ${colours.black};
  padding: 1.5rem;
`

const Logs: React.FC<Props> = ({ dataTray }) => {
  return <Container>{JSON.stringify(dataTray, null, 2)}</Container>
}

export default Logs
