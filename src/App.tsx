import * as React from 'react'

import { Header } from './components/Header'
import { LoadingSpinner } from './components/LoadingSpinner'
import { unsplashApi } from './utils/api'
import './styles/App.css'

type Photo = {
  id: number
  width: number
  height: number
  created_at: string
  updated_at: string
  color: string | null
  likes: number
  downloads: number
  description: string
  location: {
    title: string
  }
  urls: {
    large: string
    regular: string
    raw: string
    small: string
    thumb: string
  }
  user: {
    username: string
    name: string
  }
}

function App() {
  const [photos, setPhotos] = React.useState<Photo[] | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // TODO: Implement Custom Hook
  React.useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const { response: photos } = await unsplashApi.photos.getRandom({
          count: 12,
        })
        setPhotos(photos as unknown as Photo[])
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <>
      <Header></Header>
      <main>
        {photos?.length &&
          photos.map(({ urls, location }) => (
            <img src={urls.thumb} alt={location.title} key={urls.thumb}></img>
          ))}
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </main>
    </>
  )
}

export { App }
