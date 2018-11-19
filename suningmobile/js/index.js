window.onload=function () {
    search();
    banner();
    sktime();
};

var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    /*监听滚动事件*/
    window.onscroll = function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var opacity = 0;
        /*向下滚动的时候 越来越不透明 透明度上限0.85*/
        if (scrollTop<height){
            opacity = scrollTop / height *0.85;
        }else {
            opacity = 0.85;
        }
        searchBox.style.background='rgba(201,21,35,'+opacity+')';
    }
};

var banner = function () {
    var banner = document.querySelector('.jd_banner');
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');
    var width = banner.offsetWidth;

    var index = 1;

    var setTransition = function () {
        imageBox.style.transition='all 0.2s';
        imageBox.style.webkitTransition='all 0.2s';
    };
    var setTranslateX = function (x) {
        imageBox.style.transform='translateX('+x+'px)';
        imageBox.style.webkitTransform='translateX('+x+'px)';
    };
    var clearTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var setPoint = function () {
        /*此时index 1-8   所以index-1即可*/
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index-1].classList.add('now');
    };
    /*自动无缝播放*/
    var timer = setInterval(function () {
        index++;
        /*过渡效果*/
        setTransition();
        /*做位移*/
        setTranslateX(-index*width);
    },2000);
    imageBox.addEventListener('transitionend',function () {
        /*自动播放时的无缝*/
       if(index>=9){
           index=1;
           /*瞬间定位*/
           /*清除过渡*/
           clearTransition();
           /*做位移*/
           setTranslateX(-index*width);
       }
           /*滑动时也要无缝*/
        else if(index<=0){
           index=8;
           /*瞬间定位*/
           /*清除过渡*/
           clearTransition();
           /*做位移*/
           setTranslateX(-index*width);
       }

        setPoint();
    });

    /*手指滑动功能*/
    var startX= 0;
    var distance =0;
    var isMove = false;
    imageBox.addEventListener('touchstart',function (e) {
        /*进来先关掉定时器*/
        clearInterval(timer);
       startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function (e) {
        var moveX = e.touches[0].clientX;
        distance = moveX - startX;
        clearTransition();
        setTranslateX(-index*width+distance);
        isMove = true;
    });
    imageBox.addEventListener('touchend',function () {
        if(isMove){
            /*滑动少于屏幕的1/3 吸附回去*/
            if(Math.abs(distance)<width/3){
                setTransition();
                setTranslateX(-index*width);
            }
            /*大于则滑动上、下一张*/
            else if(Math.abs(distance)>=width/3){
                if(distance>0){
                    index--;
                }else{
                    index++;
                }
                setTransition();
                setTranslateX(-index*width);
            }
        }
        /*重置参数防止污染*/
        startX= 0;
        distance =0;
        isMove = false;

        /*重开定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*过渡效果*/
            setTransition();
            /*做位移*/
            setTranslateX(-index*width);
        },2000);

    });


};

var sktime = function () {
    /*假设6小时倒计时*/
    var spans = document.querySelector('.time').querySelectorAll('span');
    var time = 30;

    var timer = setInterval(function () {
        time--;

        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML= Math.floor(h/10);
        spans[1].innerHTML= h%10;

        spans[3].innerHTML= Math.floor(m/10);
        spans[4].innerHTML= m%10;

        spans[6].innerHTML= Math.floor(s/10);
        spans[7].innerHTML= s%10;

        if(time<=0){
            clearInterval(timer);
        }
    },1000);






};
