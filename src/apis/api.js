import _ from 'lodash'
import { rawDataModel } from '../dataModels/rawData'

const baseURL = 'https://itunes.apple.com/hk'

const grossingURL = limit => {
  return `${baseURL}/rss/topgrossingapplications/limit=${limit}/json`
}

const freeURL = limit => {
  return `${baseURL}/rss/topfreeapplications/limit=${limit}/json`
}

const lookupURL = id => {
  return `${baseURL}/lookup?id=${id}`
}

export const fetchTopGrossingApps = async () => {
  try {
    const response = await fetch(grossingURL(10))
    const data = await response.json()
    const models = data.feed.entry.map(raw => rawDataModel(raw))
    return models
  } catch (err) {
    console.error(err)
  }
}

export const fetchTopFreeApps = async () => {
  try {
    const response = await fetch(freeURL(100))
    const data = await response.json()
    const models = data.feed.entry.map(raw => rawDataModel(raw))
    return models
  } catch (err) {
    console.error(err)
  }
}

export const fetchAppsLookup = async id => {
  try {
    const response = await fetch(lookupURL(id))
    const data = await response.json()
    const { averageUserRating, userRatingCount } = data.results[0]
    return {
      averageUserRating,
      userRatingCount
    }
  } catch (err) {
    console.error(err)
  }
}

export const getFullList = async apps => {
  return Promise.all(
    apps.map(async app => {
      const result = await fetchAppsLookup(app.id)
      return { ...app, ...result }
    })
  )
}
