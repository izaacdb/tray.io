import React, { useState } from 'react'
import styled from 'styled-components'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import Event from './event'
import { colours } from './constants'
import { EventItem, ItemTypes } from './interfaces'
import { checkItemExists } from './visualiser'

interface Props {
  dropEffect: string
}

const Container = styled.div`
  border: 1px solid black;
  background-color: ${colours.black};
  padding: 1.5rem;
  width: 1000px;
  min-height: 150px;
  ${({ isOver }) => isOver && 'background-color: green'};
`

const Connectors: React.FC<Props> = ({ dropEffect }) => {
  const [events, setEvents] = useState<EventItem[]>([])

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.EVENT,
    drop(eventItem: EventItem, monitor) {
      if (!checkItemExists(eventItem, events)) {
        setEvents(ev => [...ev, eventItem])
      }
      return undefined
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <Container ref={drop} isOver={isOver}>
      {events.map(event => {
        return <Event key={event.name} event={event} position="unset" />
      })}
    </Container>
  )
}

export default Connectors
