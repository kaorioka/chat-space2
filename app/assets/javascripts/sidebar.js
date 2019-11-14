$(window).load(function () {

  var a = $(".main-header__left-box__current-group").data("group-id")
  $(".group").each(function (i, ele) {
    if ($(ele).data("group-id") === a) {
      $(this).addClass("group__side_current")
    } else {
      $(this).removeClass("group__side_current")
    }
  });

});