import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const white = '#f0f0f0'
export const blackBg = '#171717'

export const BaseStyles = createGlobalStyle`
  ${reset}
  
  *{
    box-sizing: border-box;
  }
  
  body{
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: ${blackBg};
    color: ${white};
    line-height: 1.4;
    font-size: 0.8rem;
  }
`
