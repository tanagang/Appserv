window.onload = function(){
    init();
    window.onresize = function(){
        setTimeout(function(){
            init();
        },100);
    }
    function init(){
        var percent = parseInt(document.body.offsetWidth)/320*100;
        document.getElementsByTagName("html")[0].style.cssText="font-size:"+percent+"px";
    }
    //多选按钮的选中状态，rel=0即没有选中
    $("label.chk").each(function(index, el) {
            var obj = $(this).find("span");
            if(obj.attr("rel")==0){
                obj.removeClass('chk-active');
            }else if(obj.attr("rel")==1){
                obj.addClass('chk-active');
            }
        });
        $(document).on('click', 'label.chk', function(event) {
            var obj = $(this).find("span");
            var rel = obj.attr("rel");
            if(rel==0){
                obj.addClass('chk-active').attr("rel","1");
            }else if(rel==1){
                obj.removeClass('chk-active').attr("rel","0");
            }
        });
}