/*
 * @Author: TR
 * @Date: 2021-06-16 09:37:00
 * @LastEditors: no BUG
 * @LastEditTime: 2021-06-19 19:55:39
 * @Description: 
 */
$(function () {
  var form = layui.form
  var layer = layui.layer
  initArtCateList()
  //获取文章类别
  function initArtCateList() {
    $.ajax({
      methods: 'POST',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        //模板引擎
        var htmlStr = template('tpl-table', res)
        //添加到页面
        $("#tbVal").html(htmlStr)
      }
    })
  }
  //实现添加图书弹窗
  var indexAdd = null
  $("#btnAddCate").on('click', function () {
    indexAdd = layer.open({
      type: 1,
      title: '添加文章类别',
      area: ['500px', '250px'],
      content: $('#dialog-add').html(),
    });
  })
  //添加图书类别
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 关闭弹出层
        layer.close(indexAdd)
      }
    })
  })

  //修改按钮事件弹出框
  var indexEdit = null
  $('body').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      title: '修改文章类别',
      area: ['500px', '250px'],
      content: $('#dialog-edit').html(),
    });
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        console.log(res);
        form.val('form-edit', res.data)
      }
    })
  })
  //修改分类信息
  $('body').on('submit ', '#form-edit', function (e) {
    console.log(11);
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('修改信息失败')
        layer.msg('修改信息成功')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })
  //事件委托，删除分类信息
  $("body").on('click', '.btn-delete', function (e) {
    e.preventDefault()
    var id = $(this).attr('data-id');
    console.log(id);
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg('删除信息失败')
          layer.msg('删除信息成功')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})