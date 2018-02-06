// We created it under the /commands/ folder since we specified that in the server.js file.

exports.run = (client, message, args, tools) => { // Since we passed in these arguments in the previous file, we need to then fetch them here. - Since we passed it in server.js, we also need to recieve it in the command files.

  // We won't need that, since tools.embed() sends a message.
  
  tools.embed(message.channel, '**Ping!**', 10000); // We are passing it the channel to send it to, as well as the message (discord formatting supported), as well as the the time in ms to delete the message.
  
  // Let's test it!
  
  // message.channel.send(tools.ping()); // This will type 'Pong!' in chat, since we are running the entire file.
  // Now, to call it we have to call the function name. Make sure you are calling it like a function with () at the end.
  
};
