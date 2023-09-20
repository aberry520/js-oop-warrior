"use strict"
const main = document.querySelector("main");

function displayIntro(x, y) {
    const p = document.createElement("p");
    p.innerHTML = x;
    intro.append(p);
    p.id = y;
}
function displayBattle(x, y) {
    const p = document.createElement("p");
    p.innerHTML = x;
    battle.append(p);
    p.id = y;
}

class Warrior {
    constructor(characterName, details, health = [10], power = 5) {
        this.characterName = characterName;
        this.health = health;
        this.power = power;
    }
    greet(){
       return `I am ${this.characterName}! My health is ${this.health} and my attack power is a mighty ${this.power}!`
    }
    attack(otherCharacter){
        const attack = otherCharacter.health - this.power;
        otherCharacter.health.unshift(attack);
        otherCharacter.health.pop();
        return `${this.characterName} attacks ${otherCharacter.characterName}. ${otherCharacter.characterName}'s health is now ${attack}!`
    }
    victory(otherCharacter){
        if (otherCharacter.health == 0){
            return `${this.characterName} has been victorius!`
        }
    }
}
class Hero extends Warrior {
    announce(otherCharacter){
        return `My name is ${this.characterName}! And I have come to defeat you, ${otherCharacter.characterName}!`
    }
}
class Villain extends Warrior {
    taunt(otherCharacter){
        return `You are too weak to defeat me ${otherCharacter.characterName}! I have the mighty power of ${this.power} compared to your measly power of ${otherCharacter.power}`
    }
}

const heroInput = document.getElementById("heroInput");
const villainInput = document.getElementById("villainInput");
const submit = document.getElementById("submit");
const cont = document.getElementById("continue");
const hero = [];
const villain = []; 
submit.addEventListener("click", function(){
    if(villainInput.value != "" && heroInput.value != ""){
    const villainName = villainInput.value;
    const villain1 = new Villain(villainName);
    villain.push(villain1);
    villainInput.style.display = "none";
    displayIntro(villain1.greet(), "villainGreet");
    
    const heroName = heroInput.value;
    const hero1 = new Hero(heroName);
    hero.push(hero1);
    heroInput.style.display = "none";
    displayIntro(hero1.greet(), "heroGreet");

    submit.style.display = "none";
    return cont.style.visibility = "visible";
    }
    
})
const intro = document.getElementById("intro")
cont.addEventListener("click", function(){
    
    cont.style.display = "none";
    
    console.log(hero, villain);
    const villainGreet = document.getElementById("villainGreet");
    const heroGreet = document.getElementById("heroGreet");
    villainGreet.style.display = "none";
    heroGreet.style.display = "none";
    displayIntro("Hero enters the arena:", "heroAnnounce");
    setTimeout(() => {
        displayIntro(hero[0].announce(villain[0]))
    }, 1500);
    setTimeout(() => {
        displayIntro("Villain enters arena:")
    }, 3000);
    setTimeout(() => {
        displayIntro(villain[0].taunt(hero[0]))
    }, 4500);
    setTimeout(() => {
        intro.style.visibility = "hidden";
        displayBattle("Who attacks first?")
        heroAttackBtn.style.visibility = "visible";
        villainAttackBtn.style.visibility = "visible";
    }, 7000);
})
// const heman = new Villain("HeMan", null);
// const thor = new Hero("Thor", null);

// displayIntro(heman.greet());
// displayIntro(thor.greet());
// displayIntro(thor.announce(heman));
// displayIntro(heman.taunt(thor));
// displayIntro(thor.attack(heman));
// displayIntro(heman.attack(thor));
// displayIntro(heman.attack(thor));
// displayIntro(heman.victory(thor));
