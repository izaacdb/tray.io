import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import styled from 'styled-components'
import { DropResult, EventItem } from './interfaces'

const Container = styled.div`
  border: 1px dashed grey;
  padding: 0.5rem 1rem;
  position: absolute;
  background: white;
  width: 200px;
  height: 75px;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: move;
`

interface Props {
  event: EventItem
  position?: string
}

const handleDrop = (item: EventItem | undefined, monitor: DragSourceMonitor) => {
  const dropResult: DropResult = monitor.getDropResult()
  if (item && dropResult) {
    if (dropResult.dropEffect === 'copy') {
      console.log('copying to connectors')
    } else {
      console.log('moving within visualiser')
    }
  }
}

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
      <img style={{ marginRight: '1rem' }} src={event.iconURL} alt={event.name} />
      {event.name}
    </Container>
  )
}
export default Event
