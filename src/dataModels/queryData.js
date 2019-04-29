import _ from 'lodash'

export const queryDataModel = (models, keyword) => {
  const formatQuery = keyword.toLowerCase()
  const formatModel = _.filter(models, item => {
    return (
      item.name.toLowerCase().includes(formatQuery) ||
      item.category.toLowerCase().includes(formatQuery) ||
      item.summary.toLowerCase().includes(formatQuery) ||
      item.author.toLowerCase().includes(formatQuery)
    )
  })
  return formatModel
}
