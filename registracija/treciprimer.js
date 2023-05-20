function ocistiGreske() {
    document.getElementById("korisnickoImeGreska").innerHTML = "";
    document.getElementById("mejlGreska").innerHTML = "";
    document.getElementById("telefonGreska").innerHTML = "";
    document.getElementById("lozinkaGreska").innerHTML = "";
    document.getElementById("potvrdaLozinkeGreska").innerHTML = "";
}

function registrujSe() {
    ocistiGreske();

    let korisnickoIme = document.getElementById("korisnickoIme").value;
    let mejl = document.getElementById("mejl").value;
    let telefon = document.getElementById("telefon").value;
    let lozinka = document.getElementById("lozinka").value;
    let potvrdaLozinke = document.getElementById("potvrdaLozinke").value;

    if (/^[a-zA-Z]\w*$/.test(korisnickoIme) == false) {
        document.getElementById("korisnickoImeGreska").innerHTML = "Lose uneto korisnicko ime.";
    } else if (/^\w+@[a-z]+\.[a-z]{2,3}$/.test(mejl) == false) {
        document.getElementById("mejlGreska").innerHTML = "Los mejl.";
    } else if (/^\+381 6\d \d{3,3}-\d{3,3}\d?$/.test(telefon) == false) {
        document.getElementById("telefonGreska").innerHTML = "Los telefon.";
    } else if (
        /^.{6,}$/.test(lozinka) == false ||
        /[a-z]/.test(lozinka) == false ||
        /[A-Z]/.test(lozinka) == false ||
        /\d/.test(lozinka) == false 
    ) {
        document.getElementById("lozinkaGreska").innerHTML = "Losa lozinka.";
    } else if (lozinka != potvrdaLozinke) {
        document.getElementById("potvrdaLozinkeGreska").innerHTML = "Losa potvrda lozinke";
    }

    if (!proveriJedinstvenost(korisnickoIme)) {
        document.getElementById("korisnickoImeGreska").innerHTML = "Korisnicko ime vec postoji.";
        return;
    }

    dodajKorisnika(korisnickoIme, mejl, telefon, lozinka);
}

function proveriJedinstvenost(ime) {
    for (let i = 0; i < korisnici.length; i++) {
        if (korisnici[i].korisnickoIme == ime) {
            return false;
        }
    }

    return true;
}

let korisnici = [ 
    {
        korisnickoIme : "_",
        mejl : "_",
        telefon : "_",
        lozinka : "_"
    }
]

function inicijalizujPodatke() {
    if (localStorage.getItem("korisnici") != null) {
        korisnici = JSON.parse(localStorage.getItem("korisnici"));
    } else {
        localStorage.setItem("korisnici", JSON.stringify(korisnici));
    }
} 

function dodajKorisnika(ki, m, t, l) {
    korisnici.push(
        {
            korisnickoIme : ki,
            mejl : m,
            telefon : t,
            lozinka : l
        }
    );

    localStorage.setItem("korisnici", JSON.stringify(korisnici));
}

function prijaviSe() {
    let korisnickoIme = document.getElementById("korisnickoIme").value;
    let lozinka = document.getElementById("lozinka").value; 

    document.getElementById("lozinkaGreska").innerHTML = "";
    document.getElementById("korisnickoImeGreska").innerHTML = "";

    for (let i = 0; i < korisnici.length; i++) {
        if (korisnici[i].korisnickoIme == korisnickoIme) {
            if (lozinka == korisnici[i].lozinka) {
                window.location.href = "drugiprimer.html";
                return;
            } else {
                document.getElementById("lozinkaGreska").innerHTML = "Losa lozinka.";
                return;
            }
        }
    }

    document.getElementById("korisnickoImeGreska").innerHTML = "Nepostojece korisnicko ime.";
}