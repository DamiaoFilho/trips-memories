export interface TripLogI {
  id: string
  title: string
  description: string
  media: {
    type: "image" | "video"
    url: string
  }
  createdAt: string
}

export interface TripI {
  id: string
  created_at: string
  name: string
  description: string
  cover_img: string
  user_id: number
  date: string
}
