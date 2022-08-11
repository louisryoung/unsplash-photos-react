import { createApi } from 'unsplash-js'

import { accessKey } from './config'

export type Photo = {
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

const countPerPage = 12

export const unsplashApi = createApi({
  accessKey,
})

export async function getRandomPhotos() {
  const { response } = (await unsplashApi.photos.getRandom({
    count: countPerPage,
    topicIds: [
      '6sMVjTLSkeQ',
      'rnSKDHwwYUk',
      'CDwuwXJAbEw',
      'bo8jQKTaE0Y',
      'iUIsnVtjB0Y',
      'aeu6rL-j6ew',
    ],
  })) as unknown as { response: Photo[] }

  return response
}
