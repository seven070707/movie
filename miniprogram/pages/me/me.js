const util = require('../../utils/util')
const db = require('../../utils/db')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    tihuoWay: '选择影评'
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })
    
    if (name === "收藏的影评"){
      this.getCommentListByUser(this.data.userInfo.nickName, true)
    }else{
      this.getCommentListByUser(this.data.userInfo.nickName, false)
    }
    
  },

  onTapBackHome() {
    wx.navigateTo({
      url: `/pages/home/home`,
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  /**
     * 获取用户电影列表（ifStore：true为收藏）
     */
  getCommentListByUser(userName,ifStore) {

    wx.showLoading({
      title: 'Loading...'
    })

    db.getCommentListByUser(userName, ifStore).then(result => {
      wx.hideLoading()
      console.log(result)

      const data = result.data


      if (data) {
        this.setData({
          movieList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      //默认展示收藏的影评列表
      this.getCommentListByUser(this.data.userInfo.nickName, true)

    }).catch(err => {
      console.log('Not Authenticated yet');
    })

    this.setData({
      movieList: this.data.movieList
    })
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