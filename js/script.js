var listanombres = ["ESL_SC2", "OgamingSC2", "freecodecamp" , "storbeck", "RobotCaleb", "food", "radioelsembrador", "buzzr"];

/* esta funcion sirve para desplegar el modal con mas informacion del canal seleccionado 
   la variable "e" toma el nombre del canal que nos va a servir para enviar la informacion al modal
    esta se definio en el elemento "a" cuando creamos las cards */
function modalshowinfo(e) {
    /* Abrimos los dos archivos json, uno de la informacion del canal y otro para verificar si esta activo */
    $.getJSON("https://api.twitch.tv/kraken/users/" + e + "?client_id=39r473fxxkvfbns0nbddmvmvi2457v", function (json) {       
        $.getJSON("https://api.twitch.tv/kraken/streams/" + json.name +  "?client_id=39r473fxxkvfbns0nbddmvmvi2457v", function (jstream) {       
            /* si no esta transmitiendo abrirla el modal solo con el nombre del canal e informacion adicional */
            if (jstream.stream === null) {
                $("#modalavatar").removeClass("d-none");
                $("#modalavatar").addClass("d-block");
                $("#modalavatar").attr("src", json.logo);
                $("#modalmoreinfoTitle").text(json.display_name);
                $("#modalmoreinfobody").html("<strong>Status:</strong> Offline");
                $("#modalmoreinfobody").append("<br><strong>Info:</strong> " + json.bio);
                $("#gotochannel").attr("href", "https://twitch.tv/"+e);
            
            /* de lo contrario va a agregar la misma informacion que lo anterior pero agregará una miniatura de lo que se está transmitiendo */
            } else {
                $("#modalavatar").removeClass("d-none");
                $("#modalavatar").addClass("d-block");
                $("#modalavatar").attr("src", json.logo);
                $("#modalmoreinfoTitle").text(" " + json.display_name);
                $("#modalmoreinfobody").html("<strong>Status:</strong> Online");
                $("#modalmoreinfobody").append("<br><strong>Info:</strong> " + json.bio);
                $("#modalmoreinfobody").append("<hr><strong>Streaming Now: </strong> " + jstream.stream.game);
                $("#modalmoreinfobody").append('<br><img id="preview" class="img-fluid" src="'+ jstream.stream.preview.large +'">');
                $("#gotochannel").attr("href", "https://twitch.tv/"+e);
            }
        });
    });
}

/* Esta funcion obtiene todos los datos de los canales y genera cards para mostrar el contenido */
function getTwitch() {
    $("#modalavatar").removeClass("d-none");
    $("#modalavatar").addClass("d-block");
/*     Primero se generan todas las cards con los nombres de los canales y sus respectivos ID'S para que luego se pueda agregar dinamicamente mas contenido */
    /* obtenemos toda la info de cada canal para poder generar main cards usando un ciclo para iterar en una lista con los nombres de los canales */
    for (i = 0; i < listanombres.length; i++){
    
        /* tomamos la informacion de cada uno de los canales en estilo JSON*/
        $.getJSON("https://api.twitch.tv/kraken/users/" + listanombres[i]  +  "?client_id=39r473fxxkvfbns0nbddmvmvi2457v", function (json) {
            /* generamos dinamicamente las cads de cada uno de los canales con la informacion obtenida y agregamos funcion modalshowinfo() con el nombre del canal generado*/
                $("#homew").prepend('<div class="card text-center" id="' + json.name +'"><a data-toggle="modal" href="#modalmoreinfo" onclick="modalshowinfo(' + "'" + json.name + "'" + ');"><img class="card-img-top" id="' + json.name + 'logo" src="' + json.logo+ '" alt="' + json.name + 'logo"><div class="card-body"><h5>' +json.display_name + '</h5></div> <div class="card-footer text-center" id="'+json.name+'status"></div></a></div>');

                /* Twitch obtenemos informacion de cada uno de los canales para verificar si estan transmitiendo algo o no */
            $.getJSON("https://api.twitch.tv/kraken/streams/" + json.name +  "?client_id=39r473fxxkvfbns0nbddmvmvi2457v", function (jstream) {       

                /* si no estan transmitiendo nada entonces agregamos el icono rojo mostrando offline en el card-footer */
                if (jstream.stream === null) {
                    $("#contactw").prepend('<div class="card text-center" id="' + json.name +'"><a data-toggle="modal" href="#modalmoreinfo" onclick="modalshowinfo(' + "'" + json.name + "'" + ');"><img class="card-img-top" id="' + json.name + 'logo" src="' + json.logo+ '" alt="' + json.name + 'logo"><div class="card-body"><h5>' +json.display_name + '</h5></div></a></div>');
                    $("#" + json.name + "status").append('<div style="height: 15px; width: 15px; border: black 1px solid; border-radius: 50%; background-color: red; margin: auto;"></div><small class="text-muted">Offline</small>');              
                } 
    
                /* de lo contrario mostramos el icono verde mostrando online en el card-footer */               
                else {
                    $("#profilew").prepend('<div class="card text-center" id="' + json.name +'"><a data-toggle="modal" href="#modalmoreinfo" onclick="modalshowinfo(' + "'" + json.name + "'" + ');"><img class="card-img-top" id="' + json.name + 'logo" src="' + json.logo+ '" alt="' + json.name + 'logo"><div class="card-body"><h5>' +json.display_name + '</h5></a></div>');
                    $("#" + json.name + "status").append('<div style="height: 15px; width: 15px; border: black 1px solid; border-radius: 50%; background-color: green; margin: auto;"></div><small class="text-muted">Online</small>');      
                }
            });
        });
    }
}

function customsearch() {
    var custom = $("#customtext").val()
    if (custom === "") {
        $("#modalmoreinfoTitle").text("Error!");
        $("#modalmoreinfobody").html("It's better if you define a chanel name!");
        $("#gotochannel").addClass("d-none");
        $("#modalavatar").addClass("d-none");
        $("#modalavatar").removeClass("d-block");
    } else {
        $.getJSON("https://api.twitch.tv/kraken/users/" + custom + "?client_id=39r473fxxkvfbns0nbddmvmvi2457v", function (json) {
            $.getJSON("https://api.twitch.tv/kraken/streams/" + json.name +  "?client_id=39r473fxxkvfbns0nbddmvmvi2457v", function (jstream) {       
                if (jstream.stream === null) {
                    $("#gotochannel").removeClass("d-none");
                    $("#modalavatar").removeClass("d-none");
                    $("#modalavatar").addClass("d-block");
                    $("#modalavatar").attr("src", json.logo);
                    $("#modalmoreinfoTitle").text(json.display_name);
                    $("#modalmoreinfobody").html("<strong>Status:</strong> Offline");
                    $("#modalmoreinfobody").append("<br><strong>Info:</strong> " + json.bio);
                    $("#gotochannel").attr("href", "https://twitch.tv/"+custom);
                
                /* de lo contrario va a agregar la misma informacion que lo anterior pero agregará una miniatura de lo que se está transmitiendo */
                } else {
                    $("#gotochannel").removeClass("d-none");
                    $("#modalavatar").removeClass("d-none");
                    $("#modalavatar").addClass("d-block");
                    $("#modalavatar").attr("src", json.logo);
                    $("#modalmoreinfoTitle").text(" " + json.display_name);
                    $("#modalmoreinfobody").html("<strong>Status:</strong> Online");
                    $("#modalmoreinfobody").append("<br><strong>Info:</strong> " + json.bio);
                    $("#modalmoreinfobody").append("<hr><strong>Streaming Now: </strong> " + jstream.stream.game);
                    $("#modalmoreinfobody").append('<br><img id="preview" class="img-fluid" src="'+ jstream.stream.preview.large +'">');
                    $("#gotochannel").attr("href", "https://twitch.tv/"+custom);
                }
            });
        }).fail(function() {
            $("#gotochannel").addClass("d-none");
            $("#modalavatar").addClass("d-none");
            $("#modalavatar").removeClass("d-block");
            $("#modalmoreinfoTitle").text("Error!");
            $("#modalmoreinfobody").html("<strong>404</strong> Channel not found, please enter a valid channel name");
            
        });
    }
}
