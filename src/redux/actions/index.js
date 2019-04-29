import {
  fetchTopGrossingApps,
  fetchTopFreeApps,
  getFullList
} from '../../apis/api'
import _ from 'lodash'
import { queryDataModel } from '../../dataModels/queryData'

export const REQUEST_TOP_GROSSING_APPS = 'REQUEST_TOP_GROSSING_APPS'
export const RECEIVE_TOP_GROSSING_APPS_RES = 'RECEIVE_TOP_GROSSING_APPS_RES'
export const RECEIVE_TOP_GROSSING_APPS_ERR = 'RECEIVE_TOP_GROSSING_APPS_ERR'
export const REQUEST_TOP_FREE_APPS = 'REQUEST_TOP_FREE_APPS'
export const RECEIVE_TOP_FREE_APPS_RES = 'RECEIVE_TOP_FREE_APPS_RES'
export const RECEIVE_TOP_FREE_APPS_ERR = 'RECEIVE_TOP_FREE_APPS_ERR'
export const SEARCH_APPS = 'SEARCH_APPS'
export const SEARCH_APPS_RESULTS = 'SEARCH_APPS_RESULTS'

export const searchApps = queries => ({ type: SEARCH_APPS, queries })

export const receiveSearchResults = (grossing, free) => ({
  type: SEARCH_APPS_RESULTS,
  payload: { grossing, free }
})

export const requestTopGrossingApps = () => ({
  type: REQUEST_TOP_GROSSING_APPS
})

export const receiveTopGrossingAppsRes = topGrossing => ({
  type: RECEIVE_TOP_GROSSING_APPS_RES,
  topGrossing
})

export const receiveTopGrossingAppsErr = err => ({
  type: RECEIVE_TOP_GROSSING_APPS_ERR,
  err
})

export const requestTopFreeApps = () => ({
  type: REQUEST_TOP_FREE_APPS
})

export const receiveTopFreeAppsRes = (topFree, limit) => ({
  type: RECEIVE_TOP_FREE_APPS_RES,
  topFree,
  limit
})

export const receiveTopFreeAppsErr = err => ({
  type: RECEIVE_TOP_FREE_APPS_ERR,
  err
})

export const getSearchAppsResult = queries => {
  if (queries.length === 0) {
    return dispatch => {
      dispatch(searchApps(queries))
    }
  }
  return (dispatch, getState) => {
    dispatch(searchApps(queries))
    const { topGrossingApps, topFreeApps } = getState().data
    const grossing = queryDataModel(topGrossingApps, queries)
    const free = queryDataModel(topFreeApps, queries)
    dispatch(receiveSearchResults(grossing, free))
  }
}

export const getTopGrossingApps = () => {
  return async dispatch => {
    dispatch(requestTopGrossingApps())
    try {
      const entry = await fetchTopGrossingApps()
      dispatch(receiveTopGrossingAppsRes(entry))
    } catch (err) {
      dispatch(receiveTopGrossingAppsErr(err))
    }
  }
}

export const getTopFreeApps = () => {
  return async (dispatch, getState) => {
    const { topFreeApps, limit } = getState().data
    if (topFreeApps.length === 0) {
      dispatch(requestTopFreeApps())
      try {
        const list = await fetchTopFreeApps()
        const listStart = list.slice(0, limit)
        const listEnd = list.slice(limit)
        const listMid = await getFullList(listStart)
        const fullList = [...listMid, ...listEnd]

        dispatch(receiveTopFreeAppsRes(fullList, limit))
      } catch (err) {
        dispatch(receiveTopFreeAppsErr(err))
      }
    } else {
      const breakPoint = Math.min(100, limit + 10)
      const listStart = topFreeApps.slice(0, limit)
      const listBreak = topFreeApps.slice(limit, breakPoint)
      const listEnd = topFreeApps.slice(breakPoint)
      const listMid = await getFullList(listBreak)
      const fullList = [...listStart, ...listMid, ...listEnd]
      dispatch(receiveTopFreeAppsRes(fullList, breakPoint))
    }
  }
}
