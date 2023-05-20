$(document).ready(function() {
    let niz = [];
    let spreman = false;
    let indeks = 0;
    
    $("#dugme").click(function() {
        let nivo = document.getElementById("nivo").value;
        nivo = parseInt(nivo);
        zapocni(0, nivo);
    })

    function zapocni(i, nivo) {
        let randomCelija = Math.floor(Math.random() * 9 + 1);
        $("#" + randomCelija).css("background-color", "blue");
        niz.push(randomCelija);

        setTimeout(function(){
            $("#" + randomCelija).css("background-color", "white");
        }, 700);

        setTimeout(function(){
            if (i == nivo - 1) {
                $("#" + randomCelija).css("background-color", "white");
                spreman = true;
                return
            };

            let n = i + 1;
            zapocni(n, nivo);
        }, 1000);
    }

    $("td").click(function() {
        if (!spreman) return;
        if (niz[indeks] == parseInt($(this).attr("id"))) {
            $(this).css("background-color", "green");
            indeks++;
            if (indeks == niz.length) {
                spreman = false;
                niz = [];
                indeks = 0;
                setTimeout(function() {
                    alert("Bravo!");
                }, 1000)
            }
        } else {
            $("td").css("background-color", "red");
            indeks = 0;
            setTimeout(function(){
                $("td").css("background-color", "white");
            }, 1000); 
        }
    }) 
}) 