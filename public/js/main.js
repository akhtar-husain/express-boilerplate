(function ($) {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
    });
    $('[data-toggle="tooltip"]').tooltip();

    /*setTimeout(function(){
    $('.alert').hide(500);
}, 2000);*/

// Set active classes to menu
var url = window.location;
var element = $('ul.sidebar-menu a').filter(function() {
    return this.href == url;
}).parent('li').addClass('active').parent().parent().addClass('menu-open');
if (element.is('li')) {
    element.addClass('active');
}

$('.search-btn').on('click',function(){return false;});
$('#input-search').keyup(function(e){
    var query = $.trim($(this).val()).toLowerCase();
    console.log(query);
    $('div.sidebar-menu a').each(function(){
        var $this = $(this);
        if($this.text().toLowerCase().indexOf(query) === -1)
        $this.closest('li').fadeOut();
        else $this.closest('li').fadeIn();
    });
});

/**********************************************************************************/
$(document).on('click', 'input.checkall', function(e){
    if($(this).prop('checked')) {
        $('.chk-list').each(function(){
            $(this).prop('checked', true);
        });
    } else {
        $('.chk-list').each(function(){
            $(this).prop('checked', false);
        });
    }
});
/***********************  S T O P   E D I T N G   H E R E ********************/
})(jQuery);

// Pace loading.
$(document).ajaxStart(function() { Pace.restart(); });
