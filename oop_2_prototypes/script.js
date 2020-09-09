function Player(name, attack, hitpoints) {
    this.name = name;
    this.attack = attack;
    this.hitpoints = hitpoints;
    this.totalHitpoints = hitpoints;
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