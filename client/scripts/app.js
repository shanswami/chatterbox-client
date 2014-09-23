var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {
    app.room = 'Default';
    var that = this;
    setInterval(function(){
      that.fetch();
    }, 2000);
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
      url: this.server,
      type: 'GET',
      data: {
        order: '-createdAt'
      },
      contentType: 'application/json',
      success: function (data) {
        var received = data.results;
        for (var i = received.length - 1; i > 0; i--){
          var theMessage = received[i].text;
          var name = received[i].username;
          var room = received[i].roomname;
          var lastTime = new Date($('ul').last().text().slice($('ul').last().text.length - 25));
          var currentTime = new Date(received[i].createdAt);
          if ($('ul').length > 15){
            console.log('yes');
            if (currentTime.getTime() > lastTime.getTime()){
              if (theMessage !== undefined && name !== undefined && name.charAt(0) !== '<' && theMessage.charAt(0) !== '<'){
                $('#chats').append('<ul>'+name+': '+theMessage+'_______'+ received[i].createdAt+'</ul>');
                $('ul').first().remove();
              }
            }
          } else {
            if (theMessage !== undefined && name !== undefined && name.charAt(0) !== '<' && theMessage.charAt(0) !== '<'){
             $('#chats').append('<ul>'+name+': '+theMessage+'_______'+ received[i].createdAt+'</ul>');
            }
          }
        }
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
    $('#chats').append('<ul>'+message+'</ul>');
  },
  addRoom: function(room) {
    $('#roomSelect').append('<ul>'+room+'</ul>');
  },
  addFriend: {
    called: true,
    restore: function() {}
  }

};
$(document).ready(function() {

  app.init();
  $('.send').on('click', function() {
    console.log("stop clicking me.");
    var message = {
      'username': document.URL.match(/username=(.*)/)[1],
      'text': $('#input').val(),
      'roomname': 'Default'
    };
    console.log($('#input').val())
    app.send(message);
  });
})

