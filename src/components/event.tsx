import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import styled from 'styled-components'
import { DropResult, EventItem } from './interfaces'
import { lengths } from './constants'

const Container = styled.div`
  border: 1px dashed grey;
  position: absolute;
  background: white;
  width: ${lengths.eventWidth}px;
  height: ${lengths.eventHeight}px;
  overflow: hidden;
  cursor: move;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 ${lengths.padding}px;
  padding: ${lengths.padding}px;
`

const Img = styled.img`
  margin-right: 1rem;
  height: 100%;
`

interface Props {
  event: EventItem
  position?: string
}

/**
 * This is a stub for later on. You can write whatever you want here. Maybe a redux dispatch would be useful.
 * @param item
 * @param monitor
 */
const handleDrop = (item: EventItem | undefined, monitor: DragSourceMonitor) => {
  const dropResult: DropResult = monitor.getDropResult()
  if (item && dropResult) {
    if (dropResult.dropEffect === 'copy') {
      console.log('Copying to the connectors')
    } else {
      console.log('Moving within the visualiser')
    }
  }
}

/**
 * This creates the little box with the icon and text inside. It has some event stubs.
 * @param event
 * @param position
 * @constructor
 */
const Event: React.FC<Props> = ({ event, position = 'absolute' }) => {
  const [{ opacity }, drag] = useDrag({
    item: event,
    end(item: EventItem | undefined, monitor: DragSourceMonitor) {
      handleDrop(item, monitor)
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  return (
    <Container ref={drag} style={{ opacity, left: event.left, top: event.top, position }}>
      <Img src={event.iconURL} alt={event.name} />
      {event.name}
    </Container>
  )
}
export default Event
