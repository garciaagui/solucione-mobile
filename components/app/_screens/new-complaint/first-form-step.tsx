import { useRouter } from 'expo-router'
import { Controller, UseFormReturn } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

import { Button, Input, Textarea } from '@/components/ui'
import { useStep } from '@/contexts/step-context'
import { NewComplaintFormValues } from '@/schemas/complaint'

interface Props {
  form: UseFormReturn<NewComplaintFormValues>
}

export default function FirstFormStep({ form }: Props) {
  const router = useRouter()
  const { nextStep } = useStep()

  const { control, formState, trigger } = form
  const errors = formState.errors.firstStep

  const handleNextStep = async () => {
    const isValid = await trigger('firstStep', { shouldFocus: true })

    if (isValid) {
      nextStep()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="firstStep.title"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Título"
              variant="text"
              errorMessage={errors?.title?.message}
              autoCapitalize="none"
              placeholder="Ex: Falta de coleta de lixo"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="firstStep.description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              label="Descrição"
              errorMessage={errors?.description?.message}
              placeholder="Descreva detalhadamente o problema ocorrido, mencionando horários, frequência e impacto."
              maxLength={255}
              minHeight={120}
              showCharCount={true}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button onPress={handleNextStep} style={styles.button}>
          Próximo
        </Button>
        <Button
          variant="outline"
          onPress={() => router.back()}
          style={styles.button}>
          Cancelar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1
  },
  form: {
    gap: 16
  },
  button: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 12,
    width: '100%'
  }
})
