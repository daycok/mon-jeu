const jeuConfig = {
    1: {
        enonce: "C'est un endroit où l'on a déjà fait un date mais avec une personne en plus.",
        reponse: "LE MAESTRO",
        indices: [
            "On peut y boire un verre.",
            "Cela signifie 'le maître' dans une autre langue.",
            "C'est le lieu où l'on s'est rencontrés pour la première fois."
        ],
        messages: ["✨ Bravo ma chérie ! ✨", "Tu as réussi la première étape. Pour l'instant c'est facile, mais le niveau va augmenter !", "Mais d'abord si tu le souhaites, tu as gagné un mojito !"],
    },
    2: {
        enonce: "Deuxième énigme... et cette fois chaque énigme donne un mot !",
        reponse: "LA FEE VERTE",
        indices: ["Déterminant féminin.", "Toute petite créature fantastique.", "Ma couleur préférée !", "C'est aussi l'endroit où l'on a discuté la première fois."],
        messages: ["Bien joué mon cœur, tu es trop forte ! 💖", "On avance bien ! Passons à la suite...", "Sauf si tu veux t'arrêter boire un verre bien sûr !"],
    },
    3: {
        enonce: "Troisième énigme...",
        reponse: "La Cantine du Curé",
        indices: ["On est déjà allés manger là-bas.", "Pour une occasion très spéciale.", "C'était il y a 3 ans et aussi 1 an jour pour jour !"],
        messages: ["MASTERCLASS ! ✨", "Encore deux !"],
    },
    4: {
        enonce: "Quatrième énigme...",
        reponse: "Le Coup De Pompe",
        indices: ["C'est un endroit où on a déjà été pour un date mais aussi pour autre chose.", "On ne peut malheureusement plus y retourner.", "C'était le lieu de notre premier date !"],
        messages: ["Tu es incroyable ! 🔥", "Dernière ligne droite."],
    },
    5: {
        enonce: "L'énigme finale ! ...",
        reponse: "IT",
        indices: ["C'est un endroit où l'on n'a été qu'une seule fois.", "Cela signifie 'cette chose' en anglais.", "C'est le premier resto où on a été ensemble !"],
        messages: ["INCROYABLE ! Bien joué mon AMOOOOOOOOOUUUUUUUUUUR 🏆"],
    }
};

const enigmeBonus = {
    enonce: "L'Énigme Secrète... Où est-ce qu'on va ce soir ?",
    reponse: "LE MUUTCH", 
    indices: [
        "Il faut d'abord prendre la voiture puis aller dans une ville voisine de St-Sébastien.", 
        "Maintenant, il faut se garer à un endroit où on a fait pas mal de dates, dont des marches, si tu trouves, tu as le droit au cadeau bonus !", 
        "On est passés juste devant par pur hasard."
    ], 
    messages: ["Bien joué mon amour, tu as trouvé où on allait !", "J'espère que ça te plaira, normalement c'est vraiment sympa.", "Je t'aime plus que tout."],
};

let enigmeActuelle = 1;

window.onload = () => chargerEnigme(1);

function chargerEnigme(num) {
    const config = jeuConfig[num];
    document.getElementById("titre").textContent = "Énigme " + num + " / 5";
    document.getElementById("enonce-enigme").textContent = config.enonce;
    
    for (let i = 1; i <= 3; i++) {
        const pIdx = document.getElementById("indice" + i);
        if (config.indices[i-1]) {
            pIdx.textContent = "Indice " + i + " : " + config.indices[i-1];
            pIdx.classList.add("cache");
            document.getElementById("btn-idx" + i).style.display = "block";
        } else {
            document.getElementById("btn-idx" + i).style.display = "none";
        }
    }
}

function afficherIndice(num) {
    document.getElementById("indice" + num).classList.remove("cache");
    document.getElementById("btn-idx" + num).style.display = "none";
}

function lancerFeuArtifice(isBonus = false) {
    const couleurs = isBonus ? ['#6a11cb', '#2575fc', '#ffffff'] : ['#ff4d6d', '#ff758f', '#ffffff'];
    var duration = 3 * 1000;
    var end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: couleurs });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: couleurs });
      if (Date.now() < end) { requestAnimationFrame(frame); }
    }());
}

async function verifier() {
    const input = document.getElementById("reponse");
    const reponseUser = input.value.trim(); 
    const messageZone = document.getElementById("message");
    const config = jeuConfig[enigmeActuelle];

    if (reponseUser === config.reponse) {
        input.disabled = true;
        messageZone.innerHTML = ""; 
        lancerFeuArtifice(false);
        for (let msg of config.messages) {
            const div = document.createElement("div");
            div.className = "indice"; 
            div.textContent = msg;
            messageZone.appendChild(div);
            await new Promise(r => setTimeout(r, 1200));
        }
        document.getElementById("suivant").classList.remove("cache");
    } else {
        messageZone.innerHTML = "<p style='color: #ff4d6d; margin-top:10px; font-weight:bold;'>Mauvaise réponse... (Majuscules et accents importants ! ⚠️)</p>";
        setTimeout(() => { messageZone.innerHTML = ""; }, 2500);
    }
}

function enigmeSuivante() {
    enigmeActuelle++;
    if (enigmeActuelle > 5) {
        lancerFeuArtifice(false);
        const card = document.querySelector(".card");
        card.innerHTML = `
            <h1>Bravo mon amour ! ❤️</h1>
            <p style="padding:10px; line-height:1.6; color: #592020;">
                Tu as tout fini pour cette fois ! J'espère que cela t'a plu et si c'est le cas, on pourra le refaire un jour !<br><br>
                <strong>Je t'aime plus que tout 💖</strong><br><br>
                De la part de ton amoureux.
            </p>
            <div id="bonus-container"></div>`;
        
        setTimeout(() => {
            const container = document.getElementById("bonus-container");
            container.innerHTML = `<button id="btn-bonus-final" onclick="lancerBonus()" class="btn-valider" style="display:none; animation: fadeIn 2s forwards;">✨ Débloquer le Secret Ultime ✨</button>`;
            document.getElementById("btn-bonus-final").style.display = "block";
        }, 20000); 

        return;
    }
    document.getElementById("reponse").value = "";
    document.getElementById("reponse").disabled = false;
    document.getElementById("message").innerHTML = "";
    document.getElementById("suivant").classList.add("cache");
    chargerEnigme(enigmeActuelle);
}

function lancerBonus() {
    document.body.classList.add("theme-bonus");
    const card = document.querySelector(".card");
    card.innerHTML = `
        <h1 id="titre">🌟 Énigme Bonus 🌟</h1>
        <div class="zone-énigme"><p id="enonce-enigme">${enigmeBonus.enonce}</p></div>
        <hr style="border: 0; height: 1px; background: rgba(0,0,0,0.1); margin: 15px 0;">
        <button class="btn-indice" onclick="afficherIndiceBonus(1, this)">💡 Indice 1</button>
        <p id="b-idx1" class="indice cache">${enigmeBonus.indices[0]}</p>
        <button class="btn-indice" onclick="afficherIndiceBonus(2, this)">💡 Indice 2</button>
        <p id="b-idx2" class="indice cache">${enigmeBonus.indices[1]}</p>
        <input type="text" id="reponse-bonus" placeholder="L'endroit secret... 🤫">
        <button class="btn-valider" onclick="verifierBonus()" style="background: linear-gradient(135deg, #6a11cb, #2575fc);">✨ Valider le secret</button>
        <div id="message-bonus"></div>
    `;
}

function afficherIndiceBonus(num, btn) {
    document.getElementById("b-idx" + num).classList.remove("cache");
    btn.style.display = 'none';
}

async function verifierBonus() {
    const input = document.getElementById("reponse-bonus");
    const reponseUser = input.value.trim();
    const messageZone = document.getElementById("message-bonus");

    if (reponseUser === enigmeBonus.reponse) {
        input.disabled = true;
        messageZone.innerHTML = "";
        lancerFeuArtifice(true); 
        for (let msg of enigmeBonus.messages) {
            const div = document.createElement("div");
            div.className = "indice";
            div.textContent = msg;
            messageZone.appendChild(div);
            await new Promise(r => setTimeout(r, 1200));
        }
    } else {
        messageZone.innerHTML = "<p style='color: #c31432; margin-top:10px; font-weight:bold;'>Ce n'est pas encore ça... 🤐</p>";
        setTimeout(() => { messageZone.innerHTML = ""; }, 2500);
    }
}