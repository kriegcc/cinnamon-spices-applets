import { AnimationRotation, RenderOptions } from "AnimatedFish"

export type GetRenderOptionProps = {
  isHorizontalPanel: boolean

  isAutoMargin: boolean
  customMargin: number

  isAutoFit: boolean
  isPreserveAnimationOriginalDimensions: boolean
  isPreserveAspectRation: boolean
  customHeight: number
  customWidth: number

  isRotated: boolean
  // rotation: AnimationRotation
}

export function getRenderOptions(props: GetRenderOptionProps): RenderOptions {
  const {
    isHorizontalPanel,
    isAutoMargin,
    customMargin,
    isAutoFit,
    isPreserveAnimationOriginalDimensions,
    isPreserveAspectRation,
    customHeight,
    customWidth,
  } = props

  const height = undefined
  const width = undefined
  const rotation: AnimationRotation | undefined = undefined

  const renderOptions: RenderOptions = {
    height,
    width,
    rotation,
  }
  return renderOptions
}

export function sum(a: number, b: number): number {
  return a + b
}

// private newDetermineAnimationRenderOptions(): RenderOptions {
//   let height = undefined
//   let width = undefined
//   let rotation: AnimationRotation | undefined = undefined

//   let isRotated = this.settingsObject.rotate
//   // Guard to allow rotation only on vertical panel (as stated in setting's description). Maybe remove in future.
//   if (isRotated && isHorizontalOriented(this.orientation)) {
//     isRotated = false
//   }
//   if (isRotated) {
//     rotation = 90
//   }
//   // TODO: rotation override

//   const isInHorizontalPanel = isHorizontalOriented(this.orientation)

//   const margins = this.settingsObject.autoAnimationMargins
//     ? this.getAppletMargin()
//     : this.settingsObject.customAnimationMargins

//   const isAutoFit = this.settingsObject.autoFitAnimationDimensions

//   const isPreserveDimensions = this.settingsObject.preserveAnimationOriginalDimensions
//   const isPreserveAspectRatio = this.settingsObject.preserveAnimationAspectRatio

//   const customWidth = this.settingsObject.customAnimationWidth
//   const customHeight = this.settingsObject.customAnimationHeight

//   if (isAutoFit) {
//     if (isInHorizontalPanel) {
//       if (isRotated) {
//         height = undefined
//         width = this.panelHeight - margins
//       } else {
//         height = this.panelHeight - margins
//         width = undefined
//       }
//     } else {
//       if (isRotated) {
//         height = this.panelHeight - margins
//         width = undefined
//       } else {
//         height = undefined
//         width = this.panelHeight - margins
//       }
//     }
//   } else if (isPreserveDimensions) {
//     height = undefined
//     width = undefined
//   } else {
//     height = customHeight
//     width = customWidth
//     if (isPreserveAspectRatio) {
//       if (isInHorizontalPanel) {
//         if (isRotated) {
//           height = undefined
//         } else {
//           width = undefined
//         }
//       } else {
//         if (isRotated) {
//           width = undefined
//         } else {
//           height = undefined
//         }
//       }
//     }
//   }

//   const renderOptions: RenderOptions = {
//     height,
//     width,
//     rotation,
//   }
//   return renderOptions
// }
