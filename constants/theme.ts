import { Platform } from 'react-native'

import { ThemeColors } from '@/types/ui'

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    background: '#FFFFFF',
    backgroundAlt: '#F8F9FA',
    textPrimary: '#212529',
    textSecondary: '#6C757D'
  },
  dark: {
    background: '#121212',
    backgroundAlt: '#1E1E1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#AAAAAA'
  }
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace'
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace'
  }
})
