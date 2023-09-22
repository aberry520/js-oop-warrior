"use strict"
const main = document.querySelector("main");

function displayIntro(x, y) {
    const p = document.createElement("p");
    p.innerHTML = x;
    intro.append(p);
    p.id = y;
}
function displayBattle(x, y) {
    const battle = document.getElementById("battle");
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
        if (this.health >= 0){
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
class Zombie extends Warrior {
    constructor(characterName, health = 10000,power = [randomNum(5,15)]){
        super(characterName, health, power)
    }
    alive(){
        return true;
    }
}

const heroInput = document.getElementById("heroInput");
const villainInput = document.getElementById("villainInput");
const submit = document.getElementById("submit");
const cont = document.getElementById("continue");

let state = {
    hero: null,
    villain: null,
    zombie: null
}
let enemies = [];
const zombie = new Zombie("Zombie");

submit.addEventListener("click", function(){
    if(villainInput.value != "" && heroInput.value != ""){
    const villainName = villainInput.value;
    state.villain = new Villain(villainName);
    const villain = state.villain;
    // villain.push(villain);
    villainInput.style.display = "none";
    displayIntro(villain.greet(), "villainGreet");
    
    const heroName = heroInput.value;
    state.hero = new Hero(heroName);
    const hero = state.hero;
    enemies.push(state.villain);
    enemies.push(state.zombie);
    heroInput.style.display = "none";
    displayIntro(hero.greet(), "heroGreet");

    submit.style.display = "none";
    state = {hero,villain,zombie}
    console.log(state)
    return cont.style.visibility = "visible";
    }
    
});
const intro = document.getElementById("intro")
cont.addEventListener("click", function(){
    
    cont.style.visibility = "hidden";
    
    const heroGreet = document.getElementById("heroGreet");
    const villainGreet = document.getElementById("villainGreet");
    villainGreet.style.display = "none";
    heroGreet.style.display = "none";
    displayIntro("Hero enters the arena:", "heroAnnounce");
    // setTimeout(() => {
        displayIntro(state.hero.announce(state.villain))
    // }, 1500);
    // setTimeout(() => {
        displayIntro("Villain enters arena:")
    // }, 3000);
    // setTimeout(() => {
        displayIntro(state.villain.taunt(state.hero));
        cont.style.visibility = "visible";
    // }, 4500);
    // setTimeout(() => {
        intro.style.display = "none";
        displayBattle("Who attacks first?", "firstAttack")
        heroAttackBtn.style.visibility = "visible";
        villainAttackBtn.style.visibility = "visible";
    // }, 9000);
});

let x = [0];
heroAttackBtn.addEventListener("click", function(){
    let enemy = enemies[randomNum(0,2)];
    if ( x = [0]) {
        firstAttack.style.display = "none";
        x.push(1);
    }
    if (enemy === enemies[0]){
        displayBattle(state.hero.attack(state.villain));
    }
    if (enemy === enemies[1]){
        displayBattle("Oh no a zombie appeared!");
        // displayBattle(`${state.hero.characterName}: What is your name beast!`)
        setTimeout(() => {
            displayBattle(`${state.hero.characterName} attack's to no avail!`);
        }, 1000);
    }
    if (state.villain.alive() === false){
        state.hero.victory(state.villain);
    }
});
villainAttackBtn.addEventListener("click", function(){
    // let {hero,villain,zombie} = state;
    let enemy = enemies[randomNum(0,2)];
    if ( x = [0]) {
        firstAttack.style.display = "none";
        x.push(1);
    }
    if (enemy === enemies[0]){
        displayBattle(state.villain.attack(state.hero));
        console.log(enemy);
        
    }
    if (enemy === enemies[1]){
        displayBattle("Oh no a zombie appeared!");
        setTimeout(() => {
            displayBattle(zombie.attack(state.hero));
        }, 1000);
        
    }
    if (state.hero.alive() === false){
        state.villain.victory(state.hero);
    }
});