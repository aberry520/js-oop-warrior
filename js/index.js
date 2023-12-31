"use strict"
////////Document Variables////////
const heroInput = document.getElementById("heroInput");
const villainInput = document.getElementById("villainInput");
const submit = document.getElementById("submit");
const cont = document.getElementById("continue");
const zombieMode = document.getElementById("zombieMode");
const main = document.querySelector("main");
const label = document.querySelector("label");
const intro = document.getElementById("intro");

////////Functions////////
function displayIntro(x, y) {
    const p = document.createElement("p");
    p.innerHTML = x;
    intro.append(p);
    p.id = y;
}
function displayDialogue(x, y) {
    const battle = document.getElementById("battle");
    const p = document.createElement("p");
    p.innerHTML = x;
    dialogue.append(p);
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
    return Math.floor(Math.random() * (max - min) + min);
}
////////Classes////////
class Warrior {
    constructor(characterName, details, health = randomNum(50, 100), power = randomNum(5, 50)) {
        this.characterName = characterName;
        this.health = health;
        this.power = power;
    }
    greet() {
        return `I am ${this.characterName}! My health is ${this.health} and my attack power is a mighty ${this.power}!`
    }
    attack(otherCharacter) {
        const attack = otherCharacter.health - this.power;
        otherCharacter.health = attack;
        return `${this.characterName} attacks ${otherCharacter.characterName}. ${otherCharacter.characterName}'s health is now ${attack}!`
    }
    victory(otherCharacter) {
        if (otherCharacter.health <= 0) {
            victory.innerHTML = `${this.characterName} has been victorius! <button type="submit" id="newBattle">New Battle</button>`;
            battle.style.display = "none";
            newBattle.addEventListener("click", function () {
                history.go(0);
            })
        } else {
            return "";
        }
    }
    alive() {
        if (this.health >= 0) {
            return true;
        } else {
            return false;
        }
    }
}
class Hero extends Warrior {
    announce(otherCharacter) {
        return `My name is ${this.characterName}! And I have come to defeat you, ${otherCharacter.characterName}!`
    }
}
class Villain extends Warrior {
    taunt(otherCharacter) {
        return `You are too weak to defeat me ${otherCharacter.characterName}! I have the mighty power of ${this.power} compared to your measly power of ${otherCharacter.power}`
    }
}
class Zombie extends Warrior {
    constructor(characterName, health, power) {
        super(characterName, health, power)
    }
    alive() {
        return true;
    }
}
////////State Object////////
let state = {
    hero: null,
    villain: null,
    zombie: null
}



document.addEventListener("DOMContentLoaded", function () {
    dialogue.style.display = "none";
    battle.style.display = "none";

    ////////Button Event Listeners////////
    submit.addEventListener("click", function () {

        if (villainInput.value != "" && heroInput.value != "") {
            const heroName = heroInput.value;
            if (heroInput.value == "jesus" || heroInput.value == "Jesus") {
                state.hero = new Hero(heroName, null, 10000000, 10000000);
            } else {
                state.hero = new Hero(heroName);
            }
            dialogue.style.display = "flex";
            const villainName = villainInput.value;
            state.villain = new Villain(villainName);
            const villain = state.villain;
            villainInput.style.display = "none";
            displayDialogue(villain.greet(), "villainGreet");
            cont.style.visibility = "visible";

            const zombie = state.zombie;
            state.zombie = new Zombie("zombie", 1000, randomNum(5, 15));
            const hero = state.hero;
            enemies.push(state.villain);
            enemies.push(state.zombie);
            heroInput.style.display = "none";
            displayDialogue(hero.greet(), "heroGreet");
            zombieMode.style.display = "none";
            label.style.display = "none"
            submit.style.display = "none";
            console.log(state)
            return state = { hero, villain, zombie };
        }

    });
    cont.addEventListener("click", function () {
        cont.style.visibility = "hidden";

        displayDialogue("Hero enters the arena:", "heroAnnounce");
        setTimeout(() => {
            displayDialogue(state.hero.announce(state.villain))
        }, 1500);
        setTimeout(() => {
            displayDialogue("Villain enters arena:")
        }, 3000);
        setTimeout(() => {
            displayDialogue(state.villain.taunt(state.hero));
            cont.style.visibility = "visible";
        }, 4500);
        cont.addEventListener("click", function () {
            intro.style.display = "none";

            displayBattle("Who attacks first?", "firstAttack")
            heroAttackBtn.style.visibility = "visible";
            villainAttackBtn.style.visibility = "visible";
            battle.style.display = "flex";
            dialogue.style.display = "none";
        })


    });

    let enemies = [];//enemies array for zombie mode
    let x = [0];//array for inital state, need to refactor but works for now
    heroAttackBtn.addEventListener("click", function () {
        let enemy = enemies[randomNum(0, 2)];
        if (x = [0]) {
            firstAttack.style.display = "none";
            x.push(1);
            heroAttackBtn.style.visibility = "hidden";
        }
        if (zombieMode.checked == true) {
            if (enemy === enemies[0]) {
                displayBattle(state.hero.attack(state.villain));
                heroAttackBtn.style.visibility = "hidden";
                villainAttackBtn.style.visibility = "visible";
            }
            if (enemy === enemies[1]) {
                displayBattle("Oh no a zombie appeared!");
                // displayBattle(`${state.hero.characterName}: What is your name beast!`)
                setTimeout(() => {
                    displayBattle(`${state.hero.characterName} attack's to no avail!`);
                    heroAttackBtn.style.visibility = "hidden";
                    villainAttackBtn.style.visibility = "visible";
                }, 1000);
            }
        } else {
            displayBattle(state.hero.attack(state.villain));
            heroAttackBtn.style.visibility = "hidden";
            villainAttackBtn.style.visibility = "visible";
        }
        setTimeout(() => {
            if (state.villain.alive() === false) {
                state.hero.victory(state.villain);
            }
        }, 50);

    });
    villainAttackBtn.addEventListener("click", function () {
        let enemy = enemies[randomNum(0, 2)];
        console.log(enemies[0], enemies[1], state);
        if (x = [0]) {
            firstAttack.style.display = "none";
            x.push(1);
            villainAttackBtn.style.visibility = "hidden";
        }
        if (zombieMode.checked === true) {
            if (enemy === enemies[0]) {
                displayBattle(state.villain.attack(state.hero));
                heroAttackBtn.style.visibility = "visible";
                villainAttackBtn.style.visibility = "hidden";
            }
            if (enemy === enemies[1]) {
                state.zombie = enemies[1];
                displayBattle("Oh no a zombie appeared!");
                setTimeout(() => {
                    displayBattle(state.zombie.attack(state.hero));
                    heroAttackBtn.style.visibility = "visible";
                    villainAttackBtn.style.visibility = "hidden";
                }, 1000);

            }
        } else {
            displayBattle(state.villain.attack(state.hero));
            heroAttackBtn.style.visibility = "visible";
            villainAttackBtn.style.visibility = "hidden";
        }

        setTimeout(() => {
            if (state.hero.alive() === false) {
                state.villain.victory(state.hero);
            }
        }, 50);

    });
});