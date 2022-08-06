import { createApi } from 'unsplash-js'

import { accessKey } from '../constants'

export const unsplashApi = createApi({
  accessKey,
})
