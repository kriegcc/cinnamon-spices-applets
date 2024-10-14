import { AnimationRotation, RenderOptions } from "AnimatedFish"
import { getThemeNodeOfClass } from "./theme"

const DEFAULT_APPLET_CLASS_NAME = "applet-box"

export type RenderOptionSettings = {
  isInHorizontalPanel: boolean
  panelHeight: number

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

export function determineRenderOptionsFromSettings(props: RenderOptionSettings): RenderOptions {
  const {
    isInHorizontalPanel,
    panelHeight,
    isAutoMargin,
    customMargin,
    isAutoFit,
    isPreserveAnimationOriginalDimensions,
    isPreserveAspectRation,
    customHeight,
    customWidth,
    isRotated,
  } = props

  let height = undefined
  let width = undefined
  let rotation: AnimationRotation | undefined = undefined

  if (isRotated) {
    rotation = 90
  }

  global.log("--> getDefaultAppletMargin:", getDefaultAppletMargin())
  const margins = isAutoMargin ? getDefaultAppletMargin() : customMargin

  if (isInHorizontalPanel) {
    if (isRotated) {
      height = undefined
      width = panelHeight - margins
    } else {
      height = panelHeight - margins
      width = undefined
    }
  } else {
    if (isRotated) {
      height = panelHeight - margins
      width = undefined
    } else {
      height = undefined
      width = panelHeight - margins
    }
  }

  const renderOptions: RenderOptions = {
    height,
    width,
    rotation,
  }
  return renderOptions
}

export function getDefaultAppletMargin(): number {
  // reads and calculate margins from active CSS stylesheet, element "applet-box"
  const themeNode = getThemeNodeOfClass(DEFAULT_APPLET_CLASS_NAME)
  const margin =
    themeNode.get_horizontal_padding() +
    themeNode.get_border_width(imports.gi.St.Side.TOP) +
    themeNode.get_border_width(imports.gi.St.Side.BOTTOM)
  return margin
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
