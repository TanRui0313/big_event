/*
 * @Author: TR
 * @Date: 2021-06-16 09:37:00
 * @LastEditors: no BUG
 * @LastEditTime: 2021-06-19 11:56:24
 * @Description:
 */

var form = layui.form
var layer = layui.layer

form.verify({
    nickname: function (value) {
        if (value.length > 10) {
            return '昵称长度必须在 1 ~ 10 个字符之间！'
        }
    }
})
getUserInfo()
function getUserInfo() {
    $.ajax({
        methods: 'GET',
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) {
                console.log(res);
                return layer.msg('获取用户信息失败！')
            }
            form.val('formUserInfo', res.data)
        },
    })
}
$(".layui-form").on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: res => {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
        }
    })
})
$('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    //重新调用请求数据
    getUserInfo()
})