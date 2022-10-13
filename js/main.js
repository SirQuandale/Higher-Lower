let dealerHealth = 10000;


const hp = document.querySelector('.dealer-health');
function sub() {
  if (dealerHealth > 0) {
    dealerHealth = dealerHealth - 50;
    hp.value = dealerHealth;
    console.log(dealerHealth);
    return dealerHealth;
  }
}

//---(NIET GEBRUIKEN, BREEKT SPEL WANT ER IS GEEN MIN KNOP MEER)---
//const min = document.querySelector('.min');
//min.addEventListener('click', sub);

function addhealth() {
  if (dealerHealth < 100) {
    dealerHealth = dealerHealth + 50;
    hp.value = dealerHealth;
    console.log(dealerHealth);
  }
}

//---(NIET GEBRUIKEN, BREEKT SPEL WANT ER IS GEEN PLUS KNOP MEER)---
//const plushp = document.querySelector('.plus');
//plushp.addEventListener('click', addhealth);

const onScreenPrompt = document.querySelector('.screen-prompt');

//vanaf hier komt de dealer zijn nummers
let dealerDamage = Math.floor(Math.random() * 99) + 1; //random cijfer tussen 1 en 99 voor dealer elke keer als de page refreshed
console.log(dealerDamage);

const dmg = document.querySelector('.dealer-damage');
dmg.textContent = dealerDamage;

//vanaf hier komt de speler zijn nummers

let playerDamage = Math.floor(Math.random() * 99) + 1; //random cijfer tussen 1 en 99 voor speler elke keer als de page refreshed
console.log(playerDamage);

const pdmg = document.querySelector('.player-damage');
pdmg.textContent = playerDamage;

//playerhealth
let playerHealth = 1000;
const playerHP = document.querySelector('.player-health');

// ---backup voor playerdamage propmt--- (NIET GEBRUIKEN, BREEKT SPEL)
//document.querySelector('.playerdamage').style.opacity = "0";
//delay nodig
//document.querySelector('.playerdamage').style.opacity = "100";
//--------------------------------

//hoger button function
function higher() {
  if (playerHealth > 0) {
  document.querySelector('.screen-prompt').style.opacity = "100";
  playerDamage = Math.floor(Math.random() * 99) + 1;
  pdmg.textContent = playerDamage;
  dealerDamage = Math.floor(Math.random() * 99) + 1;
  dmg.textContent = dealerDamage;
  if (playerDamage > dealerDamage) {
    onScreenPrompt.textContent = "You hit the dealer (chose higher and got higher)";
    if (dealerHealth > 0) {
      dealerHealth = dealerHealth - 100;
      hp.value = dealerHealth;
      console.log(dealerHealth);
      return dealerHealth;
    } else {
      alert("Dealer Died");
    }
  } else {
    onScreenPrompt.textContent = "You are hit by the dealer (chose higher but got lower)";
    if (playerHealth > 0) {
      playerHealth = playerHealth - 25;
      playerHP.value = playerHealth;
      console.log(playerHealth);
      return playerHealth;
    } else {
      document.location.reload();
    }
  }
} else {
  document.querySelector('.lose-prompt').style.opacity = "100";
  document.querySelector('.lose-prompt').style.zIndex = "1";
}
}

const higherbutton = document.querySelector('.button-hoger');
higherbutton.addEventListener('click', higher);

//lager button function
function lower() {
  if (playerHealth > 0) {
  document.querySelector('.screen-prompt').style.opacity = "100";
  playerDamage = Math.floor(Math.random() * 99) + 1;
  pdmg.textContent = playerDamage;
  dealerDamage = Math.floor(Math.random() * 99) + 1;
  dmg.textContent = dealerDamage;
  if (playerDamage < dealerDamage) {
    onScreenPrompt.textContent = "You hit the dealer (chose lower and got lower)";
    if (dealerHealth > 0) {
      dealerHealth = dealerHealth - 100;
      hp.value = dealerHealth;
      console.log(dealerHealth);
      return dealerHealth;
    } else {
      alert("Dealer Died");
    }
  } else {
    onScreenPrompt.textContent = "You are hit by the dealer (chose lower but got higher)";
    if (playerHealth > 0) {
      playerHealth = playerHealth - 25;
      playerHP.value = playerHealth;
      console.log(playerHealth);
      return playerHealth;
    }
  }
} else {
  document.querySelector('.lose-prompt').style.opacity = "100";
  document.querySelector('.lose-prompt').style.zIndex = "1";
}
}

const lowerbutton = document.querySelector('.button-lager');
lowerbutton.addEventListener('click', lower);

//healing
let healingUsage = 7;
const heal = document.querySelector('.healing');

function doHealing() {
  if (healingUsage > 0) {
    if (playerHealth <= 1000) {
      healingUsage = healingUsage - 1;
      heal.textContent = healingUsage;
      playerHealth = playerHealth + 200;
      if (playerHealth > 1000) {
        playerHealth = 1000;
      }
      playerHP.value = playerHealth;
      console.log(playerHealth);
      console.log(healingUsage);
      return playerHealth;
    }
  } else {
    onScreenPrompt.textContent = "You have no healing left";
  }
}

heal.addEventListener('click', doHealing);

const deathScreenPrompt = document.querySelector('.lose-prompt');
const deathScreen = document.querySelector('.reset');

function deathScreenReset() {
  document.location.reload();
}

deathScreen.addEventListener('click', deathScreenReset);