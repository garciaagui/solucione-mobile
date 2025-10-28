import { Image } from 'expo-image'
import { useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Text, UserAvatar } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { Reply } from '@/types/reply'
import { ThemeColors } from '@/types/ui'

import ImageModal from './image-modal'

interface Props {
  replies: Reply[]
}

const formatReplyDate = (date: Date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  })
}

function ReplyCard({ reply }: { reply: Reply }) {
  const { colors } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImageUri, setSelectedImageUri] = useState('')
  const styles = useMemo(() => createReplyStyles(colors), [colors])

  const handleImagePress = (imageUri: string) => {
    setSelectedImageUri(imageUri)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedImageUri('')
  }

  return (
    <>
      <View style={styles.replyContainer}>
        <View style={styles.replyHeader}>
          <UserAvatar avatarUrl={reply.user.avatar} size={32} />
          <View>
            <Text size="sm" weight="semibold" variant="primary">
              {reply.user.name}
            </Text>
            <Text size="xs" variant="tertiary">
              {formatReplyDate(reply.createdAt)}
            </Text>
          </View>
        </View>

        <Text variant="secondary">{reply.description}</Text>

        {reply.images && reply.images.length > 0 && (
          <View style={styles.replyImagesContainer}>
            {reply.images.map((imageUri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(imageUri)}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.replyImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ImageModal
        imageUri={selectedImageUri}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default function RepliesContainer({ replies }: Props) {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const renderContent = () => {
    if (!replies || replies.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text variant="secondary" style={styles.emptyText}>
            Ainda não há respostas para esta reclamação
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.repliesContainer}>
        {replies.map(reply => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text size="md" weight="semibold" variant="primary">
        Atualizações
      </Text>
      {renderContent()}
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 8
    },
    emptyContainer: {
      padding: 24,
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed'
    },
    emptyText: {
      textAlign: 'center'
    },
    repliesContainer: {
      gap: 16
    }
  })

const createReplyStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    replyContainer: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      gap: 8
    },
    replyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12
    },
    replyImagesContainer: {
      marginTop: 8
    },
    replyImage: {
      width: '100%',
      height: 200,
      borderRadius: 12
    }
  })
