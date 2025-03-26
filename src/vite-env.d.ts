/// <reference types="vite/client" />

declare module '*.txx' {
    import type { JSX } from 'react'
    const component: () => JSX.Element
    export default component
  }