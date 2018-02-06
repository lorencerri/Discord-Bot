// Require Packages
const Discord = require('discord.js');

// Configure Packages
const client = new Discord.Client();
const prefix = '!'; // You can set any prefix you like.

// Listener Events
client.on('message', message => { // This will run every time a message is recieved, sending it the message object.
  
  // Variables
  let msg = message.content.toUpperCase(); // This takes the message.content, and turns it all uppercase.
  let sender = message.author; // This variable holds the message's author.
  let args = message.content.slice(prefix.length).trim().split(' '); // This variable takes the message.content, slices off the prefix from the front, then trims the blank spaces on the side, and turns it into an array by separating it by spaces.
  let cmd = args.shift().toLowerCase(); // This variable holds the first item from the args array, which is taken off of the args array and turned into lowercase.
  
  // Return Statements
  if (!msg.startsWith(prefix)) return; // If the message doesn't start with the prefix, exit the code.
  if (message.author.bot) return; // If the message's author is a bot, exit the code.
  
  // Command Handler
  try { // This will run first, it will 'try' to run this code
    
    let commandFile = require(`./commands/${cmd}.js`); // This will create a requirement of the given file.
    commandFile.run(client, message, args); // This will attempt to run the file you just fetched.
    
  } catch (e) { // This will run if it encounters an error, such as the command not being found.
    
    console.log(e.message); // This will log the error in console.
    
  } finally { // This will run after the try and/or the catch is run.
    
    console.log(`${message.author.tag} ran the command ${cmd}`); // This logs in console that a user ran a command.
    
  }

})

// Finally, we want to login to Discord with the bot
client.login(process.env.SECRET); // You would place your token here, although mine will look different since I use a hidden token.

// Now, to test this lets create a ping command.