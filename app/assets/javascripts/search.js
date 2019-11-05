$(function () {

  $(document).on('turbolinks:load', function () {

    var search_result = $('#user-search-result');

    function addUser(user) {
      const html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`;
      search_result.append(html);
    }

    function addNoUser() {
      let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
      search_result.append(html);
    }


    function addDeleteUser(id, name) {
      const html = `<div class="chat-group-user clearfix js-chat-member" id="${id}">
                    <p class="chat-group-user__name">${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}">削除</a>
                    </div>`;
      $(".js-add-user").append(html);
    }

    function addMember(user) {
      let html = `
    <input value="${user.id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${user.id}" />`;
      $(`#${user.id}`).append(html);
    }




    let picup_users = [];

    // $(".js-chat-member").each(function (id, user) {
    //   picup_users.push(user.id.getAttribute("id"));
    // }),
    $("#user-search-field").on("keyup", function (user) {
      let input = $('#user-search-field').val();
      user.preventDefault();
      console.log(input);
      console.log(picup_users);
      $.ajax({
        type: "GET",
        url: "/users/search",
        data: {
          keyword: input,
          user_ids: picup_users
        },
        dataType: "json"
      })
        .done(function (users) {
          search_result.empty();
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
      search_result.on("click", ".chat-group-user__btn--add", function () {
        const user_name = $(this).attr("data-user-name"),
          user_id = $(this).attr("data-user-id");
        picup_users.push(user_name),
          $(this).parent().remove(),
          addDeleteUser(user_id, user_name),
          addMember(user)
          ;
      }),
        $(".js-add-user").on("click", ".js-remove-btn", function () {
          const get_user_name = $(this).siblings("input").val();
          picup_users = picup_users.filter(user_name => user_name != get_user_name),
            $(this).parent().remove(),
            addUser(user);
          return picup_users;

        })


    });


  });

});