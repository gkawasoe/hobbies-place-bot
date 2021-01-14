const fs = require('fs');
const prefix = '-';
const Discord = require('discord.js');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//const config = require('config/config.json');

val = 0;
let minute_2 = 0;
let second_2 = 0;
timeCheck = undefined;
// module.exports.timeCheck = undefined;

client.commands = new Discord.Collection();

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



//const channel = new Discord.TextChannel();
const numero_dia = new Date().getDay();

if((numero_dia == 4) || (numero_dia == 6) || (numero_dia == 7)){    
    client.login(process.env.DJS_TOKEN);
}else{
    client.login("undefined");
}


client.on('ready', () => {
	console.log('Hobbies Place Bot esta listo..!!!');
	client.user.setStatus('dnd');

	
	//console.log(remote_duel_channel);
})

client.on('message', async (message) => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    const channel_remote_duel = client.channels.cache.find(channel => channel.name === "remote-duel");
    const temporizador_channel = client.channels.cache.find(channel => channel.name === 'temporizador');
    
    

    hour = 0;
    let minute = args[0];
    let second = 60;
    let band=false;    

    // const hour = 0;
    // const minute = args[0];
    // const second = 59;
    // const band=false;    

    	if(!args[0]) return message.reply('Por favor especifique el comando correctamente...!!!');
        if(args[1]) return message.reply('Por favor especifique el comando correctamente...!!! <Demasiados argumentos utilzados, verifique>');

        switch(command){
            case 'start':
                if((minute <= 60) && (minute > 0)){
                    
                    function temp_call(){
                        if((second > 0) && (timeCheck != undefined)){
                            
                            if((minute >= 10) && (second >=10)){
                                mensaje.edit("Tiempo actual: "+minute+" : "+second);
                            }else if((minute >= 10) && (second < 10)){
                                mensaje.edit("Tiempo actual: "+minute+" : 0"+second);
                            }else if((minute < 10) && (second >=10)){
                                mensaje.edit("Tiempo actual: 0"+minute+" : "+second);
                            }else if((minute < 10) && (second < 10)){
                                mensaje.edit("Tiempo actual: 0"+minute+" : 0"+second);
                            }

                            // 0 0 0
                            if ((minute == 0) && (second == 0)) {
                                // temporizador_channel.send("00:00 TIEMPO FINALIZADO...!!!");
                                // channel_remote_duel.send("00:00 TIEMPO FINALIZADO...!!!");
                                message.channel.send("00:00 TIEMPO FINALIZADO...!!!");
                                band=true; 
                            }
                         
                            // 0 1 1
                                if((minute == 1) && (second == 0)){
                                    // temporizador_channel.send("JUGADORES SOLO RESTA 0"+minute+" MINUTO...!!!");
                                    // channel_remote_duel.send("JUGADORES SOLO RESTA 0"+minute+" MINUTO...!!!");
                                    message.channel.send("JUGADORES SOLO RESTA 0"+minute+" MINUTO...!!!");
                                    minute--;
                                    second = 59;
                                    
                                }
                            //0 1 0
                            if ((minute > 0) && (second == 0)) {
                                
                                division = minute/10;

                                if(Number.isInteger(division)){
                                    // temporizador_channel.send("JUGADORES SOLO RESTAN "+minute+" MINUTOS...!!!");
                                    // channel_remote_duel.send("JUGADORES SOLO RESTAN "+minute+" MINUTOS...!!!");
                                    message.channel.send("JUGADORES SOLO RESTAN "+minute+" MINUTOS...!!!");
                                }
                                    minute--; 
                                    second = 59;
                            }
                            //1 0 0 
                            // if ((minute == 0) && (second == 0)) {
                            //     second = 59; //second_2 = 59;
                            //     minute = 59; //minute_2 = 59;
                            // }
                            //0 0 1 //1 0 1 //1 1 1 
                            
                            // //1 1 0
                            // if ((minute > 0) && (second == 0)) {
                            //     minute--; //minute_2--;
                            // }
                            second--;
                        }
                    }

                //Rol de @Yu-Gi-Oh! => 713769108046610542
                //En esta sección el "IF" pudiera ser como el de abajo, pero se recomienda mejor por el
                //id real del Rol, como se demuestra en el "IF" activo actualmente
                //if(message.member.roles.cache.some(r => r.name === "@Admin")){

                //let role = guild.roles.cache.find(r => r.name === "@Yu-Gi-Oh!");

                    if(message.member.roles.cache.has('713839638162309210')){
                        message.channel.messages.fetch().then((results) => {
                            message.channel.bulkDelete(results).catch(console.error);
                        })
                        
                        if(minute>=10){ 
                            // temporizador_channel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                            // channel_remote_duel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                            message.channel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                        }else{
                            // temporizador_channel.send('RONDA INICIADA (0'+minute+' minutos), SUERTE A TOD@S...!!!');
                            // channel_remote_duel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                        }
                        minute--; second--; 
                        
                        mensaje = await message.channel.send('El tiempo actual es: '+minute+' : '+second);   
                            
                            if(!band){
                                 // for(let i=0;i<600000;i++){
                                    timeCheck = setInterval(() => {
                                    temp_call(mensaje)}, 1000);
                                 // }

                            // }else{
                                // console.log('Tiempo Finalizado');
                                // temporizador_channel.send("00:00 TIEMPO FINALIZADO...!!!");
                                // channel_remote_duel.send("00:00 TIEMPO FINALIZADO...!!!")
                            }
                    }else{
                        message.reply('Acceso denegado...!!!').catch(console.error);
                    }
                
                    // client.commands.get('start').execute(message,args,channel_remote_duel,temporizador_channel,hour,minute,second,band,command,source);
                
                }else{
                    message.reply('Por favor introduzca un formato de comando apropiado. El formato apropiado es el siguiente: \n -start 10, -start 45, ... \n (Siempre y cuando el valor númerico sea menor o igual a 60)');
                }
            
            break;

            case 'stop':
                // temporizador_channel.send('TIEMPO DETENIDO...!!!');
                // channel_remote_duel.send('TIEMPO DETENIDO...!!!');
                message.channel.send('TIEMPO DETENIDO...!!!');
                clearInterval(timeCheck);
                timeCheck = undefined;
            break;

            // case 'tiempo':

            //     message.reply('El tiempo actual es: '+minute_2+' : '+second_2);

            // break;

        }
})

