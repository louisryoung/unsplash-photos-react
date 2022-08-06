import * as React from 'react'
import Gallery from 'react-photo-gallery'
import ReactBnbGallery from 'react-bnb-gallery'

import { Header } from './components/Header'
import { LoadingSpinner } from './components/LoadingSpinner'
import { unsplashApi } from './utils/api'

import 'react-bnb-gallery/dist/style.css'
import './styles/App.css'

type ResponsePhoto = {
  id: string
  width: number
  height: number
  description: string
  alt_description: string
  urls: {
    thumb: string
    small: string
  }
}

type MasonryPhoto = {
  width: number
  height: number
  key: string
  src: string
  alt: string
}

type LightboxPhoto = {
  number: number
  key: string
  photo: string
  thumbnail: string
  caption: string
  subcaption: string
}

function App() {
  const [masonryPhotos, setMasonryPhotos] = React.useState<MasonryPhoto[]>([])
  const [lightboxPhotos, setLightboxPhotos] = React.useState<LightboxPhoto[]>(
    []
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [currentImage, setCurrentImage] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)

    return window.removeEventListener('scroll', handleScroll)
  }, [])

  // TODO: Implement Custom Hook
  React.useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const { response } = (await unsplashApi.photos.getRandom({
          count: 12,
          topicIds: [
            '6sMVjTLSkeQ',
            'rnSKDHwwYUk',
            'CDwuwXJAbEw',
            'bo8jQKTaE0Y',
            'iUIsnVtjB0Y',
            'aeu6rL-j6ew',
          ],
        })) as unknown as { response: ResponsePhoto[] }
        const nextMasonryPhotos = response.map(
          ({ id, urls, width, height, alt_description }) => ({
            width,
            height,
            key: id,
            src: urls.thumb,
            alt: alt_description || 'Unsplash image',
          })
        )
        setMasonryPhotos((previousPhotos) => [
          ...previousPhotos,
          ...nextMasonryPhotos,
        ])
        const nextLightboxPhotos = response.map(
          ({ id, urls, description, alt_description }, i) => ({
            number: i,
            key: id,
            photo: urls.small,
            thumbnail: urls.thumb,
            caption: description,
            subcaption: alt_description,
          })
        )
        setLightboxPhotos((previousPhotos) => [
          ...previousPhotos,
          ...nextLightboxPhotos,
        ])
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [page])

  const openLightbox = React.useCallback(
    (
      event: React.MouseEvent,
      {
        photo,
        index,
      }: {
        photo: {
          src: string
          height: number
          width: number
        }
        index: number
      }
    ) => {
      setCurrentImage(index)
      setIsOpen(true)
    },
    []
  )

  const closeLightbox = () => {
    setCurrentImage(0)
    setIsOpen(false)
  }

  function handleScroll() {
    const { documentElement } = document
    var winScroll = documentElement.scrollTop
    var height = documentElement.scrollHeight - documentElement.clientHeight
    if (winScroll === height) {
      setPage((page) => ++page)
    }
  }

  return (
    <>
      <Header></Header>
      <main>
        <Gallery photos={masonryPhotos} onClick={openLightbox} />
        <ReactBnbGallery
          show={isOpen}
          photos={lightboxPhotos}
          onClose={closeLightbox}
          activePhotoIndex={currentImage}
        />
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </main>
    </>
  )
}

export { App }
