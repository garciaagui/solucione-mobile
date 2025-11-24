import { NewReplyFormValues } from '@/schemas/reply'

export const generateFormData = (data: NewReplyFormValues): FormData => {
  const formData = new FormData()

  formData.set('description', data.description)

  if (data.image) {
    formData.append('image', {
      uri: data.image,
      type: 'image/jpeg',
      name: 'image.jpg'
    } as any)
  }

  return formData
}
