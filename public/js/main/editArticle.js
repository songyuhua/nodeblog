/**
 * Created by Administrator on 2015/1/7.
 */
$(function () {
    var opts = {
        basePath: '/libs/epicEditor/0.2.2'
        //textarea:'my-edit-area',
    };
    var editor = new EpicEditor(opts).load();

    $('pre').addClass('prettyprint');
    prettyPrint();

    hljs.initHighlightingOnLoad();

    $('.editArticle').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputTitle: {
                message: 'The inputTitle is not valid',
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    }
                }
            }
        }
    });


    $('.btn_submitArticle').click(function () {
        $('.editArticle').data('bootstrapValidator').validate();
        var flag = $('.editArticle').data('bootstrapValidator').isValid();
        if (flag) {
            var title = $('#inputTitle').val();
            var content = editor.exportFile('epiceditor','html');
            console.log(content);
            //var content = $('#signinPassword').val();
            $.ajax({
                type: 'post',
                url: '/admin/article',
                data: {article:{
                    title:title,
                    content:content}
                },
                statusCode: {
                    404: function () {
                        alert("保存失败");
                    },
                    200: function () {
                        alert("保存成功");
                        window.location.href = '/';
                    }
                },
                error: function () {
                    alert("保存失败");
                }
            });
        }

    });
});