import { NewComplaintFormValues } from '@/schemas/complaint'

export const formatZipCode = (value: string): string => {
  if (!value) return ''

  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1-$2')

  return value
}

export const generateFormData = (data: NewComplaintFormValues): FormData => {
  const formData = new FormData()

  formData.set('title', data.title)
  formData.set('description', data.description)
  formData.set('street', data.street)
  formData.set('neighborhood', data.neighborhood)
  formData.set('zipCode', data.zipCode)

  if (data.image) {
    formData.append('image', {
      uri: data.image,
      type: 'image/jpeg',
      name: 'image.jpg'
    } as any)
  }

  if (data.reference) {
    formData.set('reference', data.reference)
  }

  return formData
}
