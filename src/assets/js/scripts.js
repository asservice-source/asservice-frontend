$.widget.bridge('uibutton', $.ui.button);

//receive calls from typescript code to update the layouts
var AdminLTE = (function () {
  return {
    init: function () {
      $(function () {
        $.AdminLTE.layout.activate();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
      });
    }
  }
})(AdminLTE || {});

var labelsConfig = undefined;

$(function () {
  // ng2-smart-table pagine
  $('[aria-label="First"]>span').text('<<');
  $('[aria-label="Last"]>span').text('>>');

  // window.onbeforeunload = function() {
  //   localStorage.clear();
  //   return '';
  // };
  

  $('.header-menu').on('click','.menu-item>a', function(){

    $.each($('.menu-item>a'), function(){
      $(this).removeClass('active');
    });
    $(this).addClass('active');
  });

});