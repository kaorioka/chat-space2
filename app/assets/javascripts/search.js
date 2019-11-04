$(function () {

  function addUser(user) {
    const html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`;
    $('#user-search-result').append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $('#user-search-result').append(html);
  }


  function addDeleteUser(id, name) {
    const html = `<div class="chat-group-user clearfix" id="${id}">
                    <p class="chat-group-user__name">${name}</p>
                    <div class="chat-group-user__remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>`;
    $(".js-add-user").append(html)
  }

  function addMember(userId) {
    let html = `
    <input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  let picup_users = [];

  $("#user-search-field").on("keyup", function (e) {
    let input = $('#user-search-field').val();
    e.preventDefault();
    console.log(input)
    $.ajax({
      type: "GET",
      url: "/users/search",
      data: {
        keyword: input
      },
      dataType: "json"
    })
      .done(function (users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }

      })
      .fail(function () {
        alert("通信エラーです。ユーザーが表示できません。");
      });
    $('#user-search-result').on("click", ".chat-group-user__btn--add", function () {
      const user_name = $(this).attr("data-user-name"),
        user_id = $(this).attr("data-user-id");
      picup_users.push(user_name), $(this).parent().remove(), addDeleteUser(user_id, user_name)
    }),
      $(".js-add-user").on("click", ".js-remove-btn", function () {
        const get_user_name = $(this).siblings("input").val();
        picup_users = picup_users.filter(user_name => user_name != get_user_name), $(this).parent().remove()
      })
  })
});
