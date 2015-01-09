/**
 * Created by Administrator on 2014/12/5.
 */
$(function () {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var loginWidth = $('.loginContainer').width();
    var loginHeight = $('.loginContainer').height();

    var loginOffset = {
        left:(windowWidth - loginWidth) / 2,
        top:(windowHeight - loginHeight) / 2
    }
    $('.loginContainer').offset(loginOffset);

    $('.loginContainer').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度在3-30个字符之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '只能包含数字、字母、下划线'
                    }
                }
            },
            password: {
                validators: {
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码长度在6-30个字符之间'
                    },
                    notEmpty: {
                        message: '密码不能为空'
                    }
                }
            }
        }
    });


    $('.btn_submit').click(function () {
        $('.loginContainer').data('bootstrapValidator').validate();
        var flag = $('.loginContainer').data('bootstrapValidator').isValid();
        if(flag){
            var name = $('#signinName').val();
            var password = $('#signinPassword').val();
            $.ajax({
                type: 'post',
                url: '/user/signin',
                data: {user: {
                    name: name,
                    password: password}
                },
                statusCode: {
                    404: function () {
                        alert("不存在该用户");
                    },
                    200: function () {
                        alert("登陆成功");
                        window.location.href='/';
                    }
                },
                error: function () {
                    alert("不存在该用户");
                }
            });
        }

    });
});

