$(function () {

  function buildHTML(message) {
    var data_id = "data_message-id=" + `${message.id}`;
    var image = message.image ? `<img src= ${message.image}>` : "";
    var upper_info = `<div class="message__upper-info">
                        <p class="message__upper-info__talker">
                        ${message.user_name}
                        </p >
                        <p class="message__upper-info__date">
                          ${message.created_at}
                        </p>
                      </div >`;

    if (message.content && message.image) {

      var html = `<div class="message" ${data_id}>
                    ${upper_info}
                      <p class="message__text">${message.content}</p>
                    ${image}
                  </div > `;

    } else if (message.content) {

      var html = `<div class="message" ${data_id}>
                    ${upper_info}
                      <p class="message__text">${message.content}</p>
                  </div > `;

    } else if (message.image) {

      var html = `<div class="message" ${data_id}>
                    ${upper_info}
                    ${image}
                  </div > `;

    };
    return html;
  }

  function send_scroll(list) {
    var scrollHeight = $('#messages_area')[0].scrollHeight;
    $(list).animate({ scrollTop: scrollHeight }, '1500');
  }

  //submit event
  $('#new_message').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action'); //request url

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        var list = ".messages";
        $(list).append(html);
        send_scroll(list);
        $('#new_message')[0].reset();
      })
      .fail(function (data) {
        alert('メッセージが空欄です。')
      })
      .always(function (data) {
        $('.form__submit').prop('disabled', false);
      });
  }); //submit event>>

  var reloadMessages = function () {

    var current_page = window.location.pathname;
    var last_message_id = last_message_id = $(".message:last").data("message_id") || 0;

    $.ajax({
      url: current_page, //request url
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        console.log('success');
        var insertHTML = '';
        var html = buildHTML(messages);
        var list = ".messages";
        $(list).append(html);
        send_scroll(list);

      })
      .fail(function () {
        console.log('error');
      });

  };



});