import React from 'react'
import { render } from '@testing-library/react'
import Visualiser, { moveEvent, Props, setPosition } from '../components/visualiser'
import { DataTray, EventItem, ItemTypes } from '../components/interfaces'
import { lengths } from '../components/constants'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const goodTray: DataTray = {
  coords: {
    x: 50,
    y: 100
  },
  connector: {
    iconURL: '//app.tray.io/icons/streamline/hierarchy-1.svg',
    name: 'Branch'
  }
}

const badTray: DataTray = {
  trayTrollSays: 'blah',
  coords: {
    x: 123,
    y: 50
  },
  connector: {
    iconURL: '//app.tray.io/icons/streamline/hierarchy-1.svg',
    name: 'Branch'
  }
}

const testEvent: EventItem = {
  type: ItemTypes.CONNECTOR,
  name: 'test',
  top: 0,
  left: 0,
  iconURL: 'test'
}

const testMonitor = { x: 12, y: 15, getDifferenceFromInitialOffset: () => ({ x: testMonitor.x, y: testMonitor.y }) }

function renderVisualiser(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    dropEffect: 'move',
    dataTray: goodTray
  }
  return render(
    <DndProvider backend={Backend}>
      <Visualiser {...defaultProps} {...props} />{' '}
    </DndProvider>
  )
}

describe('<Visualiser />', () => {
  test('setPosition: should round up low values for eventWidth bounds', () => {
    expect(setPosition(-70, lengths.eventWidth)).toBe(lengths.padding)
  })

  test('setPosition: should round up low values for eventHeight bounds', () => {
    expect(setPosition(3, lengths.eventHeight)).toBe(lengths.padding)
  })

  test('setPosition: should round down high values for eventWidth bounds', () => {
    expect(setPosition(9123, lengths.eventWidth)).toBe(lengths.container - lengths.padding * 2 - lengths.eventWidth)
  })

  test('setPosition: should round down high values for eventHeight bounds', () => {
    expect(setPosition(55555, lengths.eventHeight)).toBe(lengths.container - lengths.padding * 2 - lengths.eventHeight)
  })

  test('moveEvent: should return a modified xy', () => {
    moveEvent(
      testEvent,
      testMonitor as any,
      result => {
        expect(result).toContainEqual({ ...testEvent, left: testMonitor.x, top: testMonitor.y })
      },
      [testEvent]
    )
  })

  xtest('bad tray data will not render anything', async () => {
    // todo: TypeError: MutationObserver is not a constructor - eugh
    const { findByTestId } = renderVisualiser({ dataTray: badTray })
    const visualiser = await findByTestId('visualiser')
    expect(visualiser).toBeEmpty()
  })
})
