$(document).ready(function() {
    zapocni();

    function zapocni() {
        let nivo;
        dodajSlike();

        function promesajSlike(niz) {
            let indeks = niz.length - 1;
            
            for (let i = indeks; i > 0; i--) {
                let zamena = Math.floor(Math.random() * indeks);
                let tmp = niz[zamena];
                niz[zamena] = niz[i];
                niz[i] = tmp;
            }

            return niz;
        }

        function napraviTabeluSlika(niz) {
            if (nivo == 1) {
                for (let i = 0; i < 3; i++) {  
                    let red = $("<tr></tr>");
                    for (let j = 0; j < 4; j++) {
                        let celija = $("<td></td>").append(
                            $("<img>").attr("src", niz[i*4 + j])
                                    .attr("class", "otvorena")
                                    .addClass("slika")
                                    .css({
                                        "width" : "150px",
                                        "height" : "150px"
                                    })
                                    .hide()
                        ).append(
                            $("<img>").attr("src", "images/0.png")
                                    .attr("class", "zatvorena")
                                    .addClass("slika")
                                    .css({
                                        "width" : "150px",
                                        "height" : "150px"
                                    })
                                    .show()
                        );
                        red.append(celija);
                    }
                    $("#tabela").append(red);
                }
            } else if (nivo == 2) {
                for (let i = 0; i < 4; i++) {  
                    let red = $("<tr></tr>");
                    for (let j = 0; j < 6; j++) {
                        let celija = $("<td></td>").append(
                            $("<img>").attr("src", niz[i*6 + j])
                                    .attr("class", "otvorena")
                                    .addClass("slika")
                                    .css({
                                        "width" : "150px",
                                        "height" : "150px"
                                    })
                                    .hide()
                        ).append(
                            $("<img>").attr("src", "images/0.png")
                                    .attr("class", "zatvorena")
                                    .addClass("slika")
                                    .css({
                                        "width" : "150px",
                                        "height" : "150px"
                                    })
                                    .show()
                        );
                        red.append(celija);
                    }
                    $("#tabela").append(red);
                }
            } else {
                for (let i = 0; i < 6; i++) {  
                    let red = $("<tr></tr>");
                    for (let j = 0; j < 6; j++) {
                        let celija = $("<td></td>").append(
                            $("<img>").attr("src", niz[i*6 + j])
                                    .attr("class", "otvorena")
                                    .addClass("slika")
                                    .css({
                                        "width" : "110px",
                                        "height" : "110px"
                                    })
                                    .hide()
                        ).append(
                            $("<img>").attr("src", "images/0.png")
                                    .attr("class", "zatvorena")
                                    .addClass("slika")
                                    .css({
                                        "width" : "110px",
                                        "height" : "110px"
                                    })
                                    .show()
                        );
                        red.append(celija);
                    }
                    $("#tabela").append(red);
                }
            }
        }

        
        function inicijalizujPodatke() {
            if (localStorage.getItem("nivo") == null) {
                localStorage.setItem("nivo", "1");
            } else {
                nivo = localStorage.getItem("nivo");
                nivo = parseInt(nivo);
            }
        }

        function dodajSlike() {
            inicijalizujPodatke();

            let slike = [];

           if (nivo == 1) {
                for (let i = 1; i <= 6; i++) {
                    slike.push("images/" + i + ".png");
                    slike.push("images/" + i + ".png");
                }
           } else if (nivo == 2) {
                for (let i = 1; i <= 12; i++) {
                    slike.push("images/" + i + ".png");
                    slike.push("images/" + i + ".png");
                }
           } else if (nivo == 3) {
                for (let i = 1; i <= 18; i++) {
                    slike.push("images/" + i + ".png");
                    slike.push("images/" + i + ".png");
                }
           }

            slike = promesajSlike(slike);
            napraviTabeluSlika(slike);

        }

        $("img").on({
            mouseenter : function() {
                $(this).css("border-color", "blue")
            },

            mouseleave : function() {
                $(this).css("border-color", "black")
            }
        })

        let otvorena = false;
        let prva = null;
        let zatvorenaPrva = null;
        let blokada = false;
        let provera = 0;

        $("td").click(function() {
            if (blokada)
                return;

            if ($(this).find("img").filter(".otvorena").css("display") != "none")
                return;

            if (!otvorena) {
                otvorena = true;
                prva = $(this).find("img").filter(".otvorena").show();
                zatvorenaPrva = $(this).find("img").filter(".zatvorena").hide();
            } else {
                let druga = $(this).find("img").filter(".otvorena").show();
                let zatvorenaDruga = $(this).find("img").filter(".zatvorena").hide();

                if (prva.attr("src") != druga.attr("src")) {
                    blokada = true;
                    setTimeout(function() {
                        prva.hide();
                        druga.hide();
                        zatvorenaDruga.show();
                        zatvorenaPrva.show();

                        zatvorenaPrva = null;
                        otvorena = false;
                        prva = null;
                        blokada = false;
                    }, 1350)
                } else {
                    prva = null;
                    zatvorenaPrva = null;
                    otvorena = false;
                    provera++;
                } 
            }

            if (provera == 6 * nivo) {
                setTimeout(function() {
                    if (nivo == 3) {
                        alert("Cestitamo! Presli ste igricu!");
                        localStorage.setItem("nivo", 1);
                        location.reload();
                        return;
                    }

                    let b = confirm("Cestitamo! Da li zelite da igrate opet?");
                    if (b == true) {
                        $("img").filter(".otvorena").hide();
                        $("img").filter(".zatvorena").show();
                        provera = 0;
                        nivo++;
                        localStorage.setItem("nivo", nivo);
                        location.reload()
                    }
                    else {
                        localStorage.setItem("nivo", 0);
                        location.reload();
                        return;
                    }
                }, 500);
            }
        })

        $("#sakrij").click(function () {
            $("img").filter(".zatvorena").hide(3000);
        });

        $("#prikazi").click(function () {
            $("img").filter(".zatvorena").show(3000);
        });

        $("#prikazi-sakrij").click(function () {
            $("img").filter(".zatvorena").toggle(3000);
        });
    }
})
