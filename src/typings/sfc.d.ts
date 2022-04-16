
declare module '*.ce.vue' {
  import { VueElementConstructor } from 'vue'
  const Component: ReturnType<VueElementConstructor>
  export default Component
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
