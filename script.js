class Player {
    constructor(playerInfo) {
        this.name = playerInfo.name;
        this.attack = playerInfo.attack;
        this.hitpoints = playerInfo.hitpoints;
        this.totalHitpoints = playerInfo.hitpoints;
    }
    getHitpoints() {
        return this.hitpoints;
    }
    setHitpoints(val) {
        this.hitpoints = val;
    }
    getTotalHitpoints() {
        return this.totalHitpoints;
    }
    setTotalHitpoints(val) {
        this.totalHitpoints = val;
    }
    getAttack() {
        return this.attack;
    }
    setAttack(val) {
        this.attack = val;
    }
    isAlive() {
        return this.hitpoints >= 0;
    }
    fight(opponent, killed) {
        if (this.isAlive() === false || opponent.isAlive() === false) {
            console.log('Not alive');
            killed(true);
            return;
        }
        if (this === opponent) console.error('Cannot fight yourself');
        if (opponent instanceof Champ) {
            (opponent.isDefenced == true) ? (console.error('Opponent is defenced'), opponent.isDefenced = false) :
            (opponent.hitpoints > 0) ? (opponent.hitpoints -= this.attack) : console.error('Target is already dead');
        } else if (opponent instanceof Monster) {
            (this.isEnraged == true && this.counter > 0) ? (opponent.hitpoints -= this.doubleAttack, this.counter--) :
            (this.isEnraged = false, opponent.hitpoints -= this.attack);
        }
        if (opponent.hitpoints <= 0) {
            console.log(`%c ${opponent.name} is now KILLED by ${this.name}:`, 'background:#8eff80');
            this.attack += 1;
            killed(true);
        }
    }

}

class Champ extends Player {
    constructor(playerInfo) {
        super(playerInfo); //calls constructor of parent
    }
    heal() {
        if (this.hitpoints + 5 <= this.totalHitpoints) this.hitpoints += 5;
        else console.error('Can`t be more than total');
    }
    defence() {
        this.totalHitpoints += 1;
        this.isDefenced = true;
    }
}

class Monster extends Player {
    constructor(playerInfo) {
        super(playerInfo);
        this.doubleAttack = playerInfo.attack * 2;
        this.counter;
    }
    enrage() {
        this.isEnraged = true;
        this.counter = 2;
    }
    fury() {
        if (this.hitpoints > 5) {
            console.warn('fury used');
            this.totalHitpoints -= 5;
            this.hitpoints -= 5;
            this.attack += 2;
        } else console.error('Not enough of hitpoints to use fury');
    }
}

let hercules = new Champ({
    name: 'Hercules',
    attack: 12,
    hitpoints: 112,
    isDefenced: false
});
let monster = new Monster({
    name: 'Mr. Dark',
    attack: 14,
    hitpoints: 105,
    isEnraged: false
});

console.log('Champion`s total hitpoints: ', hercules.getTotalHitpoints());
console.log('Monster`s total hitpoints: ', monster.getTotalHitpoints());

let timer = setInterval(() => {
    let randomNum = Math.random() > 0.5 ? 0 : 1;
    //0 - Monster, 1 - Champ
    let healChance = Math.random() > 0.5 ? true : false;
    let defenceChance = Math.random() > 0.5 ? true : false;
    let enrageChance = Math.random() > 0.5 ? true : false;
    let furyChance = Math.random() > 0.5 ? true : false;
    let attacker;
    let opponent;
    if (randomNum === 0) {
        attacker = monster;
        opponent = hercules;
    } else {
        attacker = hercules;
        opponent = monster;
    }
    if (attacker instanceof Champ) {
        if (defenceChance) attacker.isDefenced = true;
        if (healChance) attacker.heal();
    }
    if (attacker instanceof Monster) {
        if (enrageChance) {
            attacker.enrage();
            console.warn('enrage used')
        }
        if (furyChance) attacker.fury();

    }
    attacker.fight(opponent, (isKilled) => {
        if (isKilled) clearInterval(timer);
    });;
    console.log(`${attacker.name} hit ${opponent.name}: -${attacker.attack}`);
    console.log(hercules.name, ' - ', hercules.hitpoints);
    console.log(monster.name, ' - ', monster.hitpoints);

}, 1500)