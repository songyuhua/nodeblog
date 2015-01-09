/**
 * Created by Administrator on 2014/12/30.
 * 文章详情页面
 */
$(function () {
    $('pre').addClass('prettyprint');
    prettyPrint();
    hljs.initHighlightingOnLoad();
    $('.del').click(function (e) {
        var target = $(e.target)
        var id = target.attr('articleId')
        $.ajax({
            type: 'DELETE',
            url: '/admin/article/list?id=' + id
        }
        ).done(function (results) {
                console.log('删除成功');
                window.location.href='/';
            });

    })
});
