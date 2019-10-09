// pages/detail/detail.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
    },

    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '文字' },
      { bindtap: 'Menu2', txt: '语音' }
    ],
    menu: ''

  },

  onTapViewComment(){
    wx.navigateTo({
      url: `/pages/commentlist/commentlist?id=${this.data.movie._id}`,
    })
  },

  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function () {
    this.setData({
      menu: 1,
      actionSheetHidden: !this.data.actionSheetHidden
    })

    const movieitem = this.data.movie
    const moviemenu = this.data.menu

    wx.navigateTo({  
      url: `/pages/commentedit/commentedit?id=${movieitem._id}&menu=${moviemenu}`,
    })
  },
  bindMenu2: function () {
    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })

    const movieitem = this.data.movie
    const moviemenu = this.data.menu

    wx.navigateTo({
      url: `/pages/commentedit/commentedit?id=${movieitem._id}&menu=${moviemenu}`,
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      console.log("12122")
      console.log(options.id)
      this.getMovieDetail(options.id)

    }).catch(err => {
      console.log('Not Authenticated yet');
    })

    this.setData({
      movie: this.data.movie
    })
    
  },

  onTapReviewEntry() {
    if (this.data.product.reviewCount) {
      const product = this.data.product
      wx.navigateTo({
        url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
      })
    }
  },
  
  getMovieDetail(id){
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovieDetail(id).then(result => {
      wx.hideLoading()
      console.log(result)
      const data = result.result

      if (data) {
        this.setData({
          movie: data
          
        })

        console.log(data)
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    })
  },
  
  buy(){
    wx.showLoading({
      title: 'Purchasing...',
    })

    const productToBuy = Object.assign({
      count: 1
    }, this.data.product)

    productToBuy.productId = productToBuy._id

    db.addToOrder({
      list: [productToBuy]
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  addToCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.addToCart(this.data.product).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})