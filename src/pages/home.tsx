import React from 'react'

interface Props {
  'data-tray'?: {
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
}

const Home = ({ 'data-tray': dataTray = null }) => <div>hello {JSON.stringify(dataTray)}</div>

export default Home
