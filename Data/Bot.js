var Discord = require("discord.js");
var bot = new Discord.Client();
var typing = false;
var currentTimers = [];

function round(num) {
    return Math.ceil(num * 1) / 1;
}

function uptime() {
    var milliseconds = bot.uptime;
    var seconds = milliseconds / 1000;
    var minutes = 0;
    var uptime;
    var uptimeMinutes;
    var uptimeSeconds;

    while (seconds > 60) {

        minutes += 1;
        seconds -= 60;

    }

    seconds = round(seconds);

    if (minutes === 1) {
        uptimeMinutes = minutes + ' minute and '
    } else if (minutes >= 2) {
        uptimeMinutes = minutes + ' minutes and '
    } else {
        uptimeMinutes = '';
    }

    if (seconds === 1) {
        uptimeSeconds = '1' + ' second'
    } else {
        uptimeSeconds = seconds + ' seconds';
    }

    uptime = uptimeMinutes + uptimeSeconds;
    return uptime;
}

function timeStamp() {
  var now = new Date();
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;

  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

  return date.join("/") + " " + time.join(":") + " " + suffix;
}

bot.on("message", function(message) {

    if ( ! message.content.startsWith(">")) return;

    var guessedPasswords = [];
    var mes = message.content.split(">").slice(1).join(" ");
    var input = mes.toUpperCase();
    var sayInput = mes.split(" ").slice(1).join(" ")
    var user = message.sender;
    var prefix = message.content.toUpperCase();
    var userList = [];

    function hasInnkeeper() {
      try {
      if (message.server.roles.get("name", "Innkeeper")) {
        return true;
      } else {
        bot.sendMessage(message, 'Innkeeper role not found.');
        return false;
      }
      } catch (err) {
        bot.sendMessage(message, 'Some features are disabled/minimal in private message.');
        return false;
      }
      }


    if (input === 'COMMANDS') { //Returns the documentation.
        bot.sendMessage(message, 'Documentation: \'http://theinnkeeper.weebly.com/documentation.html\'');
    }

    else if (input === 'UPTIME') { //Returns how long the bot has been running.
        bot.sendMessage(message, ' **Uptime:** *' + uptime() + '*');
    }

    else if (input === 'STATS') { //Displays all stats for the bot.
        bot.sendMessage(message, ' **Uptime:** *' + uptime() + '*\n **Servers:** *' + bot.servers.length + '*\n **Channels:** *' + bot.channels.length + '*\n **Users:** *' + bot.users.length);
    }

    else if (input === 'SERVERS') { //Returns how many servers the bot is connected to.
        bot.sendMessage(message, ' **Servers:** *' + bot.servers.length + '*');
    }

    else if (input === 'CHANNELS') { //Returns how many channels the bot is connected to.
        bot.sendMessage(message, ' **Channels:** *' + bot.channels.length + '*');
    }

    else if (input === 'USERS') { //Returns how many users the bot is connected to.
        bot.sendMessage(message, ' **Users** *' + bot.users.length + '*');
    }

    else if (input === 'DISCORD') { //Displays Discord Server.
      bot.sendMessage(message, 'Our Discord: https://discord.gg/puumk8h');
    }

    else if (input === 'THANKS') { //Returns You're Welcome.
      bot.sendMessage(message, 'You\'re welcome ' + user.username + '.');
    }

    else if (input === 'COIN') { //Heads or Tails.
      var coin = Math.floor(Math.random() * 2) + 1;
      if (coin === 1) {
        bot.sendMessage(message, 'The coin landed on *Heads*!');
      } else {
        bot.sendMessage(message, 'The coin landed on *Tails*!');
      }
    }

    else if (input === 'FORMATTING') { //Returns the formatting for discord.
      bot.sendFile(message, 'Documents/GitHub/Discord-Bot/Data/Extra/formatting.png');
    }

    else if (input.startsWith('SCREAM')) { //Returns the message.
      var screamMsg = input.split("SCREAM").slice(1).join(" ");
      bot.sendMessage(message, screamMsg);
    }

    else if (input.startsWith('SAY')) { //Returns the message.

      bot.sendMessage(message, sayInput);
    }

    else if (input.startsWith('HELLO') || input.startsWith('HI') || input.startsWith('HOLA') || input.startsWith('HEY')) { //Returns a greeting message in a random language.
      var greetings = ['Hello', 'Salut', 'Hallo', 'Ciao', 'Ahoj', 'YAH sahs', 'Bog', 'Hallo', 'Czesc', 'Hola', 'Shalom', 'Hej']
      var greetingNum = Math.floor(Math.random() * greetings.length);
      bot.sendMessage(message, greetings[greetingNum] + ' ' + user.username + '!');
    }

    else if (input === 'HELP') { //Returns a help message.
      bot.sendMessage(message, ' ***To view a list of commands, type:*** *>commands* \n ***Need Help?*** *Join:* https://discord.gg/puumk8h \n***Website:*** http://theinnkeeper.weebly.com/');
    }

    else if (input === 'RUN') { //Runs Script, Returns Nothing.
      console.log('Script Run.');
    }

    else if (input.startsWith('EVAL') && user.id === '144645791145918464') { //Eval, use with caution.
      var evalOutput = '';
      try{
        bot.sendMessage(message, eval(message.content.split(" ").slice(1).join(" ")));
      } catch(err){
          if (err === '[object Promise]' ) {

            console.log('Object Promise Recieved.');
          } else {
          bot.sendMessage(message, err);
          }
        }
    }

//DISABLED - SENDING TYPING PACKETS WILL GET YOU IPBANNED
/*    else if (input.startsWith('TYPING') && hasInnkeeper) { //Typing on or off.

      if (input.includes('ON') && !input.includes('OFF')) {
        bot.sendMessage(message, '**Status Set:** *Typing*');
        bot.startTyping(message.channel.id);
        typing = true;
      } else if (input.includes('OFF') && !input.includes('ON')) {
        bot.sendMessage(message, '**Status Removed:** *Typing*');
        bot.stopTyping(message.channel.id);
        typing = false;
      } else {
        bot.sendMessage(message, 'Proper Usage: \`>typing [on/off]\`');
      }
    } */

    else if (input.startsWith('SUGGEST') || input.startsWith('SUGGESTIONS')) { //Suggest Commands.
      bot.sendMessage(message, 'Please suggest ideas here: https://theinnkeeper.uservoice.com/');
    }

    else if (input === 'GAMES') { //Lists Playable Games.
      bot.sendMessage(message, '**Playable Games:** ````-Currently None-```');
    }

    else if (input.startsWith('ROLL')) { //Rolls a random number.
      var getNumber = parseInt((message.content.split(" ").slice(1).join(" ")));

      if ( isNaN(getNumber)) {
        bot.sendMessage(message, 'Proper Usage: `>roll [number]`');
      } else if ( ! isNaN(getNumber) ) {
        var randomNumber = Math.floor(Math.random() * getNumber) + 1;
        bot.sendMessage(message, '** You Rolled:** *' + randomNumber + '*.');
      }
    }

    else if (input === 'TIMERS') {



      bot.sendMessage(message, '```' + 'Current Timers:\n' + currentTimers + '\n Feature in development.```');
    }

    else if (input.startsWith('TIMER')) {
      function countdownFinish(second) {
  			bot.sendMessage(message, user + " | Your " + seconds + " second timer has finished!");
  		}

      var seconds = parseInt((message.content.split(" ").slice(1).join(" ")));
      var milliseconds = 1000 * seconds;
        if ( ! isNaN(milliseconds)) {
        bot.sendMessage(message, 'Starting ' + seconds + ' second timer.');
        currentTimers.push([(currentTimers.length + 1) + ' User: ' + user.username + ' Length: ' + seconds + ' second(s).'])
        console.log(currentTimers);
        setTimeout(countdownFinish, milliseconds);
      } else {
        bot.sendMessage(message, 'Proper Usage: `>timer [seconds]`')
      }
    }

    else if (input.startsWith('PASSWORD')) { //Password Game
      console.log('Password: ' + sayInput + ' | Length: ' + sayInput.length);
      if (sayInput.length <= 1 && sayInput.length > 0) {
        function generatePassword(length) {
          var length = Math.floor(Math.random() * length) + 1;
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
          for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * Math.floor(Math.random() * charset.length)));
                }
                return retVal;
            }
        function guessPassword (password) {
          var attempts = 0;
          guessedPasswords = [];
          do {
            var guess = generatePassword(1);

              var chance = 1 / (62 * 1);
              guessedPasswords.push(guess);
              attempts += 1;

            console.log(guessedPasswords);
            if (password === guess) {
              bot.sendMessage(message, 'The bot guessed your password in ' + attempts + ' attempts. | Chance: ' + chance + '%');
              break;
            }
          } while ( true )

        }
        guessPassword(sayInput);
      } else {
        bot.sendMessage(message, 'Please only do passwords 1 characters or less.');
      }
    }

    else if (input.startsWith('CALL')) {
    bot.sendMessage(message, ':arrow_right: Private Messaging You To Decrease Spam :arrow_left:').then(() => {
    bot.sendMessage(user.id, ':rotating_light: This feature is experimental. You may experience bugs/glitches when using it. :rotating_light: \n').then(() => getUser())});
    var senderId = message.sender.id;

    function getUser() {
                try {
                    userList = []
                    for (var user of bot.users) {
                        if (user.status == "online" && user.bot == false) {
                            userList.push(user)
                        }
                    }

                    var randomUser = userList[Math.floor(Math.random() * userList.length)];
                    //var serverIn = userList.find(randomUser);
                    bot.sendMessage(senderId, ':telephone: :arrow_right: Users Found That Meet Search Criteria: ' + userList.length + ' out of ' + bot.users.length + '.').then(() => {
                      bot.sendMessage(senderId, ':telephone: :arrow_right: User Found: ' + randomUser + '.');
        });

                } catch (err) {
                    bot.sendMessage(message, err)
                }
                console.log(userList.length);
            }

}
    else if (input === 'ID'){
      bot.sendMessage(message, '**' + user.username + ':**\n **ID:** *' + user.id + '*');
    }
    else { //Unknown Command.
      if ( false ) {
        bot.sendMessage(message, 'Unknown Command | Do \`>commands\` for a list of commands.');
      }
    }

    console.log(timeStamp() + ' [' + message.server + ' | #' + message.channel.name + '] ' + user.username + ': ' + message.content);

});

bot.on('ready', function() {
    bot.setStreaming('Commands\! | >help', 'https://twitch.tv/truexpixels', 1);
});

bot.loginWithToken("MTc1NDcyMzk5OTIyMjMzMzQ0.Ck4NMg.UkWs6YG2a9g8dW8boHFkIhit2zo");

console.log('\033c')
console.log('Bot Successfully Launched');
