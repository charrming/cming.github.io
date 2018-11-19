
$(function () {
    banner();
    initMobileTab();

    $('[data-toggle="tooltip"]').tooltip();


});
/*轮播图响应式问题 + 手势滑动*/
var banner = function () {
    /*有缓存数据的步骤 注意理解！*/
    var getData = function (callback) {
        if(window.data){
            callback && callback(window.data);
        }else{
            $.ajax({
                type:'get',
                url:'js/data.json',
                datatype:'json',
                data:'',
                success:function (data) {
                    window.data = data;
                    callback && callback(window.data);

                }
            });
        }
    };
    var render = function() {
        getData(function (data) {
            var isMob = $(window).width() < 768;

            var pointHtml = template('pointTemplate',{list:data});

            var imageHtml = template('imageTemplate',{list:data,isM:isMob});
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    };


    $(window).on('resize',function () {
        render();
    }).trigger('resize');

    /*移动端手势切换*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart',function (e) {
        console.log(e);
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function () {
        if(isMove && Math.abs(distanceX)>50){
            if(distanceX > 0){
                /*这个方法在bootstrap文档里找的*/
                $('.carousel').carousel('prev');
            }else{
                $('.carousel').carousel('next');
            }
        }
        /*重置参数*/
        startX = 0;
        distanceX = 0;
        isMove = false;
    });

};


/*产品模块 页签在移动端滑动问题*/
var initMobileTab =function () {
    /*首先解决换行的问题*/
    var width = 0;
    var $navTabs = $('.wjs_product .nav-tabs');
    $navTabs.find('li').each(function (i,item) {
        var currLi = $(this);
        var liWidth = currLi.outerWidth(true);
        width += liWidth;
    });
    $navTabs.width(width);

    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    })
};