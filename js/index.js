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
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)+min);
}

class Warrior {
    constructor(characterName, details, health = [randomNum(50,100)], power = randomNum(5,50)) {
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
        if (otherCharacter.health <= 0){
            victory.innerHTML = `${this.characterName} has been victorius! <button type="submit" id="newBattle">New Battle</button>`
            newBattle.addEventListener("click", function(){
                history.go(0);
            })
        }else {
            return "";
        }
    }
    alive(){
        if (this.health > 0){
            return true;
        }else{
            return false;
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
    
});
const intro = document.getElementById("intro")
cont.addEventListener("click", function(){
    
    cont.style.display = "none";
    
    console.log(hero, villain);
    const heroGreet = document.getElementById("heroGreet");
    const villainGreet = document.getElementById("villainGreet");
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
        intro.style.display = "none";
        displayBattle("Who attacks first?", "firstAttack")
        heroAttackBtn.style.visibility = "visible";
        villainAttackBtn.style.visibility = "visible";
    }, 9000);
});
heroAttackBtn.addEventListener("click", function(){
    firstAttack.style.display = "none";
    displayBattle(hero[0].attack(villain[0]));
    displayBattle(hero[0].victory(villain[0]));
});
villainAttackBtn.addEventListener("click", function(){
    firstAttack.style.display = "none";
    displayBattle(villain[0].attack(hero[0]));
    displayBattle(villain[0].victory(hero[0]));
});