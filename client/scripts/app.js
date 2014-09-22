var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {

  },
  send: function(message) {
    $.ajax({
      // always use this url
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function() {
    $.ajax({
      // always use this url
      url: this.server,
      type: 'GET',
      data: 'data',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
  },
  clearMessages: function() {

    $('#chats').empty();
  },
  addMessage: function(message) {
    console.log($('#chats'))
    $('#chats').html(message.text);
  }

};
