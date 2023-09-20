"use strict"
const main = document.querySelector("main");

function displayDOM(x, y) {
    const p = document.createElement("p");
    p.innerHTML = x;
    main.append(p);
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
class Villan extends Warrior {
    taunt(otherCharacter){
        return `${otherCharacter.characterName} you are too weak to defeat me!`
    }
}



const heman = new Villan("HeMan", null);
const thor = new Hero("Thor", null);

displayDOM(heman.greet());
displayDOM(thor.greet());
displayDOM(thor.announce(heman));
displayDOM(heman.taunt(thor));
displayDOM(thor.attack(heman));
displayDOM(heman.attack(thor));
displayDOM(heman.attack(thor));
displayDOM(heman.victory(thor));
