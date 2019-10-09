// pages/commentlist/commentlist.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[]
  },

  onTapBackHome(){
    wx.navigateTo({
      url: `/pages/home/home`,
    })
  },

  /**
   * 获取影评列表
   */
  getCommentList(movieId) {
    wx.showLoading({
      title: 'Loading...'
    })

    console.log("movieId")
    console.log(movieId)
    db.getCommentListByMovieId(movieId).then(result => {
      wx.hideLoading()
      console.log(result)
      const data = result.result.data
      if (data) {
        this.setData({
          commentList: data
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      //获取影评列表
      this.getCommentList(options.id)

    }).catch(err => {
      console.log('Not Authenticated yet');
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