/*
 * @Author: TR
 * @Date: 2021-06-16 09:31:55
 * @LastEditors: no BUG
 * @LastEditTime: 2021-06-20 21:34:46
 * @Description:
 */
var layer = layui.layer
var form = layui.form
// 初始化富文本编辑器
initEditor()
//请求数据
initCate()
//请求获取文章分类列表，渲染到下拉菜单
function initCate() {

  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      //通过模板引擎渲染数据
      var htmlStr = template('tpl-cate', res)
      $('[name=cate_id]').html(htmlStr);
      //layui的render()方法，
      form.render()
    }
  })

}
// 1. 获取图片
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}
// 3. 初始化裁剪区域
$image.cropper(options)

//为选择封面的按钮，绑定点击事件处理函数   
$('#btnChooseImage').on('click', function () {
  $('#coverFile').click()
})
$('#coverFile').on('change', function (e) {
  var files = e.target.files

})