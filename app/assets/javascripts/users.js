$(function () {

  function html(name) {
    const html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${name}</p>
                  </div>`;
    $("#user-search-result").append(html)
  }
  function add_html(name, id) {
    const add_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>
      <p class='chat-group-user__name'>${name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>追加</a></div>`;
    $(".js-add-user").append(add_html)
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
