import { Image } from 'expo-image'
import { useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

import ImageModal from './image-modal'

interface Props {
  image: string
}

export default function ImageContainer({ image }: Props) {
  const { colors } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const styles = useMemo(() => createStyles(colors), [colors])

  const handleImagePress = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handleImagePress}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
        />
      </TouchableOpacity>

      <ImageModal
        imageUri={image}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: 250
    }
  })
