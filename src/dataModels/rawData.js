export const rawDataModel = raw => {
  const model = {
    id: raw.id.attributes['im:id'],
    name: raw['im:name'].label,
    author: raw['im:artist'].label,
    mediumImage: raw['im:image'][1].label,
    title: raw.title.label,
    category: raw.category.attributes.label,
    summary: raw.summary.label,
    averageUserRating: 0.0,
    userRatingCount: 0
  }
  return model
}
