import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native'
import _ from 'lodash'

import * as actions from '../redux/actions'
import SearchItem from '../components/SearchItem'
import NoSearch from '../components/NoSearch'
import RecommendList from '../components/RecommendList'
import RecommendItem from '../components/RecommendItem'
import InfiniteList from '../components/InfiniteList'
import ListItem from '../components/ListItem'
import Indicator from '../components/Indicator'
import styles from './styles/MainScreen.style'

class MainScreen extends Component {
  componentDidMount() {
    this.fetchTopGrossingApps()
    this.fetchTopFreeApps()
  }

  onqueriesChanged = _.debounce(
    queries => {
      this.props.actions.getSearchAppsResult(queries)
    },
    100,
    {
      leading: true,
      trailing: true
    }
  )

  onEndReached = () => {
    const { isFetchingTopFree, isSearching } = this.props.data
    if (!isFetchingTopFree && !isSearching) {
      this.props.actions.getTopFreeApps()
    }
  }

  fetchTopGrossingApps = () => {
    this.props.actions.getTopGrossingApps()
  }

  renderRecommendItem = ({ item, index }) => (
    <RecommendItem key={index} item={item} />
  )

  fetchTopFreeApps = () => {
    this.props.actions.getTopFreeApps()
  }

  renderListItem = ({ item, index }) => (
    <ListItem key={index} i={index} item={item} />
  )

  renderSectionFooter = ({ section }) => {
    const { limit, isSearching } = this.props.data
    if (!isSearching && section.index === 1 && limit < 100) {
      return <Indicator />
    } else if (
      (section.index === 1 && limit === 100) ||
      (section.index === 1 && isSearching)
    ) {
      return (
        <View style={styles.view}>
          <Text style={styles.text}>Done</Text>
        </View>
      )
    }
  }

  render() {
    const {
      limit,
      isSearching,
      isFetchingTopGrossing,
      topGrossingApps,
      topFreeApps,
      grossingAppsSearchResults,
      freeAppsSearchResults
    } = this.props.data

    const sections = []

    const queryTopGrossingRenderItem = () => (
      <RecommendList
        renderItem={this.renderRecommendItem}
        data={isSearching ? grossingAppsSearchResults : topGrossingApps}
        isFetching={isFetchingTopGrossing}
      />
    )

    const TopGrossing = {
      index: 0,
      data: [{ key: 'value' }],
      renderItem: queryTopGrossingRenderItem
    }

    const TopFree = {
      index: 1,
      data: isSearching ? freeAppsSearchResults : topFreeApps.slice(0, limit)
    }

    if (!isSearching || grossingAppsSearchResults.length > 0) {
      sections.push(TopGrossing)
    }

    if (!isSearching || freeAppsSearchResults.length > 0) {
      sections.push(TopFree)
    }

    return (
      <SearchItem
        searchPlaceholder="Search..."
        onqueriesChanged={this.onqueriesChanged}
      >
        {sections.length === 0 ? (
          <NoSearch />
        ) : (
          <InfiniteList
            sections={sections}
            renderItem={this.renderListItem}
            onEndReached={this.onEndReached}
            renderSectionFooter={this.renderSectionFooter}
          />
        )}
      </SearchItem>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
