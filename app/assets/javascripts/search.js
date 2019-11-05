$(function () {

  $(document).on('turbolinks:load', function () {

    const seach_field = $('#user-search-field')
    const search_result = $('#user-search-result')


    // search_result users template
    function outputResult(user) {
      var html =
        `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">
          ${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
        </a>
      </div>
    `;
      search_result.append(html);
    } // search_result users template //

    // search_result users template
    function addGroupUsers(id, name) {
      var html =
        `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
        <input type="hidden" name="group[user_ids][]" value="${id}">
        <p class="chat-group-user__name">${name}</p>
        <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
      </div>`;
    } // search_result users template//

    function resultNoUser() {
      let html = `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">ユーザーが見つかりません</p>
        </div>
      `;
      search_result.append(html);
    }

    // Incremental search
    seach_field.on('keyup', function () {

      let input = seach_field.val();
      console.log(input);

      $.ajax({
        type: 'GET',
        url: '/users/search', //request URL
        date: { keyword: input },
        dataType: 'json'
      })
        .done(function (users) {

          search_result.empty();

          if (users.length !== 0) {
            users.forEach(function (user) {
              outputResult(user);
            });
          } else if (input.length == 0) {
            return false;
          } else {
            resultNoUser();
          }



        })
        .fail(function (data) {
          alert("通信エラーです。ユーザーが表示できません。");
        });
    }); // Incremental search //

    // addGroupUsers action
    search_result.on('click', '.chat-group-user__btn--add', function (e) {
      e.preventDefault();
      var id = $(this).data('userId');
      var name = $(this).data('userName');
      addGroupUsers(id, name); //add action
      $(this).parent('.chat-group-user').remove(); //delete action
    });  //search_result.on('click')>>





  });
});