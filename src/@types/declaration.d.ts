declare module '*.scss'

// In order for us to use named imports when it comes to css classes the below code
// was commented. This is useful for us to be able to test if our components have the
// expected css class applied.

// declare module '*.scss' {
//   const content: { [className: string]: string }
//   export default content
// }

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// TODO: find or create definitions for these modules
declare module 'append-query'
declare module 'react-test-renderer'
declare module 'uuid'

declare namespace NodeJS {
  interface Process {
    browser: boolean
  }
  interface Global {
    __rootdir__: string
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'oc-component': any
  }
}

global.__rootdir__ = __dirname || process.cwd()
