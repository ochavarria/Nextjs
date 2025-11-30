export interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

export interface HeroProps {
  name: string
  title: string
  photo: string
  experiences: Experience[]
}

