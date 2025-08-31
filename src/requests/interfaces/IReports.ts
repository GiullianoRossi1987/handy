export interface ReportBody {
  id: number
  reported?: number
  tags: string[]
  rating: number
  description: string
  revoked: boolean
  created_at: string
  updated_at: string
}
