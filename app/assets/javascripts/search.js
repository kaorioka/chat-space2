$(function () {

  $(document).on('turbolinks:load', function () {

    $('#user-search-field').on('keyup', function () {
      $.ajax({
        type: 'GET',
        url: '/users/search',
        date: { keyword: input },
        dateType: 'json'
      })
        .dane(function () {

        })
        .fail(function () {

        });

    });

  });

});