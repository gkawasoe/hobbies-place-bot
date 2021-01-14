module.exports = {
	name: 'start',
	description: "Este es un comando para un temporizador...!!!",
	execute(message, args, channel_remote_duel,temporizador_channel,hour,minute,second,band,source){

			function temp_call(){
                if((second > 0) && (timeCheck)){
                	second--;


                	if(message.content === '-stop'){
                		band=true;
                	}

	                message.channel.messages.fetch().then((results) => {
		                message.channel.bulkDelete(results).catch(console.error);
		            })
            		// message.reply("Tiempo actual: "+minute+" : "+second).queue();
            		message.reply("Tiempo actual: "+minute+" : "+second);


	                // 0 0 0
	                if ((hour == 0) && (minute == 0) && (second == 0)) {
	                	// console.log('entro a tiempo finalizado');
	                    message.channel.send("00:00:00 TIEMPO FINALIZADO...!!!");
	                    band=true;
	                    //channel_remote_duel.send("00:00:00 TIEMPO FINALIZADO...!!!");
	                }
	                // 0 1 1
	                    if((minute == 1) && (second == 0)){
	                    	// console.log('entro a iteracion 0 1 1');
	                    	message.channel.send("JUGADORES SOLO QUEDA "+minute+" MINUTO...!!!");
	                    	minute--;
	                    	second = 59;
	                    	
	                   	}
	                //0 1 0
	                if ((hour == 0) && (minute > 0) && (second == 0)) {
	                    minute--;
	                    second = 59;
	                 //   event.getMessage().editMessage(hour + ":" + minute + ":" + second).queue();;
	                }
	                //1 0 0 
	                if ((hour > 0) && (minute == 0) && (second == 0)) {
	                	// console.log('entro a iteracion 1 0 0');
	                    second = 59;
	                    minute = 59;
	                    hour--;
	                   // event.getMessage().editMessage(hour + ":" + minute + ":" + second).queue();;
	                }
	                //0 0 1 //1 0 1 //1 1 1 
	                
	                //1 1 0
	                if ((hour > 0) && (minute > 0) && (second == 0)) {
	                	// console.log('entro a iteracion 1 1 0');
	                    minute--;
	                 //   event.getMessage().editMessage(hour + ":" + minute + ":" + second).queue();
	                }
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
	            
	            //console.log(role);

	            message.channel.send('INICIA LA RONDA '+minute+' minutos, SUERTE A TOD@S...!!!');
	            // channel_remote_duel.send('INICIA LA RONDA, SUERTE A TOD@S...!!!');
	            // for(i=0;i<120000;i++){	
	            	if(!band){
	            		source.timeCheck = setInterval(temp_call,1000);

	            	}else{
	            		console.log('Tiempo Finalizado');
	            		message.channel.send("00:00:00 TIEMPO FINALIZADO...!!!");
	            	}
	        }else{
	        	message.reply('Acceso denegado...!!!').catch(console.error);
	        }
        
	}
}