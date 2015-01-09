$(function() {
    $('.del').click(function(e){
        var targ = $(e.target);
        var id = targ.attr('date-id');
        var tr = $('.item-id-'+id);

        $.ajax({
            type:'DELETE',
            url:'/admin/movie/list?id='+id
        }).done(function(res){
            if(res.success === true){
                if(tr.length > 0){
                    tr.remove();
                }
            }
        });
    });

    $('#douban').blur(function() {
        var douban = $(this)
        var id = douban.val()

        if (id) {
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function(data) {
                    $('#inputTitle').val(data.title)
                    $('#inputDoctor').val(data.directors[0].name)
                    $('#inputCountry').val(data.countries[0])
                    $('#inputPoster').val(data.images.large)
                    $('#inputYear').val(data.year)
                    $('#inputSummary').val(data.summary)
                }
            })
        }
    })
})