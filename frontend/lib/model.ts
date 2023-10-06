export interface StrapiResponse<T = unknown> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface HackerHouse {
  id: number
  title: string
  description?: string
  avatar?: string
  events?: number
  projects?: number
  members?: number
  createdAt?: string
}

export interface EventTag {
  id: number
  attributes: {
    title: string
  }
}

export interface HackerHouseEvent {
  id: number
  attributes: {
    title: string
    address: string
    post?: { data: MediaData[] }
    introduce: string
    deposit_amount?: string
    deposit_type?: string
    interview_url?: string
    start_time: string
    end_time: string
    publishedAt: string
    organization: { data: Organization }
    // hackers?: { data: Hacker[] }
    event_tags?: { data: EventTag[] }
    applies?: { data: Apply[] }
  }
}

export interface Apply {
  id: number
  attributes: {
    email: string
    introduction: string
    status: "waiting" | "approved" | "rejected"
    name: string
  }
}

export interface Hacker {
  id: number
  attributes: {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    image?: {
      data: MediaData
    }
  }
}

export interface Organization {
  id: number
  attributes: {
    title: string
    publishedAt: string
    logo: {
      data: MediaData
    }
  }
}

export interface MediaData {
  id: number
  attributes: {
    name: string
    alternativeText?: string
    caption?: string
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl?: string
    provider: string
    provider_metadata?: string
  }
}

interface Formats {
  thumbnail?: Thumbnail
  small?: Thumbnail
}

interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path?: string
  width: number
  height: number
  size: number
  url: string
}
