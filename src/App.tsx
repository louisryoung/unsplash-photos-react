import * as React from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

import { Header } from './components/Header'
import { LoadingSpinner } from './components/LoadingSpinner'
import { unsplashApi } from './utils/api'

import 'photoswipe/dist/photoswipe.css'
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

const mockPhotos = [
  {
    id: 'kcZgDtkuB4g',
    created_at: '2022-07-08T17:04:40Z',
    updated_at: '2022-08-05T12:31:00Z',
    promoted_at: null,
    width: 6720,
    height: 4480,
    color: '#d9d9d9',
    blur_hash: 'LCK1B%xTyYD%00%NyEkX-:,.IARi',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1657299170935-31e068229885?ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1657299170935-31e068229885?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1657299170935-31e068229885?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1657299170935-31e068229885?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1657299170935-31e068229885?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1657299170935-31e068229885',
    },
    links: {
      self: 'https://api.unsplash.com/photos/kcZgDtkuB4g',
      html: 'https://unsplash.com/photos/kcZgDtkuB4g',
      download:
        'https://unsplash.com/photos/kcZgDtkuB4g/download?ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/kcZgDtkuB4g/download?ixid=MnwzNTI4NDF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 38,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: {
      impression_urls: [
        'https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false\u0026bannerID=10624836\u0026rnd=[timestamp]\u0026redir=https://secure.insightexpressai.com/adserver/1pixel.gif',
      ],
      tagline: 'Wholesome crispbread from Sweden',
      tagline_url: 'https://www.wasa.com/global/',
      sponsor: {
        id: '5tdWPtk6hBg',
        updated_at: '2022-08-06T08:00:21Z',
        username: 'wasacrispbread',
        name: 'Wasa Crispbread',
        first_name: 'Wasa Crispbread',
        last_name: null,
        twitter_username: null,
        portfolio_url: 'https://www.wasa.com/global/',
        bio: 'Things we love:\r\n🍞 Crispbread (naturally)  🌍 Our planet  😋 Delicious food, everyday',
        location: null,
        links: {
          self: 'https://api.unsplash.com/users/wasacrispbread',
          html: 'https://unsplash.com/@wasacrispbread',
          photos: 'https://api.unsplash.com/users/wasacrispbread/photos',
          likes: 'https://api.unsplash.com/users/wasacrispbread/likes',
          portfolio: 'https://api.unsplash.com/users/wasacrispbread/portfolio',
          following: 'https://api.unsplash.com/users/wasacrispbread/following',
          followers: 'https://api.unsplash.com/users/wasacrispbread/followers',
        },
        profile_image: {
          small:
            'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
          medium:
            'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
          large:
            'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
        },
        instagram_username: 'wasacrispbread',
        total_collections: 0,
        total_likes: 0,
        total_photos: 73,
        accepted_tos: true,
        for_hire: false,
        social: {
          instagram_username: 'wasacrispbread',
          portfolio_url: 'https://www.wasa.com/global/',
          twitter_username: null,
          paypal_email: null,
        },
      },
    },
    topic_submissions: {},
    user: {
      id: '5tdWPtk6hBg',
      updated_at: '2022-08-06T08:00:21Z',
      username: 'wasacrispbread',
      name: 'Wasa Crispbread',
      first_name: 'Wasa Crispbread',
      last_name: null,
      twitter_username: null,
      portfolio_url: 'https://www.wasa.com/global/',
      bio: 'Things we love:\r\n🍞 Crispbread (naturally)  🌍 Our planet  😋 Delicious food, everyday',
      location: null,
      links: {
        self: 'https://api.unsplash.com/users/wasacrispbread',
        html: 'https://unsplash.com/@wasacrispbread',
        photos: 'https://api.unsplash.com/users/wasacrispbread/photos',
        likes: 'https://api.unsplash.com/users/wasacrispbread/likes',
        portfolio: 'https://api.unsplash.com/users/wasacrispbread/portfolio',
        following: 'https://api.unsplash.com/users/wasacrispbread/following',
        followers: 'https://api.unsplash.com/users/wasacrispbread/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'wasacrispbread',
      total_collections: 0,
      total_likes: 0,
      total_photos: 73,
      accepted_tos: true,
      for_hire: false,
      social: {
        instagram_username: 'wasacrispbread',
        portfolio_url: 'https://www.wasa.com/global/',
        twitter_username: null,
        paypal_email: null,
      },
    },
  },
  {
    id: 'W1SAgPzAWXM',
    created_at: '2022-08-06T03:54:31Z',
    updated_at: '2022-08-06T08:00:14Z',
    promoted_at: '2022-08-06T08:00:14Z',
    width: 3736,
    height: 2800,
    color: '#404059',
    blur_hash: 'LA5=R|tSRiWA.AfPWAaytSV?ayj]',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659757846167-18d7eb6f2088?ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659757846167-18d7eb6f2088?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659757846167-18d7eb6f2088?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659757846167-18d7eb6f2088?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659757846167-18d7eb6f2088?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659757846167-18d7eb6f2088',
    },
    links: {
      self: 'https://api.unsplash.com/photos/W1SAgPzAWXM',
      html: 'https://unsplash.com/photos/W1SAgPzAWXM',
      download:
        'https://unsplash.com/photos/W1SAgPzAWXM/download?ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/W1SAgPzAWXM/download?ixid=MnwzNTI4NDF8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 0,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: 'VBgcT1RrsN8',
      updated_at: '2022-08-06T08:00:25Z',
      username: 'kierinsight',
      name: 'Kier In Sight',
      first_name: 'Kier',
      last_name: 'In Sight',
      twitter_username: null,
      portfolio_url: 'https://kierinsight.art',
      bio: "Contact me for commissions, to purchase enlargements or build curated mood boards. Donate a buck if you're a frequent downloader. Love ya.",
      location: 'United States',
      links: {
        self: 'https://api.unsplash.com/users/kierinsight',
        html: 'https://unsplash.com/@kierinsight',
        photos: 'https://api.unsplash.com/users/kierinsight/photos',
        likes: 'https://api.unsplash.com/users/kierinsight/likes',
        portfolio: 'https://api.unsplash.com/users/kierinsight/portfolio',
        following: 'https://api.unsplash.com/users/kierinsight/following',
        followers: 'https://api.unsplash.com/users/kierinsight/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1637970473878-1bc23fbf4bf0image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1637970473878-1bc23fbf4bf0image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1637970473878-1bc23fbf4bf0image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: null,
      total_collections: 23,
      total_likes: 376,
      total_photos: 122,
      accepted_tos: true,
      for_hire: true,
      social: {
        instagram_username: null,
        portfolio_url: 'https://kierinsight.art',
        twitter_username: null,
        paypal_email: null,
      },
    },
  },
  {
    id: '--cVk9Tsgrs',
    created_at: '2022-08-05T05:58:34Z',
    updated_at: '2022-08-06T08:00:03Z',
    promoted_at: '2022-08-06T08:00:03Z',
    width: 2160,
    height: 2700,
    color: '#0c2626',
    blur_hash: 'LZDm5Mt701Rk4.WC%MjsNGaexuof',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659678314866-ed69cff0b366?ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659678314866-ed69cff0b366?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659678314866-ed69cff0b366?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659678314866-ed69cff0b366?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659678314866-ed69cff0b366?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659678314866-ed69cff0b366',
    },
    links: {
      self: 'https://api.unsplash.com/photos/--cVk9Tsgrs',
      html: 'https://unsplash.com/photos/--cVk9Tsgrs',
      download:
        'https://unsplash.com/photos/--cVk9Tsgrs/download?ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/--cVk9Tsgrs/download?ixid=MnwzNTI4NDF8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 3,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: 'Y5te3jLcIqk',
      updated_at: '2022-08-06T08:00:03Z',
      username: 'angelinaandantonis',
      name: 'Angelina and Antonis Antoniou',
      first_name: 'Angelina and Antonis',
      last_name: 'Antoniou',
      twitter_username: 'angelinaantonis',
      portfolio_url: 'https://travelmoreland.com',
      bio: 'Feel free to follow us on instagram @angelinaandantonis , and DM us to follow you back. We would love to connect with photo - enthusiast people like you! Travel couple based in Limassol \u0026 Athens. ',
      location: 'Cyprus',
      links: {
        self: 'https://api.unsplash.com/users/angelinaandantonis',
        html: 'https://unsplash.com/@angelinaandantonis',
        photos: 'https://api.unsplash.com/users/angelinaandantonis/photos',
        likes: 'https://api.unsplash.com/users/angelinaandantonis/likes',
        portfolio:
          'https://api.unsplash.com/users/angelinaandantonis/portfolio',
        following:
          'https://api.unsplash.com/users/angelinaandantonis/following',
        followers:
          'https://api.unsplash.com/users/angelinaandantonis/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1644909876928-0d64fa2b11beimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1644909876928-0d64fa2b11beimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1644909876928-0d64fa2b11beimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'angelinaandantonis',
      total_collections: 0,
      total_likes: 0,
      total_photos: 101,
      accepted_tos: true,
      for_hire: true,
      social: {
        instagram_username: 'angelinaandantonis',
        portfolio_url: 'https://travelmoreland.com',
        twitter_username: 'angelinaantonis',
        paypal_email: null,
      },
    },
  },
  {
    id: 'bQ8NMZFzq-M',
    created_at: '2022-08-06T07:33:09Z',
    updated_at: '2022-08-06T07:57:33Z',
    promoted_at: '2022-08-06T07:57:33Z',
    width: 4248,
    height: 2832,
    color: '#f3f3f3',
    blur_hash: 'LGQ]vY?dTJxG?wM_s:bbghofa0fm',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659771073913-467c8a930f3f?ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659771073913-467c8a930f3f?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659771073913-467c8a930f3f?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659771073913-467c8a930f3f?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659771073913-467c8a930f3f?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659771073913-467c8a930f3f',
    },
    links: {
      self: 'https://api.unsplash.com/photos/bQ8NMZFzq-M',
      html: 'https://unsplash.com/photos/bQ8NMZFzq-M',
      download:
        'https://unsplash.com/photos/bQ8NMZFzq-M/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/bQ8NMZFzq-M/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 0,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: 'vK2kjyB_rYc',
      updated_at: '2022-08-06T07:58:58Z',
      username: 'luisjlara343',
      name: 'Luis Lara',
      first_name: 'Luis',
      last_name: 'Lara',
      twitter_username: null,
      portfolio_url: 'http://luislara.smugmug.com',
      bio: 'Hello, if you like my work please consider supporting me through my PayPal or buying prints from SmugMug! View my website at luislara.smugmug.com\r\nThank you very much for looking at my photos! 😊',
      location: 'Apple Valley',
      links: {
        self: 'https://api.unsplash.com/users/luisjlara343',
        html: 'https://unsplash.com/@luisjlara343',
        photos: 'https://api.unsplash.com/users/luisjlara343/photos',
        likes: 'https://api.unsplash.com/users/luisjlara343/likes',
        portfolio: 'https://api.unsplash.com/users/luisjlara343/portfolio',
        following: 'https://api.unsplash.com/users/luisjlara343/following',
        followers: 'https://api.unsplash.com/users/luisjlara343/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1656586997585-c892865cadefimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1656586997585-c892865cadefimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1656586997585-c892865cadefimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'luis.jose.lara',
      total_collections: 0,
      total_likes: 34,
      total_photos: 116,
      accepted_tos: true,
      for_hire: true,
      social: {
        instagram_username: 'luis.jose.lara',
        portfolio_url: 'http://luislara.smugmug.com',
        twitter_username: null,
        paypal_email: null,
      },
    },
  },
  {
    id: 'm8-hCHm0LM8',
    created_at: '2022-08-06T07:44:49Z',
    updated_at: '2022-08-06T07:56:01Z',
    promoted_at: '2022-08-06T07:56:01Z',
    width: 3840,
    height: 2160,
    color: '#d9d9d9',
    blur_hash: 'LhHoRT-pRjt7~qoeNGt7t8axays:',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659771881777-319c2e443726?ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659771881777-319c2e443726?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659771881777-319c2e443726?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659771881777-319c2e443726?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659771881777-319c2e443726?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659771881777-319c2e443726',
    },
    links: {
      self: 'https://api.unsplash.com/photos/m8-hCHm0LM8',
      html: 'https://unsplash.com/photos/m8-hCHm0LM8',
      download:
        'https://unsplash.com/photos/m8-hCHm0LM8/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/m8-hCHm0LM8/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 0,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: { '3d-renders': { status: 'unevaluated' } },
    user: {
      id: 'z5g-SOyZcEY',
      updated_at: '2022-08-06T07:58:57Z',
      username: 'niranjan_photographs',
      name: 'Niranjan _ Photographs',
      first_name: 'Niranjan',
      last_name: '_ Photographs',
      twitter_username: null,
      portfolio_url: 'https://linktr.ee/_N_P',
      bio: null,
      location: 'Kerala,India',
      links: {
        self: 'https://api.unsplash.com/users/niranjan_photographs',
        html: 'https://unsplash.com/@niranjan_photographs',
        photos: 'https://api.unsplash.com/users/niranjan_photographs/photos',
        likes: 'https://api.unsplash.com/users/niranjan_photographs/likes',
        portfolio:
          'https://api.unsplash.com/users/niranjan_photographs/portfolio',
        following:
          'https://api.unsplash.com/users/niranjan_photographs/following',
        followers:
          'https://api.unsplash.com/users/niranjan_photographs/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1646365979152-c68238d7d95bimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1646365979152-c68238d7d95bimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1646365979152-c68238d7d95bimage?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'niranjan_photographs',
      total_collections: 3,
      total_likes: 88,
      total_photos: 180,
      accepted_tos: true,
      for_hire: false,
      social: {
        instagram_username: 'niranjan_photographs',
        portfolio_url: 'https://linktr.ee/_N_P',
        twitter_username: null,
        paypal_email: null,
      },
    },
  },
  {
    id: 'omdiqPFOmKI',
    created_at: '2022-07-08T17:04:40Z',
    updated_at: '2022-08-05T11:27:54Z',
    promoted_at: null,
    width: 4160,
    height: 6240,
    color: '#262626',
    blur_hash: 'LLHxWtxB01E2D$x^D%Rk0KIA%gsA',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1657299156286-29f1a3a33ea3?ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1657299156286-29f1a3a33ea3?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1657299156286-29f1a3a33ea3?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1657299156286-29f1a3a33ea3?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1657299156286-29f1a3a33ea3?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1657299156286-29f1a3a33ea3',
    },
    links: {
      self: 'https://api.unsplash.com/photos/omdiqPFOmKI',
      html: 'https://unsplash.com/photos/omdiqPFOmKI',
      download:
        'https://unsplash.com/photos/omdiqPFOmKI/download?ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/omdiqPFOmKI/download?ixid=MnwzNTI4NDF8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 64,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: {
      impression_urls: [
        'https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false\u0026bannerID=10624861\u0026rnd=[timestamp]\u0026redir=https://secure.insightexpressai.com/adserver/1pixel.gif',
      ],
      tagline: 'Wholesome crispbread from Sweden',
      tagline_url: 'https://www.wasa.com/global/',
      sponsor: {
        id: '5tdWPtk6hBg',
        updated_at: '2022-08-06T08:00:21Z',
        username: 'wasacrispbread',
        name: 'Wasa Crispbread',
        first_name: 'Wasa Crispbread',
        last_name: null,
        twitter_username: null,
        portfolio_url: 'https://www.wasa.com/global/',
        bio: 'Things we love:\r\n🍞 Crispbread (naturally)  🌍 Our planet  😋 Delicious food, everyday',
        location: null,
        links: {
          self: 'https://api.unsplash.com/users/wasacrispbread',
          html: 'https://unsplash.com/@wasacrispbread',
          photos: 'https://api.unsplash.com/users/wasacrispbread/photos',
          likes: 'https://api.unsplash.com/users/wasacrispbread/likes',
          portfolio: 'https://api.unsplash.com/users/wasacrispbread/portfolio',
          following: 'https://api.unsplash.com/users/wasacrispbread/following',
          followers: 'https://api.unsplash.com/users/wasacrispbread/followers',
        },
        profile_image: {
          small:
            'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
          medium:
            'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
          large:
            'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
        },
        instagram_username: 'wasacrispbread',
        total_collections: 0,
        total_likes: 0,
        total_photos: 73,
        accepted_tos: true,
        for_hire: false,
        social: {
          instagram_username: 'wasacrispbread',
          portfolio_url: 'https://www.wasa.com/global/',
          twitter_username: null,
          paypal_email: null,
        },
      },
    },
    topic_submissions: {},
    user: {
      id: '5tdWPtk6hBg',
      updated_at: '2022-08-06T08:00:21Z',
      username: 'wasacrispbread',
      name: 'Wasa Crispbread',
      first_name: 'Wasa Crispbread',
      last_name: null,
      twitter_username: null,
      portfolio_url: 'https://www.wasa.com/global/',
      bio: 'Things we love:\r\n🍞 Crispbread (naturally)  🌍 Our planet  😋 Delicious food, everyday',
      location: null,
      links: {
        self: 'https://api.unsplash.com/users/wasacrispbread',
        html: 'https://unsplash.com/@wasacrispbread',
        photos: 'https://api.unsplash.com/users/wasacrispbread/photos',
        likes: 'https://api.unsplash.com/users/wasacrispbread/likes',
        portfolio: 'https://api.unsplash.com/users/wasacrispbread/portfolio',
        following: 'https://api.unsplash.com/users/wasacrispbread/following',
        followers: 'https://api.unsplash.com/users/wasacrispbread/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1655151625963-f0eec015f2a4image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'wasacrispbread',
      total_collections: 0,
      total_likes: 0,
      total_photos: 73,
      accepted_tos: true,
      for_hire: false,
      social: {
        instagram_username: 'wasacrispbread',
        portfolio_url: 'https://www.wasa.com/global/',
        twitter_username: null,
        paypal_email: null,
      },
    },
  },
  {
    id: 'eKu4SWDa2jE',
    created_at: '2022-08-05T17:46:31Z',
    updated_at: '2022-08-06T04:00:01Z',
    promoted_at: '2022-08-06T04:00:01Z',
    width: 6163,
    height: 4109,
    color: '#d9d9d9',
    blur_hash: 'LNK^B6~W?^ENMbH=MwV@ITn~V@Rj',
    description: 'Bedroom at Nordlys MetalLark Tower',
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659720879386-923f2a19f19e?ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659720879386-923f2a19f19e?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659720879386-923f2a19f19e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659720879386-923f2a19f19e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659720879386-923f2a19f19e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659720879386-923f2a19f19e',
    },
    links: {
      self: 'https://api.unsplash.com/photos/eKu4SWDa2jE',
      html: 'https://unsplash.com/photos/eKu4SWDa2jE',
      download:
        'https://unsplash.com/photos/eKu4SWDa2jE/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/eKu4SWDa2jE/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 2,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: 'bFJeTC_Stcc',
      updated_at: '2022-08-06T07:48:57Z',
      username: 'hans_isaacson',
      name: 'Hans Isaacson',
      first_name: 'Hans',
      last_name: 'Isaacson',
      twitter_username: 'IsaacsonHans',
      portfolio_url: 'http://HansIsaacson.com',
      bio: "Michigan's Upper Peninsula \r\nInstagram @outdoorpixs",
      location: 'Michigan, USA',
      links: {
        self: 'https://api.unsplash.com/users/hans_isaacson',
        html: 'https://unsplash.com/@hans_isaacson',
        photos: 'https://api.unsplash.com/users/hans_isaacson/photos',
        likes: 'https://api.unsplash.com/users/hans_isaacson/likes',
        portfolio: 'https://api.unsplash.com/users/hans_isaacson/portfolio',
        following: 'https://api.unsplash.com/users/hans_isaacson/following',
        followers: 'https://api.unsplash.com/users/hans_isaacson/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1641356925987-40e732340cc4?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1641356925987-40e732340cc4?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1641356925987-40e732340cc4?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'outdoorpixs',
      total_collections: 15,
      total_likes: 881,
      total_photos: 1170,
      accepted_tos: true,
      for_hire: true,
      social: {
        instagram_username: 'outdoorpixs',
        portfolio_url: 'http://HansIsaacson.com',
        twitter_username: 'IsaacsonHans',
        paypal_email: null,
      },
    },
  },
  {
    id: 'wWeXOntvHbs',
    created_at: '2022-08-04T22:20:36Z',
    updated_at: '2022-08-06T03:32:01Z',
    promoted_at: '2022-08-06T03:32:01Z',
    width: 4040,
    height: 6060,
    color: '#0c598c',
    blur_hash: 'LUC783A0I=xb4m$%s.ozx^WVofM{',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659651224719-4bcb8c4c2de8?ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659651224719-4bcb8c4c2de8?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659651224719-4bcb8c4c2de8?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659651224719-4bcb8c4c2de8?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659651224719-4bcb8c4c2de8?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659651224719-4bcb8c4c2de8',
    },
    links: {
      self: 'https://api.unsplash.com/photos/wWeXOntvHbs',
      html: 'https://unsplash.com/photos/wWeXOntvHbs',
      download:
        'https://unsplash.com/photos/wWeXOntvHbs/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/wWeXOntvHbs/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 11,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: '3b1iqWzsIiU',
      updated_at: '2022-08-06T07:43:58Z',
      username: 'paupattersonphotography_',
      name: 'Paulina Patterson',
      first_name: 'Paulina',
      last_name: 'Patterson',
      twitter_username: null,
      portfolio_url: 'https://paupattersonphotography.mypixieset.com/home/',
      bio: 'Photography lover in the state of Utah.\r\nDress rental owner @thetravelingdressrental Psychologist, reader and nature lover 🍂',
      location: 'Utah',
      links: {
        self: 'https://api.unsplash.com/users/paupattersonphotography_',
        html: 'https://unsplash.com/@paupattersonphotography_',
        photos:
          'https://api.unsplash.com/users/paupattersonphotography_/photos',
        likes: 'https://api.unsplash.com/users/paupattersonphotography_/likes',
        portfolio:
          'https://api.unsplash.com/users/paupattersonphotography_/portfolio',
        following:
          'https://api.unsplash.com/users/paupattersonphotography_/following',
        followers:
          'https://api.unsplash.com/users/paupattersonphotography_/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-fb-1633036765-6fb33ce1530f.jpg?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-fb-1633036765-6fb33ce1530f.jpg?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-fb-1633036765-6fb33ce1530f.jpg?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'paupattersonphotography_',
      total_collections: 0,
      total_likes: 1,
      total_photos: 31,
      accepted_tos: true,
      for_hire: true,
      social: {
        instagram_username: 'paupattersonphotography_',
        portfolio_url: 'https://paupattersonphotography.mypixieset.com/home/',
        twitter_username: null,
        paypal_email: null,
      },
    },
  },
  {
    id: 'FWYne_BGP9k',
    created_at: '2022-08-04T17:59:37Z',
    updated_at: '2022-08-06T03:24:01Z',
    promoted_at: '2022-08-06T03:24:01Z',
    width: 3940,
    height: 5910,
    color: '#d9d9d9',
    blur_hash: 'LLLENR-;00tRI9xu9Foe?wt6M{t7',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659635749900-aab7cfce4dc3?ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659635749900-aab7cfce4dc3?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659635749900-aab7cfce4dc3?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659635749900-aab7cfce4dc3?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659635749900-aab7cfce4dc3?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659635749900-aab7cfce4dc3',
    },
    links: {
      self: 'https://api.unsplash.com/photos/FWYne_BGP9k',
      html: 'https://unsplash.com/photos/FWYne_BGP9k',
      download:
        'https://unsplash.com/photos/FWYne_BGP9k/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
      download_location:
        'https://api.unsplash.com/photos/FWYne_BGP9k/download?ixid=MnwzNTI4NDF8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTc3Mjg4OQ',
    },
    categories: [],
    likes: 6,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: 'an8MUg-lGrQ',
      updated_at: '2022-08-06T07:13:57Z',
      username: 'mathildelangevin',
      name: 'Mathilde Langevin',
      first_name: 'Mathilde',
      last_name: 'Langevin',
      twitter_username: 'mathildlangevin',
      portfolio_url: 'https://mathilde.ca/',
      bio: 'Photographer \u0026 Contributor',
      location: 'Montréal',
      links: {
        self: 'https://api.unsplash.com/users/mathildelangevin',
        html: 'https://unsplash.com/@mathildelangevin',
        photos: 'https://api.unsplash.com/users/mathildelangevin/photos',
        likes: 'https://api.unsplash.com/users/mathildelangevin/likes',
        portfolio: 'https://api.unsplash.com/users/mathildelangevin/portfolio',
        following: 'https://api.unsplash.com/users/mathildelangevin/following',
        followers: 'https://api.unsplash.com/users/mathildelangevin/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1601327292565-cc4c02215d36image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1601327292565-cc4c02215d36image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1601327292565-cc4c02215d36image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'mathildlangevin',
      total_collections: 5,
      total_likes: 235,
      total_photos: 229,
      accepted_tos: true,
      for_hire: true,
      social: {
        instagram_username: 'mathildlangevin',
        portfolio_url: 'https://mathilde.ca/',
        twitter_username: 'mathildlangevin',
        paypal_email: null,
      },
    },
  },
  {
    id: 'nHc4JRqq0NM',
    created_at: '2022-08-05T01:02:13Z',
    updated_at: '2022-08-06T03:16:03Z',
    promoted_at: '2022-08-06T03:16:03Z',
    width: 3697,
    height: 4693,
    color: '#8c8c73',
    blur_hash: 'LGGHxYD~X-?atPahV@of0zni$jjb',
    description: null,
    alt_description: null,
    urls: {
      raw: 'https://images.unsplash.com/photo-1659661272820-b86f4750cee6?ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk\u0026ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1659661272820-b86f4750cee6?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk\u0026ixlib=rb-1.2.1\u0026q=80',
      regular:
        'https://images.unsplash.com/photo-1659661272820-b86f4750cee6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080',
      small:
        'https://images.unsplash.com/photo-1659661272820-b86f4750cee6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400',
      thumb:
        'https://images.unsplash.com/photo-1659661272820-b86f4750cee6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1659661272820-b86f4750cee6',
    },
    links: {
      self: 'https://api.unsplash.com/photos/nHc4JRqq0NM',
      html: 'https://unsplash.com/photos/nHc4JRqq0NM',
      download:
        'https://unsplash.com/photos/nHc4JRqq0NM/download?ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk',
      download_location:
        'https://api.unsplash.com/photos/nHc4JRqq0NM/download?ixid=MnwzNTI4NDF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTk3NzI4ODk',
    },
    categories: [],
    likes: 5,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: 'GA8BER4Fd2U',
      updated_at: '2022-08-06T07:58:58Z',
      username: 'davegoudreau',
      name: 'Dave Goudreau',
      first_name: 'Dave',
      last_name: 'Goudreau',
      twitter_username: 'TheGHomie',
      portfolio_url: 'http://davegoudreau',
      bio: 'Streets \u0026 Faces.\r\n',
      location: 'Qc, Canada',
      links: {
        self: 'https://api.unsplash.com/users/davegoudreau',
        html: 'https://unsplash.com/@davegoudreau',
        photos: 'https://api.unsplash.com/users/davegoudreau/photos',
        likes: 'https://api.unsplash.com/users/davegoudreau/likes',
        portfolio: 'https://api.unsplash.com/users/davegoudreau/portfolio',
        following: 'https://api.unsplash.com/users/davegoudreau/following',
        followers: 'https://api.unsplash.com/users/davegoudreau/followers',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1586154327904-e11abd5d7513image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32',
        medium:
          'https://images.unsplash.com/profile-1586154327904-e11abd5d7513image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64',
        large:
          'https://images.unsplash.com/profile-1586154327904-e11abd5d7513image?ixlib=rb-1.2.1\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128',
      },
      instagram_username: 'Dave_goudreau',
      total_collections: 0,
      total_likes: 998,
      total_photos: 943,
      accepted_tos: true,
      for_hire: false,
      social: {
        instagram_username: 'Dave_goudreau',
        portfolio_url: 'http://davegoudreau',
        twitter_username: 'TheGHomie',
        paypal_email: null,
      },
    },
  },
]

function App() {
  const [photos, setPhotos] = React.useState<Photo[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)

    return window.removeEventListener('scroll', handleScroll)
  }, [])

  // TODO: Implement Custom Hook
  React.useEffect(() => {
    // ;(async function () {
    //   try {
    //     setIsLoading(true)
    //     const { response } = await unsplashApi.photos.getRandom({
    //       count: 12,
    //     })
    //     setPhotos((photos) => [...photos, ...(response as unknown as Photo[])])
    //   } catch (err) {
    //     console.error(err)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // })()
  }, [page])

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
        <Gallery id="unsplashGallery">
          {mockPhotos?.length &&
            mockPhotos.map(({ urls, width, height, user }, i) => (
              <Item
                original={urls.full}
                thumbnail={urls.thumb}
                width={width}
                height={height}
                caption={user.name}
                id={`img${i}`}
                key={i}
              >
                {({ ref, open }) => (
                  <img
                    ref={ref as React.LegacyRef<HTMLImageElement> | undefined}
                    onClick={open}
                    src={urls.thumb}
                    alt={urls.full}
                  />
                )}
              </Item>
            ))}
        </Gallery>
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </main>
    </>
  )
}

export { App }
