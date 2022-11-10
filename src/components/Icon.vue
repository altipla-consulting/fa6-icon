
<template>
  <template></template>
</template>

<script lang="ts">
import { h, mergeProps, defineComponent, VNode, PropType } from 'vue'
import { AbstractElement, icon as faIcon, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'


function convertTag(input: AbstractElement, attrs?: any): VNode {
  // Vue treats the class and style attributes differently.
  // We need to exclude them from attrs because Vue will add them back, as to avoid duplication.
  attrs = {
    ...attrs,
    class: undefined,
    style: undefined,
  }
  return h(input.tag, mergeProps(input.attributes, attrs), input.children ? input.children.map(child => convertTag(child)) : [])
}


export default defineComponent({
  name: 'ac-icon',

  props: {
    variant: {
      type: String as PropType<'regular' | 'solid' | 'light' | 'brands' | 'duotone' | 'thin'>,
      validator: (t: string) => ['regular', 'solid', 'light', 'brands', 'duotone', 'thin'].includes(t),
    },
    regular: Boolean,
    solid: Boolean,
    light: Boolean,
    brands: Boolean,
    duotone: Boolean,
    thin: Boolean,

    fixedWidth: Boolean,
    spin: Boolean,
    pulse: Boolean,

    size: String,
    transform: String,
  },

  setup(props, { slots, attrs }) {
    return () => {
      let prefix: IconPrefix | undefined
      if (props.regular || props.variant === 'regular') {
        prefix = 'far'
      } else if (props.solid || props.variant === 'solid') {
        prefix = 'fas'
      } else if (props.light || props.variant === 'light') {
        prefix = 'fal'
      } else if (props.brands || props.variant === 'brands') {
        prefix = 'fab'
      } else if (props.duotone || props.variant === 'duotone') {
        prefix = 'fad'
      } else if (props.thin || props.variant === 'thin') {
        prefix = 'fat'
      }
      if (!prefix) {
        throw new Error(`Missing icon prefix configuration. Pass one of {solid,regular,light,brands,duotone,thin} props.`)
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

      let icon = faIcon({ prefix: prefix, iconName }, { classes })
      if (!icon) {
        throw new Error(`could not find icon: ${prefix}-${iconName}`)
      }

      return convertTag(icon.abstract[0], attrs)
    }
  },
})
</script>
