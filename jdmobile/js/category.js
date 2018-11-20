/**
 * Created by Charmming on 2018/10/12.
 */
window.onload=function () {
    new IScroll(document.querySelector('.cateLeft'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.cateRight'),{
        scrollX:false,
        scrollY:true
    });
};