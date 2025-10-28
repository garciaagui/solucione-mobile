import { Image } from 'expo-image'
import { useMemo } from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { XIcon } from '@/components/icons'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

interface Props {
  imageUri: string
  visible: boolean
  onClose: () => void
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function ImageModal({ imageUri, visible, onClose }: Props) {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <XIcon size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer} onPress={onClose}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      flex: 1,
      justifyContent: 'center'
    },
    closeButton: {
      borderRadius: 20,
      padding: 8,
      position: 'absolute',
      top: 60,
      right: 10,
      zIndex: 1
    },
    imageContainer: {
      width: screenWidth,
      height: screenHeight,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: screenWidth,
      height: screenHeight * 0.8
    }
  })
