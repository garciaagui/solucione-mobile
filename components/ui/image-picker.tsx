import * as ExpoImagePicker from 'expo-image-picker'
import { useMemo } from 'react'
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { CameraIcon, ImageIcon, TrashIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

interface ImagePickerProps {
  label?: string
  description?: string
  errorMessage?: string
  required?: boolean
  value?: string
  onChange?: (uri: string | undefined) => void
}

export const ImagePicker = ({
  label,
  description,
  errorMessage,
  required = false,
  value,
  onChange
}: ImagePickerProps) => {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])
  const borderColor = errorMessage ? colors.borderError : colors.border

  const [cameraPermission, requestCameraPermission] =
    ExpoImagePicker.useCameraPermissions()
  const [galleryPermission, requestGalleryPermission] =
    ExpoImagePicker.useMediaLibraryPermissions()

  const pickImageFromGallery = async () => {
    try {
      // Solicitar permissão se necessário
      if (galleryPermission?.status !== 'granted') {
        const { status } = await requestGalleryPermission()
        if (status !== 'granted') {
          Alert.alert(
            'Permissão negada',
            'É necessário permitir o acesso à galeria para selecionar uma imagem.'
          )
          return
        }
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      })

      if (!result.canceled && result.assets[0]) {
        onChange?.(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a galeria.')
      console.error('Erro ao acessar galeria:', error)
    }
  }

  const takePhoto = async () => {
    try {
      // Solicitar permissão se necessário
      if (cameraPermission?.status !== 'granted') {
        const { status } = await requestCameraPermission()
        if (status !== 'granted') {
          Alert.alert(
            'Permissão negada',
            'É necessário permitir o acesso à câmera para tirar uma foto.'
          )
          return
        }
      }

      const result = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      })

      if (!result.canceled && result.assets[0]) {
        onChange?.(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a câmera.')
      console.error('Erro ao acessar câmera:', error)
    }
  }

  const removeImage = () => {
    onChange?.(undefined)
  }

  const showOptions = () => {
    if (Platform.OS === 'web') {
      // No web, apenas galeria está disponível
      pickImageFromGallery()
      return
    }

    Alert.alert(
      'Selecionar imagem',
      'Escolha de onde deseja selecionar a imagem',
      [
        {
          text: 'Câmera',
          onPress: takePhoto
        },
        {
          text: 'Galeria',
          onPress: pickImageFromGallery
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      {label ? (
        <View style={styles.labelContainer}>
          <Text size="sm" weight="semibold" variant="secondary">
            {label}
          </Text>
          {required ? (
            <Text size="sm" variant="error">
              {' '}
              *
            </Text>
          ) : null}
        </View>
      ) : null}

      {description ? (
        <Text size="xs" variant="secondary" style={styles.description}>
          {description}
        </Text>
      ) : null}

      {value ? (
        <View style={[styles.imageContainer, { borderColor }]}>
          <Image source={{ uri: value }} style={styles.image} />
          <View style={styles.imageActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.changeButton]}
              onPress={showOptions}>
              <ImageIcon size={18} color={colors.textPrimary} />
              <Text size="sm" weight="medium">
                Alterar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.removeButton]}
              onPress={removeImage}>
              <TrashIcon size={18} color={colors.textError} />
              <Text size="sm" weight="medium" variant="error">
                Remover
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.pickerContainer, { borderColor }]}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={pickImageFromGallery}>
            <ImageIcon size={32} color={colors.primary} />
            <Text size="sm" weight="medium" style={styles.optionText}>
              Galeria
            </Text>
          </TouchableOpacity>

          {Platform.OS !== 'web' ? (
            <>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
                <CameraIcon size={32} color={colors.primary} />
                <Text size="sm" weight="medium" style={styles.optionText}>
                  Câmera
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      )}

      {errorMessage ? (
        <Text size="xs" variant="error" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 6,
      width: '100%'
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    description: {
      marginTop: -6
    },
    pickerContainer: {
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'dashed',
      paddingVertical: 24,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24
    },
    optionButton: {
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 16
    },
    optionText: {
      color: colors.textSecondary
    },
    separator: {
      width: 1,
      height: 60,
      backgroundColor: colors.border
    },
    imageContainer: {
      borderRadius: 12,
      borderWidth: 1,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: 240,
      resizeMode: 'cover'
    },
    imageActions: {
      flexDirection: 'row',
      gap: 8,
      padding: 12
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1
    },
    changeButton: {
      borderColor: colors.border,
      backgroundColor: colors.background
    },
    removeButton: {
      borderColor: `${colors.borderError}80`,
      backgroundColor: colors.background
    },
    errorMessage: {
      marginLeft: 4,
      marginTop: 2
    }
  })
