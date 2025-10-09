import { Platform } from 'react-native'

import { ThemeColors } from '@/types/ui'

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    primary: '#121212',
    success: '#079455',
    error: '#D92D20',
    background: '#FFFFFF',
    backgroundAlt: '#F8F9FA',
    border: '#D0D5DD',
    borderError: '#F97066',
    textPrimary: '#101828',
    textSecondary: '#344054',
    textTertiary: '#475467',
    textError: '#D92D20'
  },
  dark: {
    primary: '#FFFFFF',
    success: '#47CD89',
    error: '#D92D20',
    background: '#121212',
    backgroundAlt: '#1E1E1E',
    border: '#1F242F',
    borderError: '#F97066',
    textPrimary: '#F5F5F6',
    textSecondary: '#CECFD2',
    textTertiary: '#94969C',
    textError: '#F97066'
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
