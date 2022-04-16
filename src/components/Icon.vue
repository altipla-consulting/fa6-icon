
<template>
  <template></template>
</template>

<script lang="ts">
import { h, mergeProps, defineComponent, VNode } from 'vue'
import { AbstractElement, icon as faIcon, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'


function convertTag(input: AbstractElement, attrs?: any): VNode {
  return h(input.tag, mergeProps(input.attributes, attrs), input.children ? input.children.map(child => convertTag(child)) : [])
}


export default defineComponent({
  name: 'ac-icon',

  props: {
    variant: String,
    regular: Boolean,
    solid: Boolean,
    light: Boolean,
    brands: Boolean,
    duotone: Boolean,

    fixedWidth: Boolean,
    spin: Boolean,
    pulse: Boolean,

    size: String,
    transform: String,
  },

  setup(props, { slots, attrs }) {
    return () => {
      let prefix = props.variant
      if (props.regular) {
        prefix = 'far'
      } else if (props.solid) {
        prefix = 'fas'
      } else if (props.light) {
        prefix = 'fal'
      } else if (props.brands) {
        prefix = 'fab'
      } else if (props.duotone) {
        prefix = 'fad'
      }
      if (!prefix) {
        throw new Error(`Missing icon prefix configuration. Pass one of {solid,regular,light,brands,duotone} props.`)
      }

      let classes: string[] = []
      if (props.spin) {
        classes.push('fa-spin')
      }
      if (props.pulse) {
        classes.push('fa-pulse')
      }
      if (props.fixedWidth) {
        classes.push('fa-fw')
      }
      if (props.size) {
        classes.push(`fa-${props.size}`)
      }

      let def = slots.default && slots.default()[0].children
      if (!def || typeof def !== 'string') {
        throw new Error(`Empty icon content. Content of the tag should contain the icon name.`)
      }
      let iconName = def.trim() as IconName

      let icon = faIcon({ prefix: prefix as IconPrefix, iconName }, { classes })
      if (!icon) {
        throw new Error(`could not find icon: ${prefix}-${iconName}`)
      }

      return convertTag(icon.abstract[0], attrs)
    }
  },
})
</script>
