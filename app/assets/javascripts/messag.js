$(function () {

  function buildHTML(message) {

    var data_id = `data_message-id=${message.id}`;
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
      return html;

    } else if (message.content) {

      var html = `<div class="message" ${data_id}>
                    ${upper_info}
                      <p class="message__text">${message.content}</p>
                  </div > `;
      return html;

    } else if (message.image) {

      var html = `<div class="message" ${data_id}>
                    ${upper_info}
                    ${image}
                  </div > `;
      return html;
    };

  };


  var insertHTML = [];

  function send_scroll(list) {
    var scrollHeight = $('#messages_area')[0].scrollHeight;
    $(list).animate({ scrollTop: scrollHeight }, '5000000000');
  };

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
        $('#new_message')[0].reset(); //input reset
      })
      .fail(function () {
        alert('メッセージが空欄です。')
      })
      .always(function () {
        $('.form__submit').prop('disabled', false); //disabled cancel
      });
  }); //submit event//

  //reload function
  var reloadMessages = function () {

    var current_page = window.location.pathname;
    var last_message_id = $(".message:last").data("data_message-id");
    console.log(current_page);
    console.log(last_message_id);

    $.ajax({
      url: current_page, //request url
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (data) {

        console.log('success');
        var html = buildHTML(data);
        insertHTML.push(html);
        console.log(insertHTML);
        var list = ".messages";
        $(list).append(insertHTML);
        send_scroll(list);
      })
      .fail(function () {
        console.log('error');
      });

    var insertHTML = [];
  };　//reload function//

  setInterval(reloadMessages, 10000); // reload request
});