import { View } from 'react-native'

import { Text } from '@/components/ui'
import { UserRole } from '@/types/user'

interface Props {
  userRole: UserRole
}

const generateSubtitle = (role: UserRole) => {
  if (role === 'user') return 'Acompanhe as reclamações abertas por você'
  else return 'Acompanhe as reclamações atualizadas por você'
}

export default function ComplaintsHeader({ userRole }: Props) {
  const subtitle = generateSubtitle(userRole)

  return (
    <View>
      <Text size="xl" weight="bold" variant="primary">
        Reclamações
      </Text>
      <Text size="sm" weight="medium" variant="tertiary">
        {subtitle}
      </Text>
    </View>
  )
}
