// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const movieId = event.id

  // cart list
  const movieRes = await db.collection('movie_review').where({
    user,
    movieId
  }).limit(1).get()
  const review = movieRes.data[0]

  return review
}