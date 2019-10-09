// pages/home/home.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
  },

  onTapList(){
    wx.navigateTo({
      url: `/pages/list/list`,
    })
  },

  onTapMe(){
    wx.navigateTo({
      url: '/pages/me/me',
    })
  },

  /**
   * 跳转到电影详情页
   */
  onTapMovieDetail(){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${this.data.commentList[0].movieId}`,
    })
  },

  /**
   * 跳转到影评详情页
   */
  onTapComment(){
    wx.navigateTo({
      url: `/pages/commentdetail/commentdetail?id=${this.data.commentList[0]._id}`,
    })
  },

  /**
   * 获取影评列表
   */
  getCommentList() {
    wx.showLoading({
      title: 'Loading...'
    })

    db.getCommentList().then(result => {
      wx.hideLoading()
      console.log(result)

      const data = result.data


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
  
    this.getCommentList()

    this.setData({
      commentList: this.data.commentList
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