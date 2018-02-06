// We created it under the /commands/ folder since we specified that in the server.js file.

exports.run = (client, message, args, tools) => { // Since we passed in these arguments in the previous file, we need to then fetch them here.

  
  message.channel.send('Pong!'); // This will type 'Pong!' in chat, since we are running the entire file.
  
  // Now, we can test the '!ping' command.

}