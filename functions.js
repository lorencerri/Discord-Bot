// Although, this means we need to create a functions.js file in the root.

module.exports = { // Since this is being called like a module, the inside file needs to look like a module as well.
  
  ping: function() { // This is how a function would look, the name on the left, followed by function() with optional arguments.
    
    return 'Hello!'; // For example, this will pass 'Hello!' to the file, using the ping() function. 
      
  },
  
  embed: function(channel, message, timer) { // We can try something more advanced, using embed as the function name. We are going to pass it 2 required arguments, and one optional being timer.
    
    channel = channel.channel || channel; // This makes it so you can just send it the message instead of channel, if message.channel is not found, it falls back to just channel. 
    
    channel.send({embed:{ // Now, it sends an embed message to that channel.
      description: message, // The description object, will be the message we input into it.
      color: 0x1db954 // This is the color object we will be passing the embed object.
    }}).then(msg => { // The channel.send returns a promise, being the msg it just sent, so we can use the message it just sent.
      if (!isNaN(timer)) msg.delete({timeout: timer}); // This is checking if `timer` is defined AND is a valid number. This is how you delete a message with a timer in v0.12, reminder that this is in ms, so you need to act accordingly 1second = 1000ms.
    });
    
  }
  
};