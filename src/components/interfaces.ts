export enum ItemTypes {
  EVENT = 'event'
}

export interface DropResult {
  allowedDropEffect: string
  dropEffect: string
  name: string
}

export interface DataTray {
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

export interface DragItem {
  type: ItemTypes
  top: number
  left: number
}

export interface EventItem extends DragItem{
  name: string
  iconURL: string
}


