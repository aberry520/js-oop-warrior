"use strict"
const main = document.querySelector("main");

function displayDOM(x, y) {
    const p = document.createElement("p");
    p.innerHTML = x;
    main.append(p);
}

class Warrior {
    constructor(characterName, details, health = 10, power = 5) {
        this.characterName = characterName;
        this.health = health;
        this.power = power;
    }
    greet(){
       return `I am ${this.characterName}! My health is ${this.health} and my attack power is a mighty ${this.power}!`
    }
    attack(otherCharacter){
        return otherCharacter.health - this.power
    }
}
class Hero extends Warrior {
    announce(otherCharacter){
        return `My name is ${this.characterName}! And I have come to defeat you, ${otherCharacter.characterName}!`
    }
}
class Villan extends Warrior {
    taunt(otherCharacter){
        return `${otherCharacter.name} you are too weak to defeat me!`
    }
}



const heman = new Warrior("HeMan", null);
const thor = new Warrior("Thor", null);

displayDOM(heman.greet(thor));
displayDOM(heman.attack(thor));