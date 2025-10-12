import { Reply } from './reply'
import { Status } from './shared'
import { User } from './user'

export interface Complaint {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  images: string[]
  userId: string
  title: string
  street: string
  neighborhood: string
  zipCode: string
  addressReference: string | null
  status: Status
  user: User
  replies: Reply[]
}
