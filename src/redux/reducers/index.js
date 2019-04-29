import { combineReducers } from 'redux'
import {
  REQUEST_TOP_GROSSING_APPS,
  RECEIVE_TOP_GROSSING_APPS_RES,
  RECEIVE_TOP_GROSSING_APPS_ERR,
  REQUEST_TOP_FREE_APPS,
  RECEIVE_TOP_FREE_APPS_RES,
  RECEIVE_TOP_FREE_APPS_ERR,
  SEARCH_APPS,
  SEARCH_APPS_RESULTS
} from '../actions'

const INITIAL_STATE = {
  isSearching: false,
  isFetchingTopGrossing: false,
  isFetchingTopFree: false,
  topGrossingApps: [],
  topFreeApps: [],
  grossingAppsSearchResults: [],
  freeAppsSearchResults: [],
  limit: 10
}

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TOP_GROSSING_APPS:
      return { ...state, isFetchingTopGrossing: true }
    case RECEIVE_TOP_GROSSING_APPS_RES:
      return {
        ...state,
        isFetchingTopGrossing: false,
        topGrossingApps: action.topGrossing
      }
    case RECEIVE_TOP_GROSSING_APPS_ERR:
      return { ...state, isFetchingTopGrossing: false, topGrossingApps: [] }
    case REQUEST_TOP_FREE_APPS:
      return { ...state, isFetchingTopFree: true }
    case RECEIVE_TOP_FREE_APPS_RES:
      return {
        ...state,
        isFetchingTopFree: false,
        topFreeApps: action.topFree,
        limit: action.limit
      }
    case RECEIVE_TOP_FREE_APPS_ERR:
      return { ...state, isFetchingTopFree: false, topFreeApps: [] }
    case SEARCH_APPS:
      return {
        ...state,
        isSearching: action.queries.length > 0,
        grossingAppsSearchResults: [],
        freeAppsSearchResults: []
      }
    case SEARCH_APPS_RESULTS: {
      const { grossing, free } = action.payload
      return {
        ...state,
        grossingAppsSearchResults: grossing,
        freeAppsSearchResults: free
      }
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data: reducers
})

export default rootReducer
