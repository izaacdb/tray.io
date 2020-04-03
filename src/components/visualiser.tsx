import React, { useEffect, useState } from 'react'
import { DropTargetMonitor, useDrop, XYCoord } from 'react-dnd'
import styled from 'styled-components'
import Event from './event'
import update from 'immutability-helper'
import { lengths, colours } from './constants'

import { DataTray, EventItem, ItemTypes } from './interfaces'

export interface Props {
  dropEffect: string
  dataTray: DataTray
}

const Container = styled.div`
  border: 1px solid black;
  background-color: ${colours.black};
  width: ${lengths.container}px;
  height: ${lengths.container}px;
  position: relative;
`

/**
 * This function creates data for the event boxes which you can
 * drag around. They have a type param so later on you can filter
 * them however you need to.
 */
const dataToEventItem = (dataTray: DataTray): EventItem => {
  const {
    connector: { name, iconURL },
    coords: { x: left, y: top }
  } = dataTray
  return {
    name,
    iconURL,
    top,
    left,
    type: ItemTypes.CONNECTOR
  }
}

/**
 * This makes sure no duplicate items are added from the library.
 */
export const checkItemExists = (event: EventItem, events: EventItem[]) => {
  return events.find(ev => ev.name === event.name)
}

/**
 * This fixes the bounds and makes sure everything shows
 * up within the container, subtract the padding.
 */
export const setPosition = (pos: number, bound: number) => {
  if (pos > lengths.container - bound) {
    return lengths.container - bound - lengths.padding * 2
  }
  if (pos < lengths.padding) {
    return lengths.padding
  }
  return pos
}

/**
 * Handles moving the boxes around within the visualiser.
 */
export const moveEvent = (item: EventItem, monitor: DropTargetMonitor, setEvents, events: EventItem[]) => {
  const { x, y } = monitor.getDifferenceFromInitialOffset() as XYCoord
  let { left: l, top: t } = item

  const top = setPosition(t + y, lengths.eventHeight)
  const left = setPosition(l + x, lengths.eventWidth)

  const index = events.findIndex(ev => ev.name === item.name)
  const updatedEvents = update(events, {
    [index]: { $merge: { left, top } }
  })
  setEvents(updatedEvents)
}

/**
 * This renders the visualiser from where you can drag events around and to the connectors box
 * @param dataTray
 * @constructor
 */
const Visualiser: React.FC<Props> = ({ dataTray }) => {
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => {
    if (!dataTray?.trayTrollSays) {
      // disables useless code
      const eventItem = dataToEventItem(dataTray)
      // checks for duplicates
      if (!checkItemExists(eventItem, events)) {
        const item = {
          ...eventItem,
          // fixes bad data, keeps things within container bounds
          top: setPosition(eventItem.top, lengths.eventHeight),
          left: setPosition(eventItem.left, lengths.eventWidth)
        }
        setEvents(ev => [...ev, item])
      }
      return undefined
    }
  }, [dataTray, events])

  const [{ canDrop, isOver }, drop] = useDrop({
    // later on this can be adapted to filter different things
    accept: ItemTypes.CONNECTOR,
    drop(item: EventItem, monitor) {
      moveEvent(item, monitor, setEvents, events)
      return undefined
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver

  return (
    <Container data-testid="visualiser" ref={drop} isActive={isActive}>
      {events.map(event => (
        <Event key={event.name} event={event} />
      ))}
    </Container>
  )
}

export default Visualiser
