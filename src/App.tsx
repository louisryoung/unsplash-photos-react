import * as React from 'react'
import { fromEvent } from 'rxjs'
import { observer } from 'mobx-react-lite'
import Gallery, { PhotoClickHandler } from 'react-photo-gallery'
import ReactBnbGallery from 'react-bnb-gallery'
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

  React.useEffect(() => {
    const scrollSubscription = fromEvent(document, 'scroll').subscribe((e) => {
      const { documentElement } = e.target as Document
      var winScroll = documentElement.scrollTop
      var height = documentElement.scrollHeight - documentElement.clientHeight

      if (winScroll === height) {
        setPage((page) => ++page)
      }
    })

    return () => {
      scrollSubscription.unsubscribe()
    }
  }, [])

  React.useEffect(() => {
    store.getPhotos()
  }, [page, store])

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
