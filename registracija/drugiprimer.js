function smanjiStanje() {
    let trenutnoStanje = document.getElementById("stanje").innerText.split(" $");
    
    tren = parseInt(trenutnoStanje[0]);

    tren1 = tren;

    let provera = document.getElementById("nmp").value;
    
    if (provera) {
        provera = parseInt(provera);

        if (provera < 0) {
            provera *= -1;
        }
        tren -= provera;
    } else {
        if (document.getElementById("5").checked) 
            tren -= 5;
        else if (document.getElementById("10").checked)
            tren -= 10;
        else if (document.getElementById("25").checked)
            tren -= 25;
    }

    if (tren < 0) {
        alert("Nema dovoljno novca na racunu!");
        tren = tren1;
    }
    
    promeniBoju(tren);

    tren += " $"
    novoStanje = [tren];
    document.getElementById("stanje").innerText = novoStanje;
    document.getElementById("nmp").innerHTML = " ";
}

function promeniBoju(tren){
    if (tren > 100) {
        document.getElementById("stanje").setAttribute("class", "badge bg-success");
    } else if (tren > 50) {
        document.getElementById("stanje").setAttribute("class", "badge bg-warning");
    }
    else {
        document.getElementById("stanje").setAttribute("class", "badge bg-danger");
    }
}


