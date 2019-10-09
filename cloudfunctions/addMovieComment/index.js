// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  await db.collection('movie_review').add({
    data: {
      user,
      username: event.username,
      avatar: event.avatar,
      content: event.content,
      contentSize:event.contentSize,
      movieId: event.movieId,
      movieImage:event.movieImage,
      movieName:event.movieName,
      ifStore:event.ifStore,
      createTime: +new Date(),
    },
  })

  return {}
}