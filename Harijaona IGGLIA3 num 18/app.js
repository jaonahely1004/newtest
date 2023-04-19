let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdinateur = document.getElementById("score-pc");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];//tous les elements dans un tableau
let opierreBtn = document.getElementById("opierre");
let opapierBtn = document.getElementById("opapier");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

const jouerManche = (e) =>{
    let choix = e.target.closest(".btn-joueur");

    btnJoueur.forEach((btn) =>{
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
    });

    choix.classList.remove("desactivated");
    choix.classList.add("active");

    let choixJoueur = choix.id;
    let choixOrdi = faireChoixOrdinateur();
    //console.log(e.target);

    verifierGagnant(choixJoueur, choixOrdi);

    nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const PAPIER = "papier";
const CISEAUX = "ciseaux";

const faireChoixOrdinateur = () =>{
    let nbAleatoire = Math.floor(Math.random() * 3);
    
    switch(nbAleatoire){
        case 0 :
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1 :
            opapierBtn.classList.add("active");
            return PAPIER;
        default : 
            ociseauxBtn.classList.add("active");
            return CISEAUX;
    }
}

const verifierGagnant = (choixJoueur, choixOrdi) =>{
    if (choixJoueur == choixOrdi) {
        message.textContent = "Egalité!";
        return;
    }

    if (choixJoueur == PIERRE) {
        if(choixOrdi==PAPIER){
            return victoireOrdinateur();
        }else if(choixOrdi == CISEAUX){
            return victoireJoueur();
        }
    }

    if(choixJoueur == PAPIER){
        if(choixOrdi==PIERRE){
            return victoireJoueur();
        }else if(choixOrdi == CISEAUX){
            return victoireOrdinateur();
        }
    }

    if(choixJoueur == CISEAUX){
        if(choixOrdi==PIERRE){
            return victoireOrdinateur();
        }else if(choixOrdi == PAPIER){
            return victoireJoueur();
        }
    }
}

const victoireOrdinateur = () =>{
    message.textContent = "L'ordinateur a gagner!";
    scoreOrdinateur.textContent++;
}

const victoireJoueur = () =>{
    message.textContent = "Vous avez gagné!"
    scoreJoueur.textContent++;
}

const preparerNouvelleManche = () =>{
    btnJoueur.forEach(btn => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

        btn.addEventListener("click", jouerManche);
    })
    nextBtn.style.visibility = "hidden";
    opierreBtn.classList.remove("active");
    opapierBtn.classList.remove("active");
    ociseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer !";
}

nextBtn.addEventListener("click",preparerNouvelleManche);

btnJoueur.forEach(btn => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click",() =>{
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;

    preparerNouvelleManche();
})