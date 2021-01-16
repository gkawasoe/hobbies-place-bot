const fs = require('fs');
const prefix = '-';
const Discord = require('discord.js');
const client2 = new Discord.Client();
const guild = new Discord.Guild();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client2.commands = new Discord.Collection();

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client2.commands.set(command.name, command);
}

const numero_dia = new Date().getDay();

if((numero_dia == 6) || (numero_dia == 7)){    
    client2.login(process.env.DJS_TOKEN);
}else{
    client2.login("undefined");
}


client2.on('ready', () => {
	console.log('Hobbies Place Bot esta listo..!!!');
	client2.user.setStatus('dnd');
})

let timeCheck; let mensaje;

client2.on('message', async (message) => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    const channel_remote_duel = client2.channels.cache.find(channel => channel.name === "remote-duel");
    const temporizador_channel = client2.channels.cache.find(channel => channel.name === 'temporizador');
    const prueba_tiempo = client2.channels.cache.find(channel => channel.name === 'prueba_tiempo');

    let minute = args[0];
    let second = 60;
    let band=false;    

    	if(!args[0]) return message.reply('Por favor especifique el comando correctamente...!!!');
        if(args[1]) return message.reply('Por favor especifique el comando correctamente...!!! <Demasiados argumentos utilzados, verifique>');

        switch(command){
            case 'start':
                if((minute <= 60) && (minute > 0)){

                    function zfill(number, width) {
                        var numberOutput = Math.abs(number); /* Valor absoluto del número */
                        var length = number.toString().length; /* Largo del número */ 
                        var zero = "0"; /* String de cero */  
                        
                        if (width <= length) {
                            if (number < 0) {
                                 return ("-" + numberOutput.toString()); 
                            } else {
                                 return numberOutput.toString(); 
                            }
                        } else {
                            if (number < 0) {
                                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
                            } else {
                                return ((zero.repeat(width - length)) + numberOutput.toString()); 
                            }
                        }
                    }
                    
                    async function temp_call(){
                        
                        if ((minute == 0) && (second == 0)) {
                            temporizador_channel.messages.fetch().then((results) => {
                                temporizador_channel.bulkDelete(results);
                            })

                            clearInterval(timeCheck);
                            timeCheck = undefined;
                            // temporizador_channel.send("00:00 TIEMPO FINALIZADO...!!!");
                            //Sección de mensaje Embed para "TIEMPO FINALIZADO"
                            embed_msj2 = new MessageEmbed()
                                .setTitle("TIEMPO FINALIZADO")
                                .setColor(0xfa1212)
                                .setDescription("00:00")
                                .setImage("https://64.media.tumblr.com/44f3fc202068dd9c26f469badbe166f7/tumblr_inline_pcamfq5JBQ1s39z39_500.png");
                                
                                // channel_remote_duel.send(embed_msj2);
                                prueba_tiempo.send(embed_msj2);

                            //Fin de sección
                            // channel_remote_duel.send("00:00 TIEMPO FINALIZADO...!!!");
                            // message.channel.send("00:00 TIEMPO FINALIZADO...!!!");
                            band=true; 
                        }

                        if((minute > 0) && (second == 0)) {
                            division = minute % 10;
                            min_capture = minute;
                            minute--; 
                            second = 60;

                            if(division == 0){
                                //Sección de mensaje Embed para "TIEMPO DE CADA 10 MINUTO"
                                embed_msj4 = new MessageEmbed()
                                    .setTitle("AVISO IMPORTANTE")
                                    .setColor(0xf6fa12)
                                    .setDescription("JUGADORES, QUEDAN "+min_capture+" MINUTOS...!!!")
                                    .setImage("https://static.wikia.nocookie.net/yugiohenespanol/images/0/0d/Foto_mago_del_tiempo.jpg/revision/latest?cb=20120324223716&path-prefix=es");
                                    // channel_remote_duel.send(embed_msj4);
                                    prueba_tiempo.send(embed_msj4);

                                //Fin de sección

                            }else if(division == 1){
                                //Sección de mensaje Embed para "TIEMPO DE CADA 10 MINUTO"
                                embed_msj4 = new MessageEmbed()
                                    .setTitle("AVISO IMPORTANTE")
                                    .setColor(0xf6fa12)
                                    .setDescription("JUGADORES, QUEDA "+min_capture+" MINUTO...!!!")
                                    .setImage("https://static.wikia.nocookie.net/yugiohenespanol/images/0/0d/Foto_mago_del_tiempo.jpg/revision/latest?cb=20120324223716&path-prefix=es");
                                    // channel_remote_duel.send(embed_msj4);
                                    prueba_tiempo.send(embed_msj4);

                                //Fin de sección
                                // channel_remote_duel.send("JUGADORES, QUEDA "+min_capture+" MINUTO...!!!");                                
                            }
                                                            
                        }
                        
                        second--;
                        return mensaje.edit("Tiempo: "+zfill(minute,2)+" : "+zfill(second,2));    
                    
                    }

                //Rol de @Yu-Gi-Oh! => 713769108046610542
                //En esta sección el "IF" pudiera ser como el de abajo, pero se recomienda mejor por el
                //id real del Rol, como se demuestra en el "IF" activo actualmente
                //if(message.member.roles.cache.some(r => r.name === "@Admin")){

                //let role = guild.roles.cache.find(r => r.name === "@Yu-Gi-Oh!");

                    if(message.member.roles.cache.has('713839638162309210')){

                        temporizador_channel.messages.fetch().then((results) => {
                            temporizador_channel.bulkDelete(results);
                        })

                        //Sección de mensaje Embed para "RONDA INICIADA"
                        embed_msj = new MessageEmbed()
                            .setTitle("RONDA INICIADA")
                            .setColor(0x338aff)
                            .setDescription("("+minute+" minutos), SUERTE PARA TOD@S...!!!")
                            .addField("Aviso: ","Para visualizar el tiempo, por favor entrar a la sala de #temporizador.",true)
                            .setImage("https://i.imgflip.com/1ift34.jpg");
                            // channel_remote_duel.send(embed_msj);
                            prueba_tiempo.send(embed_msj);

                        //Fin de sección

                        // channel_remote_duel.send('RONDA INICIADA ('+minute+' minutos), SUERTE PARA TOD@S...!!!');
                        
                        minute--; second--; 
                        
                        mensaje = await temporizador_channel.send('Tiempo: '+zfill(minute,2)+' : '+zfill(second,2));   
                            
                            return await new Promise(async (resolve) => {
                                timeCheck = setInterval(async () => {
                                    try{
                                        temp_call();    
                                    }catch(e){
                                        console.warn("error: "+e.message)
                                    }
                                },1000);
                            });
                    }else{
                        message.reply('Acceso denegado...!!!');
                    }
                
                }else{
                    message.reply('Por favor introduzca un formato de comando apropiado. El formato apropiado es el siguiente: \n -start 10, -start 45, ... \n (Siempre y cuando el valor númerico sea menor o igual a 60)');
                }
            
            break;

            // case 'extra':
            //     if((minute <= 60) && (minute > 0)){

            //         function zfill(number, width) {
            //             var numberOutput = Math.abs(number); /* Valor absoluto del número */
            //             var length = number.toString().length; /* Largo del número */ 
            //             var zero = "0"; /* String de cero */  
                        
            //             if (width <= length) {
            //                 if (number < 0) {
            //                      return ("-" + numberOutput.toString()); 
            //                 } else {
            //                      return numberOutput.toString(); 
            //                 }
            //             } else {
            //                 if (number < 0) {
            //                     return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            //                 } else {
            //                     return ((zero.repeat(width - length)) + numberOutput.toString()); 
            //                 }
            //             }
            //         }
                    
            //         function temp_call(){
                        
            //             if ((minute == 0) && (second == 0)) {
            //                 // message.channel.messages.fetch().then((results) => {
            //                 //     message.channel.bulkDelete(results).catch(console.error);
            //                 // })

            //                 temporizador_channel.messages.fetch().then((results) => {
            //                     temporizador_channel.bulkDelete(results);
            //                 })

            //                 clearInterval(timeCheck);
            //                 timeCheck = undefined;
            //                 // temporizador_channel.send("00:00 TIEMPO EXTRA FINALIZADO...!!!");
            //                 //Sección de mensaje Embed para "TIEMPO FINALIZADO"
            //                 embed_msj2_extra = new MessageEmbed()
            //                     .setTitle("TIEMPO EXTRA FINALIZADO")
            //                     .setColor(0xfa1212)
            //                     .setDescription("00:00")
            //                     .setImage("https://64.media.tumblr.com/44f3fc202068dd9c26f469badbe166f7/tumblr_inline_pcamfq5JBQ1s39z39_500.png");
                                
            //                     channel_remote_duel.send(embed_msj2_extra);

            //                 //Fin de sección

            //                 // channel_remote_duel.send("00:00 TIEMPO EXTRA FINALIZADO...!!!");
            //                 // message.channel.send("00:00 TIEMPO EXTRA FINALIZADO...!!!");
            //                 band=true; 
            //             }

            //             if((minute == 1) && (second == 0)){
            //                 //Sección de mensaje Embed para "TIEMPO DE 1 MINUTO"
            //                 embed_msj3_extra = new MessageEmbed()
            //                     .setTitle("AVISO IMPORTANTE")
            //                     .setColor(0xf6fa12)
            //                     .setDescription("JUGADORES, QUEDA "+zfill(minute,2)+" MINUTO DEL TIEMPO EXTRA...!!!")
            //                     .setImage("https://static.wikia.nocookie.net/yugiohenespanol/images/0/0d/Foto_mago_del_tiempo.jpg/revision/latest?cb=20120324223716&path-prefix=es");
            //                     channel_remote_duel.send(embed_msj3_extra);

            //                 //Fin de sección
            //                 // channel_remote_duel.send(" JUGADORES, QUEDA "+zfill(minute,2)+" MINUTO DEL TIEMPO EXTRA...!!!");
            //             }

            //             if((minute > 0) && (second == 0)) {
            //                 division = minute % 10;
            //                 min_capture = minute;
            //                 minute--; 
            //                 second = 60;

            //                 if(division == 0){
            //                     //Sección de mensaje Embed para "TIEMPO DE CADA 10 MINUTO"
            //                     embed_msj4_extra = new MessageEmbed()
            //                         .setTitle("AVISO IMPORTANTE")
            //                         .setColor(0xf6fa12)
            //                         .setDescription("JUGADORES, QUEDAN "+min_capture+" MINUTOS DEL TIEMPO EXTRA...!!!")
            //                         .setImage("https://static.wikia.nocookie.net/yugiohenespanol/images/0/0d/Foto_mago_del_tiempo.jpg/revision/latest?cb=20120324223716&path-prefix=es");
            //                         channel_remote_duel.send(embed_msj4_extra);

            //                     //Fin de sección
            //                     // channel_remote_duel.send(" JUGADORES, QUEDAN "+min_capture+" MINUTOS EXTRAS...!!!");
            //                 }
                                                            
            //                 mensaje.edit("Tiempo extra: "+zfill(minute,2)+" : 59");
            //             }

            //             second--;
            //             mensaje.edit("Tiempo extra: "+zfill(minute,2)+" : "+zfill(second,2));
                           
            //         }

            //     //Rol de @Yu-Gi-Oh! => 713769108046610542
            //     //En esta sección el "IF" pudiera ser como el de abajo, pero se recomienda mejor por el
            //     //id real del Rol, como se demuestra en el "IF" activo actualmente
            //     //if(message.member.roles.cache.some(r => r.name === "@Admin")){

            //     //let role = guild.roles.cache.find(r => r.name === "@Yu-Gi-Oh!");

            //         if(message.member.roles.cache.has('713839638162309210')){
            //             // message.channel.messages.fetch().then((results) => {
            //             //     message.channel.bulkDelete(results).catch(console.error);
            //             // })

            //             temporizador_channel.messages.fetch().then((results) => {
            //                 temporizador_channel.bulkDelete(results);
            //             })

            //             //Sección de mensaje Embed para "RONDA INICIADA"
            //             embed_msj_extra = new MessageEmbed()
            //                 .setTitle("TIEMPO EXTRA INICIADO")
            //                 .setColor(0x338aff)
            //                 .setDescription("("+minute+" minutos), SUERTE PARA TOD@S...!!!")
            //                 .addField("Aviso: ","Para visualizar el tiempo, por favor entrar a la sala de #temporizador.",true)
            //                 .setImage("https://i.pinimg.com/originals/d6/ed/94/d6ed9448c359a332e38472af219c1d5d.jpg");
            //                 channel_remote_duel.send(embed_msj_extra);

            //             //Fin de sección

            //             // channel_remote_duel.send('TIEMPO EXTRA INICIADO ('+minute+' minutos), SUERTE PARA TOD@S...!!!');
                        
            //             minute--; second--; 
                        
            //             mensaje = await temporizador_channel.send('Tiempo extra: '+minute+' : '+second);   
                            
            //                 if(!band){
            //                         timeCheck = setInterval(() => {
            //                         temp_call(mensaje)}, 2000);
            //                 }
            //         }else{
            //             message.reply('Acceso denegado...!!!');
            //         }
                
            //     }else{
            //         message.reply('Por favor introduzca un formato de comando apropiado. El formato apropiado es el siguiente: \n -start 10, -start 45, ... \n (Siempre y cuando el valor númerico sea menor o igual a 60)');
            //     }
            
            // break;

            case 'stop':
                // message.channel.messages.fetch().then((results) => {
                //     message.channel.bulkDelete(results).catch(console.error);
                // })

                temporizador_channel.messages.fetch().then((results) => {
                    temporizador_channel.bulkDelete(results);
                })

                temporizador_channel.send('TIEMPO DETENIDO...!!!');
                // channel_remote_duel.send('TIEMPO DETENIDO...!!!');
                prueba_tiempo.send("TIEMPO DETENIDO...!!!");
                try{
                    clearInterval(timeCheck);
                }catch(e){
                    console.warn("mensaje de error: "+e.message)
                }
                // timeCheck = undefined;
            break;

            case 'tiempo':

            

            break;

        }
})

