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
  name: string
  description: string
  createdAt: string
  coverImage?: string
}
