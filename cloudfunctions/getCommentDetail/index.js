// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const _id = event.id

  const detail = await db.collection('movie_review').where({
    _id
  }).limit(1).get()

  return detail.data[0]
}