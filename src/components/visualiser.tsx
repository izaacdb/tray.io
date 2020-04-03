import React, { useEffect, useState } from 'react'
import { DropTargetMonitor, useDrop, XYCoord } from 'react-dnd'
import styled from 'styled-components'
import Event from './event'
import update from 'immutability-helper'
import { colours } from './constants'

import { DataTray, EventItem, ItemTypes } from './interfaces'

interface Props {
  dropEffect: string
  dataTray: DataTray
}

const Container = styled.div`
  border: 1px solid black;
  background-color: ${colours.black};
  width: 1000px;
  height: 1000px;
  position: relative;
`

const dataToEventItem = (data: DataTray): EventItem => {
  const {
    connector: { name, iconURL },
    coords: { x: left, y: top }
  } = data
  console.log(name)
  return {
    name,
    iconURL,
    top,
    left,
    type: ItemTypes.EVENT
  }
}

export const checkItemExists = (event: EventItem, events: EventItem[]) => {
  return events.find(ev => ev.name === event.name)
}

const Visualiser: React.FC<Props> = ({ dataTray }) => {
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => {
    if (!dataTray?.trayTrollSays) { // disables useless code
      const eventItem = dataToEventItem(dataTray) // checks for duplicates
      if (!checkItemExists(eventItem, events)) {
        setEvents(ev => [...ev, eventItem])
      }
      return undefined
    }
  }, [dataTray])

  const moveEvent = (item: EventItem, monitor: DropTargetMonitor) => {
    const { x, y } = monitor.getDifferenceFromInitialOffset() as XYCoord
    const { left, top } = item

    const index = events.findIndex(ev => ev.name === item.name)

    const updatedEvents = update(events, {
      [index]: { $merge: { left: left + x, top: top + y } }
    })
    setEvents(updatedEvents)
  }

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.EVENT,
    drop(item: EventItem, monitor) {
      moveEvent(item, monitor)
      return undefined
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver

  return (
    <Container ref={drop} isActive={isActive}>
      {events.map(event => {
        console.log(event.left)
        return <Event key={event.name} event={event} />
      })}
    </Container>
  )
}

export default Visualiser
