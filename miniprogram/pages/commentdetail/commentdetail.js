// pages/commentdetail/commentdetail.js
const db = require('../../utils/db')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
    },
    submit:false,
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '文字' },
      { bindtap: 'Menu2', txt: '语音' }
    ],
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

    const movieitem = this.data.movie.movieId
    const moviemenu = this.data.menu

    wx.navigateTo({
      url: `/pages/commentedit/commentedit?id=${movieitem}&menu=${moviemenu}`,
    })
  },
  bindMenu2: function () {
    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })

    const movieitem = this.data.movie.movieId
    const moviemenu = this.data.menu

    wx.navigateTo({
      url: `/pages/commentedit/commentedit?id=${movieitem}&menu=${moviemenu}`,
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  /**
     * 播放音频
     */
  onTapPlayRecord() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.movie.content
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
  },
  
  /**
   * 收藏这个影评
   */
  onTapStore(){
    //先判断这个用户是否收藏过该评论
    db.getComment(this.data.movie.movieName,this.data.movie.content, this.data.movie.user).then(result => {
      const data = result.data
      console.log(data)
      if (data.length) {
        console.log("angist")
        wx.showToast({
          title: 'Succeed'
        })
      }else{
        db.addMovieComment({
          username: this.data.movie.username,
          avatar: this.data.movie.avatar,
          content: this.data.movie.content,
          movieId: this.data.movie.movieId,
          movieImage: this.data.movie.movieImage,
          movieName: this.data.movie.movieName,
          ifStore: true
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
      }
    }).catch(err => {
      console.error(err)
    })
  },

  /**
   * 写影评
   * 如果是点评过，则跳转到点评详情页。如果没有点评则开启点评
   */
  onTapJumpDetail() {
    //存在点评过，需要跳转到该点评详情页
    wx.navigateTo({
      url: `/pages/commentdetail/commentdetail?id=${this.data.movie._id}`,
    })
  },


  getCommentDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getCommentDetail(id).then(result => {
      wx.hideLoading()
      console.log("getCommentDetail")
      console.log(id)
      console.log(result)
      const data = result.result

      if (data) {
        this.setData({
          movie: data

        })

        console.log(this.data.movie)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.getCommentDetail(options.id)

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
    //判断用户有没有点评过
    db.getCommentByUser(this.data.movie.movieName, this.data.movie.username).then(result => {
      const data = result.data
      console.log(data)
      if (data.length) {
        this.setData({
          submit:false
        })
        
      } else {
        //进入选择文字还是音频点评流程
        this.setData({
          submit: true
        })
      }
    }).catch(err => {
      console.error(err)
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