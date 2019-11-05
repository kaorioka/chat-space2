$(function () {

  $(document).on('turbolinks:load', function () {

    var search_result = $('#user-search-result');

    function addUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      ${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`;
      search_result.append(html)
    }

    function addDeleteUser(id, name) {
      var html = `<div class="chat-group-user clearfix js-chat-member" id="${id}">
      <input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${name}" />
                    <p class="chat-group-user__name">${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}">削除</a>
                    </div>`;
      $('.js-add-user').append(html)
    }

    function addNoUser() {
      var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
      return html
    }


    $("#user-search-field").on("keyup", function (user) {
      let input = $('#user-search-field').val();
      user.preventDefault();
      console.log(input);
      $.ajax({
        type: "GET",
        url: "/users/search",
        data: {
          keyword: input,
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
        var id = $(this).data('userId');
        var name = $(this).data('userName');
        addDeleteUser(id, name);
        $(this).parent('.chat-group-user').remove();
      }),
        $("search_result").on("click", ".js-remove-btn", function () {
          var id = $(this).data("userId");
          $(`.chat-group-user-${id}`).remove();
        });


    });


  });

});