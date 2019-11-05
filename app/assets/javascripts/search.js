$(function () {


  function outputResult(user) {
    var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">
          ${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
        </a>
      </div>
    `;
  }


  $(document).on('turbolinks:load', function () {
    const seach_field = $('#user-search-field')
    const search_result = $('#user-search-result')

    seach_field.on('keyup', function () {

      let input = seach_field.val();
      console.log(input);

      $.ajax({
        type: 'GET',
        url: '/users/search', //request URL
        date: { keyword: input },
        dataType: 'json'
      })
        .done(function () {

        })
        .fail(function (data) {
          alert("検索に失敗しました");
        });
    }); //seach_field.on >>






  });
});