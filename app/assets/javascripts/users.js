$(function () {

  function addUser(user) {
    const html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`;
    $(search_result).append(html);
  }

  function add_html(name, id) {
    const add_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>
      <p class='chat-group-user__name'>${name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>追加</a></div>`;
    $(".js-add-user").append(add_html)
  }

  let picup_users = [];

  const search_result = $('#user-search-result');

  $(".js-chat-member").each(function (picup_users, name) {
    picup_users.push(name.attr('id'))
    console.log(picup_users)
  });



  $("#user-search-field").on("keyup", function (e) {
    let input = $('#user-search-field').val();
    e.preventDefault();
    console.log(input)
    $.ajax({
      type: "GET",
      url: "/users/search",
      data: {
        keyword: input,
        user_ids: picup_users
      },
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
