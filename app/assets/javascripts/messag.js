$(function () {
  function buildHTML(message) {
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message">
                    <div class="message__upper-info">
                      <p class="message__upper-info__talker">
                      ${message.user_name}
                      </p >
                      <p class="message__upper-info__date">
                        ${message.created_at.strftime("%Y/%m/%d %H:%M")}
                      </p>
                    </div >
                      <p class="message__text"></p>
                      <p class="lower-message__content">
                        ${message.content}
                      <%= image_tag ' ${image}' %>
                    </p>
                  </div > `
    return html;
  }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
        $('.messages').append(html);
        $('.form__message').val('');
      })
      .fail(function (content) {
        alert('送信が失敗しました。');
      })
  })
})