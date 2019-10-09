// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const movieId = event.movieId

  // cart list
  const movieRes = await db.collection('movie_review').where({
    movieId,
    ifStore:false
  }).get()

  return movieRes
}