import * as React from 'react'
import Gallery, {
  PhotoProps as MasonryPhoto,
  PhotoClickHandler,
} from 'react-photo-gallery'
import ReactBnbGallery, { Photo as LightboxPhoto } from 'react-bnb-gallery'

import { Header } from './components/Header'
import { LoadingSpinner } from './components/LoadingSpinner'
import { getRandomPhotos } from './api'

import 'react-bnb-gallery/dist/style.css'
import './styles/App.css'

function App() {
  const [masonryPhotos, setMasonryPhotos] = React.useState<MasonryPhoto[]>([])
  const [lightboxPhotos, setLightboxPhotos] = React.useState<LightboxPhoto[]>(
    []
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [currentLightboxIndex, setCurrentLightboxIndex] = React.useState<
    number | null
  >(null)

  React.useEffect(() => {
    function handleScroll() {
      const { documentElement } = document
      const winScroll = documentElement.scrollTop
      const height = documentElement.scrollHeight - documentElement.clientHeight
      if (winScroll === height) {
        setPage((page) => page + 1)
      }
    }

    window.addEventListener('scroll', handleScroll, true)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // TODO: Implement Custom Hook
  React.useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const photos = await getRandomPhotos()
        const nextMasonryPhotos = photos.map(
          ({ id, urls, width, height, alt_description }) => ({
            width,
            height,
            key: id,
            src: urls.thumb,
            alt: alt_description || 'Unsplash image',
          })
        )
        setMasonryPhotos((previousMasonryPhotos) => [
          ...previousMasonryPhotos,
          ...nextMasonryPhotos,
        ])
        const nextLightboxPhotos = photos.map(
          ({ id, urls, description, alt_description }, i) => ({
            number: i,
            key: id,
            photo: urls.small,
            thumbnail: urls.thumb,
            caption: description,
            subcaption: alt_description,
          })
        )
        setLightboxPhotos((previousLightboxPhotos) => [
          ...previousLightboxPhotos,
          ...nextLightboxPhotos,
        ])
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [page])

  const handleOpenLightbox: PhotoClickHandler = React.useCallback(
    (_event, { index }) => {
      setCurrentLightboxIndex(index)
    },
    []
  )

  const handleCloseLightbox = () => {
    setCurrentLightboxIndex(null)
  }

  return (
    <>
      <Header></Header>
      <main>
        <Gallery photos={masonryPhotos} onClick={handleOpenLightbox} />
        <ReactBnbGallery
          show={!!currentLightboxIndex}
          photos={lightboxPhotos}
          onClose={handleCloseLightbox}
          activePhotoIndex={currentLightboxIndex ?? undefined}
        />
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </main>
    </>
  )
}

export { App }
