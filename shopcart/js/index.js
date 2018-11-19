/**
 * Created by Charmming on 2018/9/16.
 */
$(function () {
    //初始化fullpage组件
    //1.设置每一个屏幕的背景颜色
    $(".container").fullpage({
        //配置参数
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation:true,
        scrollingSpeed:1000,
        //滚动到某一屏幕的回调函数
        afterLoad:function (link,index) {
            $(".section").eq(index-1).addClass("now");
        },
        //页面结构初始化后的回调函数
        afterRender:function () {
            $(".more").on("click",function () {
                //转移到下一页的方法
                $.fn.fullpage.moveSectionDown();
            });

            //当第四屏的购物车走后执行收货地址的动画
            $(".screen04 .cart").on("transitionend",function () {
                $(".screen04 .address").show().find("img:last").fadeIn(1000);
                $(".screen04 .text").addClass("show");
            });

            //最后一屏的动画效果
            $(".screen08").on("mousemove",function (e) {
                $(this).find(".hand").css({
                    left: e.clientX-200,
                    top: e.clientY-100
                })
            }).find(".again").on("click",function () {
                /*动画怎么怎么进行的？*/
                /*2.1 加now  类*/
                /*2.2 加leaved  类*/
                /*2.3 加show 类*/
                $(".now, .left, .show").removeClass("now").removeClass("left").removeClass("show")
                /*2.4 加css属性  后果：加一个style属性*/
                /*2.5 用jquery方法  show() fadeIn() 后果：加一个style属性*/
                $(".content [style]").removeAttr("style");
                
                $.fn.fullpage.moveTo(1);
            })

        },
        //滚动前的回调函数
        onLeave:function (index,nextIndex,direction) {
            if(index==2&&nextIndex==3){
                $(".section").eq(index-1).addClass("left");
            }else if(index==3&&nextIndex==4){
                $(".section").eq(index-1).addClass("left");
            }else if(index==5&&nextIndex==6){
                $(".section").eq(index-1).addClass("left");
                $(".screen06 .box").addClass("show");
            }else if(index==6&&nextIndex==7){
                $(".screen07 .stars img").each(function (i,item) {
                    // 前提是stars用了display none
                    $(this).delay(i*0.25*1000).fadeIn()
                });
                $(".screen07 .text").addClass("show");
            }
        },
    });

});
