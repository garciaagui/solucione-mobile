import { NewReplyFormValues } from '@/schemas/reply'

export const generateFormData = (
  data: NewReplyFormValues,
  complaintId: string
): FormData => {
  const formData = new FormData()

  formData.set('description', data.description)
  formData.set('complaintId', complaintId)

  if (data.image) {
    formData.append('image', {
      uri: data.image,
      type: 'image/jpeg',
      name: 'image.jpg'
    } as any)
  }

  return formData
}
