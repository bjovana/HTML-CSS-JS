$(document).ready(function(){
    let niz = []
    let uspesnoOtvorene = 0;
    let brBombi;
    
    ucitajBrojBombi();
    izracunajRandomPozicije();
    dodeliKlaseCelijama();

    function ucitajBrojBombi() {
       brBombi = prompt("Unesite broj bombi! (Podrazumevano 3)");
    
       if (brBombi == null || brBombi == "") {
            brBombi = 3;
       } else {
            brBombi = parseInt(brBombi);
       }
    }

    function izracunajRandomPozicije() {
        let randomPozicija;
        for (let i = 0; i < brBombi; i++) {
            randomPozicija = Math.floor(Math.random() * 15 + 1);
            while (niz.includes(randomPozicija)) {
                randomPozicija = Math.floor(Math.random() * 15 + 1);
            }
            niz.push(randomPozicija);
        }
    }

    function dodeliKlaseCelijama() {
        for (let i = 1; i <= 16; i++) {
            let klasa;
            if (niz.includes(i)) {
                klasa = "sadrzi"
            } else {
                klasa = "neSadrzi"
            }

            $("#" + i).addClass(klasa);
        }
    }

    function racunajBombe(id) {
        let niz1 = [5,9,13];
        let niz2 = [4,8,12];

        let d = $("<div></div>")

        let broj = 0;
        if (id - 4 > 0 && $("#" + (id - 4)).attr("class") == "sadrzi") {
            broj++;
        }
        if (id + 4 < 17 && $("#" + (id + 4)).attr("class") == "sadrzi") {
            broj++;
        }
        if (id - 1 > 0 && $("#" + (id - 1)).attr("class") == "sadrzi" && !niz1.includes(id)) {
            broj++;
        }
        if (id + 1 < 17 && $("#" + (id + 1)).attr("class") == "sadrzi" && !niz2.includes(id)) {
            broj++;
        }
        if (id - 5 > 0 && $("#" + (id - 5)).attr("class") == "sadrzi" && !niz1.includes(id)) {
            broj++;
        }
        if (id + 5 < 17 && $("#" + (id + 5)).attr("class") == "sadrzi" && !niz2.includes(id)) {
            broj++;
        }
        if (id - 3 > 0 && $("#" + (id - 3)).attr("class") == "sadrzi" && !niz2.includes(id)) {
            broj++;
        }
        if (id + 3 < 17 && $("#" + (id + 3)).attr("class") == "sadrzi" && !niz1.includes(id)) {
            broj++;
        }

        d.append(broj);
        $("#" + id).append(d).show().css({"width" : "99px", "height" : "99px"}).addClass("kliknuta");
    }

    $("td").click(function() {
        if ($(this).hasClass("kliknuta")==true) return;
        if ($(this).attr("class") == "sadrzi") {
            for (let i = 0; i < brBombi; i++) {
                $("#" + niz[i]).css("background-color", "red");
            }
            setTimeout(function(){
                alert("Izgubili ste :(");
                return;
            }, 1000)
        } else {
            $(this).css("background-color", "green");
            let id = parseInt($(this).attr("id"));

            racunajBombe(id);

            uspesnoOtvorene++;
            if (uspesnoOtvorene + brBombi == 16) {
                setTimeout(function(){
                    alert("Pobedili ste!");
                    setTimeout(function(){location.reload()}, 1000);
                }, 1000)
            }
        }
    });
})