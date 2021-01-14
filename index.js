const fs = require('fs');
const prefix = '-';
const Discord = require('discord.js');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const numero_dia = new Date().getDay();

if((numero_dia == 4) || (numero_dia == 6) || (numero_dia == 7)){    
    client.login(process.env.DJS_TOKEN);
}else{
    client.login("undefined");
}


client.on('ready', () => {
	console.log('Hobbies Place Bot esta listo..!!!');
	client.user.setStatus('dnd');
})

client.on('message', async (message) => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    const channel_remote_duel = client.channels.cache.find(channel => channel.name === "remote-duel");
    const temporizador_channel = client.channels.cache.find(channel => channel.name === 'temporizador');

    let minute = args[0];
    let second = 60;
    let band=false;    

    	if(!args[0]) return message.reply('Por favor especifique el comando correctamente...!!!');
        if(args[1]) return message.reply('Por favor especifique el comando correctamente...!!! <Demasiados argumentos utilzados, verifique>');

        switch(command){
            case 'start':
                if((minute <= 60) && (minute > 0)){
                    
                    function temp_call(){
                        
                        if ((minute == 0) && (second == 0)) {
                            // temporizador_channel.send("00:00 TIEMPO FINALIZADO...!!!");
                            // channel_remote_duel.send("00:00 TIEMPO FINALIZADO...!!!");
                            message.channel.send("00:00 TIEMPO FINALIZADO...!!!");
                            band=true; 
                        }

                        if ((minute > 0) && (second == 0)) {
                            minute--; 
                            second = 60;
                            mensaje.edit("Tiempo actual: "+minute+" : 59");
                        }
                        
                        mensaje.edit("Tiempo actual: "+minute+" : "+second);
                        second--;     
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
                        
                        // temporizador_channel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                        // channel_remote_duel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                        message.channel.send('RONDA INICIADA ('+minute+' minutos), SUERTE A TOD@S...!!!');
                       
                        minute--; second--; 
                        
                        mensaje = await message.channel.send('El tiempo actual es: '+minute+' : '+second);   
                            
                            if(!band){
                                    timeCheck = setInterval(() => {
                                    temp_call(mensaje)}, 1000);
                            }
                    }else{
                        message.reply('Acceso denegado...!!!').catch(console.error);
                    }
                
                }else{
                    message.reply('Por favor introduzca un formato de comando apropiado. El formato apropiado es el siguiente: \n -start 10, -start 45, ... \n (Siempre y cuando el valor númerico sea menor o igual a 60)');
                }
            
            break;

            case 'stop':
                message.channel.messages.fetch().then((results) => {
                    message.channel.bulkDelete(results).catch(console.error);
                })
                // temporizador_channel.send('TIEMPO DETENIDO...!!!');
                // channel_remote_duel.send('TIEMPO DETENIDO...!!!');
                message.channel.send('TIEMPO DETENIDO...!!!');
                clearInterval(timeCheck);
                timeCheck = undefined;
            break;

        }
})

