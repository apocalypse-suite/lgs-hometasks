function Player(info) {
    this.name = info.name;
    this.attack = info.attack;
    this.hitpoints = info.hitpoints;
    this.totalHitpoints = info.hitpoints;
}

Player.prototype.getHitpoints = function () {
    return this.hitpoints;
}
Player.prototype.setHitpoints = function (val) {
    this.hitpoints = val;
}
Player.prototype.getTotalHitpoints = function () {
    return this.totalHitpoints;
}
Player.prototype.setTotalHitpoints = function (val) {
    this.totalHitpoints = val;
}
Player.prototype.getAttack = function () {
    return this.attack;
}
Player.prototype.setAttack = function (val) {
    this.attack = val;
}
Player.prototype.isAlive = function () {
    return this.hitpoints >= 0;
}
Player.prototype.fight = function (opponent, killed) {
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

function Champ(name, attack, hitpoints) {
    Player.apply(this, [name, attack, hitpoints]);
}

Champ.prototype = Object.create(Player.prototype);
Champ.prototype.constructor = Champ;

Champ.prototype.heal = function () {
    if (this.hitpoints + 5 <= this.totalHitpoints) this.hitpoints += 5;
    else console.error('Can`t be more than total');
}

Champ.prototype.defence = function () {
    this.totalHitpoints += 1;
    this.isDefenced = true;
}

function Monster(name, attack, hitpoints) {
    Player.apply(this, [name, attack, hitpoints]);
    this.doubleAttack = attack * 2;
    this.counter;
}

Monster.prototype = Object.create(Player.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.enrage = function () {
    this.isEnraged = true;
    this.counter = 2;
}
Monster.prototype.fury = function () {
    if (this.hitpoints > 5) {
        console.warn('fury used');
        this.totalHitpoints -= 5;
        this.hitpoints -= 5;
        this.attack += 2;
    } else console.error('Not enough of hitpoints to use fury');
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