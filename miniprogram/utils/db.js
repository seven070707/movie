const db = wx.cloud.database({
  env: 'store-91fad3-mdybt'
})

const util = require('./util')

module.exports = {

  addimg(img){
    return wx.cloud.callFunction({
      name: 'addimg',
      data: {
        img: img
      },
    })
  },

  /**
   *获取电影列表，从数据库中 
   */
  getMovieList(){
    return db.collection('movie_list').get()
  },

  /**
   * 获取电影详情，从数据库中
   */
  getMovieDetail(id){
    return wx.cloud.callFunction({
      name: 'movieDetail',
      data: {
        id: id
      },
    })
  },

  /**
   * 更新影评
   */
  updateMovieComment(data){
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'updateMovieComment',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  /**
   * 删除影评
   */
  delMovieComment(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'delMovieComment',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  /**
   * 添加影评
   */
  addMovieComment(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addMovieComment',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  /**
   * 获取影评
   */
  getMovieComment(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getMovieComment',
          data: {
            id: data
          },
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  /**
   * 获取影评
   */
  getCommentDetail(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getCommentDetail',
          data: {
            id: data
          },
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  /**
   * 获取该电影到所有影评
   */
  getCommentListByMovieId(movieId){
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getCommentList',
          data: {
            movieId: movieId
          },
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  /**
   * 判断影评有没有被收藏，防止重复收藏
   */
  getComment(movieName,content,user) {
    console.log(movieName)
    console.log(content)
    console.log(user)
    return db.collection('movie_review').where({
      movieName,
      content,
      user,
      ifStore:true
    }).get()
  },

  /**
  * 判断这个用户有没有点评过
  */
  getCommentByUser(movieName, username) {
    return db.collection('movie_review').where({
      movieName,
      username,
      ifStore: false
    }).get()
  },

  /**
   * 获取用户的影评
   * 参数为用户名 收藏或者点评
   */
  getCommentListByUser(username,ifStore){
    return db.collection('movie_review').where({
      username:username,
      ifStore:ifStore
    }).get()
  },

  /**
   * 获取所有影评
   */
  getCommentList(){
    return db.collection('movie_review').get()
  },
  
  /**
   * get products list
   */
  getProductList() {
    return db.collection('product').get()
  },

  /**
   * get product detail
   */
  getProductDetail(id) {
    return wx.cloud.callFunction({
      name: 'productDetail',
      data: {
        id: id
      },
    })
  },

  uploadImage(imgPath) {
    return wx.cloud.uploadFile({
      cloudPath: `review/${util.getId()}`,
      filePath: imgPath,
    })
  },

  addToOrder(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addToOrder',
          data,
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  getOrders() {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getOrders',
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  addToCart(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addToCart',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  getCart() {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getCart',
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  updateCart(list) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'updateCart',
          data: {
            list,
          },
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  addReview(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addReview',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  getReviews(productId) {
    return db.collection('review').where({
      productId,
    }).get()
  },
}