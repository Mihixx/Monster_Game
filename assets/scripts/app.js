const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;


const MODE_ATTACK = 'ATTACK' // MODE_ATTCK = 0
const MODE_STRONG_ATTACK = 'STONG_ATTACK' //MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster','100');

let chosenMaxlife = parseInt(enteredValue);
let battleLog = [];

// if that is not a Number - isNAN

if(isNaN(chosenMaxlife) || chosenMaxlife <= 0 ){
    chosenMaxlife = 100;
}
let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxlife);

function writeToLog(event){
let logEntry;
if(event == LOG_EVENT_PLAYER_ATTACK){
    logEntry = {
        event : event
    };
}

}


function reset(){
     currentMonsterHealth = chosenMaxlife;
     currentPlayerHealth = chosenMaxlife;
     resetGame(chosenMaxlife);
}

function endRound(){
    const intialPlayerHealth = currentPlayerHealth; 
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);//14
    currentPlayerHealth -= playerDamage; //100-14


    if(currentPlayerHealth <= 0 && hasBonusLife === true ){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = intialPlayerHealth;
        setPlayerHealth(intialPlayerHealth);
        alert('You would be dead but the bonus life saved you !');
    }
  
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert("You won");
      reset();
    } else if (currentPlayerHealth <= 0 && currentPlayerHealth > 0) {
      alert("You Lost");
      reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("You have a draw");
      reset();
    }

    if(currentMonsterHealth<=0 || currentPlayerHealth<=0 ){
        reset();
    }
}


function attackMonster(mode){
    let maxDamage;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
    }else if(mode === MODE_STRONG_ATTACK ){
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage); //10
    currentMonsterHealth -= damage; //90
    endRound();
  }


function attackHandler() {
 attackMonster(MODE_ATTACK);
}

function strongAttackHanlder() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxlife - HEAL_VALUE){
        alert("You can't heal to more than Your max intial Health");
        healValue = chosenMaxlife - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += healValue;
    endRound();
}


attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHanlder);
healBtn.addEventListener("click",healPlayerHandler);
