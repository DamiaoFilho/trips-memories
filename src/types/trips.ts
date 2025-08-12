export interface TripLogI {
  id: number
  created_at: string
  media_type: string
  url: string
  title: string
  description: string
  trip_id: number
}

export interface TripI {
  id: number
  created_at: string
  name: string
  description: string
  cover_img: string
  user_id: string
  date: string
  log: TripLogI[]
}
