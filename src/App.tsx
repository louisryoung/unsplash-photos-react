import * as React from 'react'
import { observer } from 'mobx-react-lite'
import Gallery, { PhotoClickHandler } from 'react-photo-gallery'
import ReactBnbGallery from 'react-bnb-gallery'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'

import { Header } from './components/Header'
import logo from './logo.svg'
import { PhotoStore } from './store/photos'

import 'react-bnb-gallery/dist/style.css'
import './styles/App.css'

type Props = {
  store: PhotoStore
}

function AppComponent({ store }: Props) {
  const [page, setPage] = React.useState(1)
  const [currentLightboxIndex, setCurrentLightboxIndex] = React.useState<
    number | null
  >(null)
  const { ref, inView } = useInView({
    threshold: 0.9,
  })

  // TODO: Implement Custom Hook
  React.useEffect(() => {
    store.getPhotos()
  }, [page, store])

  React.useEffect(() => {
    if (inView) {
      setPage((page) => page + 1)
    }
  }, [inView])

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
        <Gallery photos={store.masonryPhotos} onClick={handleOpenLightbox} />
        <ReactBnbGallery
          show={!!currentLightboxIndex}
          photos={store.lightboxPhotos}
          onClose={handleCloseLightbox}
          activePhotoIndex={currentLightboxIndex ?? undefined}
        />
        <div
          ref={ref}
          className={classNames('loading-container', {
            'd-none': !store.isLoading,
          })}
        >
          <img src={logo} className="spinner" alt="loading spinner" />
        </div>
      </main>
    </>
  )
}

const App = observer(AppComponent)

export { App }
