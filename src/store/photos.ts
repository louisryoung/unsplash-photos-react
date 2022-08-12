import { makeObservable, observable, action, computed, autorun } from 'mobx'
import { getRandomPhotos, Photo } from '../api'

export class PhotoStore {
  photos: Photo[] = []
  isLoading = false

  constructor() {
    makeObservable(this, {
      photos: observable,
      isLoading: observable,
      masonryPhotos: computed,
      lightboxPhotos: computed,
      setIsLoading: action,
    })
  }

  get masonryPhotos() {
    return this.photos.map(({ id, urls, width, height, alt_description }) => ({
      width,
      height,
      key: id,
      src: urls.thumb,
      alt: alt_description || 'Unsplash image',
    }))
  }

  get lightboxPhotos() {
    return this.photos.map(({ id, urls, description, alt_description }, i) => ({
      number: i,
      key: id,
      photo: urls.small,
      thumbnail: urls.thumb,
      caption: description,
      subcaption: alt_description,
    }))
  }

  async getPhotos() {
    try {
      this.setIsLoading(true)
      const photos = await getRandomPhotos()
      this.addPhotos(photos)
    } catch (err) {
      const { message } = err as Error
      alert(message)
    } finally {
      this.setIsLoading(false)
    }
  }

  addPhotos(photos: Photo[]) {
    this.photos = [...this.photos, ...photos]
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }
}

export const photoStore = new PhotoStore()
