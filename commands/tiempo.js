module.exports = {
	name: 'tiempo',
	description: "Este es un comando para visualizar el tiempo actual de la ronda...!!!",
	execute(message, args, channel_remote_duel,temporizador_channel,hour,minute,second,band){

        //Rol de @Yu-Gi-Oh! => 713769108046610542
        //En esta sección el "IF" pudiera ser como el de abajo, pero se recomienda mejor por el
        //id real del Rol, como se demuestra en el "IF" activo actualmente
        //if(message.member.roles.cache.some(r => r.name === "@Admin")){

        //let role = guild.roles.cache.find(r => r.name === "@Yu-Gi-Oh!");

	        if(message.member.roles.cache.has('713769108046610542')){
			    
	            if((minute >= 10) && (second >=10)){
            		message.reply("Tiempo actual: "+minute+" : "+second+" APRESURENSE JUGADORES...!!!");
            	}else if((minute >= 10) && (second < 10)){
            		message.reply("Tiempo actual: "+minute+" : 0"+second+" APRESURENSE JUGADORES...!!!");
            	}else if((minute < 10) && (second >=10)){
            		message.reply("Tiempo actual: 0"+minute+" : "+second+" APRESURENSE JUGADORES...!!!");
            	}else if((minute < 10) && (second < 10)){
            		message.reply("Tiempo actual: 0"+minute+" : 0"+second+" APRESURENSE JUGADORES...!!!");
            	}
	            
	        }else{
	        	message.reply('Acceso denegado...!!!').catch(console.error);
	        }
        
	}
}