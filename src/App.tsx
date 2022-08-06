import * as React from 'react'
import Gallery from 'react-photo-gallery'
import ReactBnbGallery from 'react-bnb-gallery'

import { Header } from './components/Header'
import { LoadingSpinner } from './components/LoadingSpinner'
import { unsplashApi } from './utils/api'

import 'react-bnb-gallery/dist/style.css'
import './styles/App.css'

type Photo = {
  id: string
  alt_description?: string
  width: number
  height: number
  created_at: string
  description: string
  urls: {
    small: string
    thumb: string
  }
}

function App() {
  const [photos, setPhotos] = React.useState<Photo[]>([])
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
        const { response } = await unsplashApi.photos.getRandom({
          count: 12,
          topicIds: [
            '6sMVjTLSkeQ',
            'rnSKDHwwYUk',
            'CDwuwXJAbEw',
            'bo8jQKTaE0Y',
            'iUIsnVtjB0Y',
            'aeu6rL-j6ew',
          ],
        })
        setPhotos((photos) => [...photos, ...(response as unknown as Photo[])])
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

  const photosToRender = React.useMemo(
    () =>
      photos.map(
        ({ id, urls, width, height, description, alt_description }, i) => ({
          width,
          height,
          number: i,
          key: id,
          src: urls.thumb,
          thumbnail: urls.thumb,
          photo: urls.small,
          alt: alt_description || 'Unsplash image',
          caption: description,
          subcaption: alt_description,
        })
      ),
    [photos]
  )

  return (
    <>
      <Header></Header>
      <main>
        <Gallery photos={photosToRender} onClick={openLightbox} />
        <ReactBnbGallery
          show={isOpen}
          photos={photosToRender}
          onClose={closeLightbox}
          activePhotoIndex={currentImage}
        />
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </main>
    </>
  )
}

export { App }
