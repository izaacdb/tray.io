import React, { useState } from 'react'
import styled from 'styled-components'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import Event from './event'
import { colours, lengths } from './constants'
import { EventItem, ItemTypes } from './interfaces'
import { checkItemExists } from './visualiser'

interface Props {
  dropEffect: string
}

const Container = styled.div`
  border: 1px solid black;
  background-color: ${colours.black};
  padding: ${lengths.padding}px;
  width: ${lengths.container}px;
  min-height: ${lengths.connectors}px;
  ${({ isOver }) => isOver && `background-color: ${colours.highlight}`};
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-gap: ${lengths.padding}px;
`

const H1 = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  grid-column-start: 1;
  grid-column-end: 2;
`

/**
 * This creates the connector drop-zone, checks if an item is already inside it, then adds it to the array.
 * @param dropEffect
 * @constructor
 */
const Connectors: React.FC<Props> = ({ dropEffect }) => {
  const [events, setEvents] = useState<EventItem[]>([])

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CONNECTOR,
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
      {events.length === 0 && <H1>Interesting connectors list</H1>}
    </Container>
  )
}

export default Connectors
