$(function () {

  function html(name) {
    const html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${name}</p></div>`;
    $("#user-search-result").append(html)
  }

  $("#user-search-field").on("keyup", function () {
    let input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      type: "GET",
      url: "/users/search",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function () {
        console.log("成功です");
      })
  })
    .fail(function () {
      console.log("失敗です");
    });
});
