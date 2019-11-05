$(function () {

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