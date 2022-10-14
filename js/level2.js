let dealerHealth = 13000;
let dealerHitDamage = 25;
let playerHealth = 1000;
let maxPlayerHealth = 1000;
let healingUsage = 10;
let healingAmount = 180;

//both player and dealer get randomised numbers
let dealerDamage = Math.floor(Math.random() * 99) + 1; //random number between 1 and 99 every time the page is refreshed
let playerDamage = Math.floor(Math.random() * 99) + 1;

//all queryselectors in main.js
const hp = document.querySelector('.dealer-health');
const playerHP = document.querySelector('.player-health');
const userIconButton = document.querySelector('.user-icon');
const crossIconButton = document.querySelector('.x-icon');
const pdmg = document.querySelector('.player-damage');
const dmg = document.querySelector('.dealer-damage');
const higherbutton = document.querySelector('.button-hoger');
const onScreenPrompt = document.querySelector('.screen-prompt');
const lowerbutton = document.querySelector('.button-lager');
const heal = document.querySelector('.healing');
const deathScreenPrompt = document.querySelector('.lose-prompt');
const deathScreen = document.querySelector('.reset');
let playerNametag = document.querySelector('.player-name');
const playerNameOnHealth = document.querySelector('.player-name-tag');
let selectedCovenant = document.querySelector('.covenant-select').value;

//show variables everytime page refreshes
heal.textContent = healingUsage;
dmg.textContent = dealerDamage;
pdmg.textContent = playerDamage;

//player guesses if he is going to get a higher number than dealer
function higher() {
  if (playerHealth > 0) {
  document.querySelector('.screen-prompt').style.opacity = "100"; //screen text pops up
  playerDamage = Math.floor(Math.random() * 99) + 1;
  pdmg.textContent = playerDamage;
  dealerDamage = Math.floor(Math.random() * 99) + 1;
  dmg.textContent = dealerDamage;
  if (playerDamage > dealerDamage) {
    onScreenPrompt.textContent = "You hit the dealer (chose higher and got higher)";
    if (dealerHealth > 0) {
      dealerHealth = dealerHealth - 100;
      hp.value = dealerHealth;
      return dealerHealth;
    } else {
      alert("Dealer Died");
    }
  } else {
    onScreenPrompt.textContent = "You are hit by the dealer (chose higher but got lower)";
    if (playerHealth > 0) {
      playerHealth = playerHealth - dealerHitDamage;
      playerHP.value = playerHealth;
      return playerHealth;
    } else {
      document.querySelector('.lose-prompt').style.opacity = "100";
      document.querySelector('.lose-prompt').style.zIndex = "1";
    }
  }
} else {
  document.querySelector('.lose-prompt').style.opacity = "100";
  document.querySelector('.lose-prompt').style.zIndex = "1";
}
}

higherbutton.addEventListener('click', higher);

//player guesses if he gets lower than dealer
function lower() {
  if (playerHealth > 0) {
  document.querySelector('.screen-prompt').style.opacity = "100";
  playerDamage = Math.floor(Math.random() * 99) + 1;
  pdmg.textContent = playerDamage;
  dealerDamage = Math.floor(Math.random() * 99) + 1;
  dmg.textContent = dealerDamage;
  if (playerDamage < dealerDamage) {
    onScreenPrompt.textContent = "You hit the dealer (chose lower and got lower)";
    if (dealerHealth >= 0) {
      dealerHealth = dealerHealth - 100;
      hp.value = dealerHealth;
      return dealerHealth;
    } else {
      alert("Dealer Died");
    }
  } else {
    onScreenPrompt.textContent = "You are hit by the dealer (chose lower but got higher)";
    if (playerHealth >= 0) {
      playerHealth = playerHealth - dealerDamage;
      playerHP.value = playerHealth;
      return playerHealth;
    } else {
      document.querySelector('.lose-prompt').style.opacity = "100";
      document.querySelector('.lose-prompt').style.zIndex = "2";
    }
  }
} else {
  document.querySelector('.lose-prompt').style.opacity = "100";
  document.querySelector('.lose-prompt').style.zIndex = "2";
}
}

lowerbutton.addEventListener('click', lower);

function doHealing() {
  if (healingUsage > 0) {
    if (playerHealth <= maxPlayerHealth) {
      healingUsage = healingUsage - 1;
      heal.textContent = healingUsage;
      playerHealth = playerHealth + healingAmount;
      if (playerHealth > maxPlayerHealth) {
        playerHealth = maxPlayerHealth;
      }
      playerHP.value = playerHealth;
      return playerHealth;
    }
  } else {
    onScreenPrompt.textContent = "You have no healing left";
  }
}

heal.addEventListener('click', doHealing);

function deathScreenReset() {
  document.location.reload();
}

deathScreen.addEventListener('click', deathScreenReset);

function selectCovenant() {
    if (document.querySelector('.covenant-select').value === "Covenant1") {
        selectedCovenant = "Covenant 1";
        healingUsage = 10;
        healingAmount = 180;
        heal.textContent = healingUsage;
        dealerHitDamage = 25;
        maxPlayerHealth = 1000;
        if (playerHealth >= 1000) {
          playerHealth = 1000;
        }
        playerHP.value = playerHealth;
        return playerHealth;
    }
    if (document.querySelector('.covenant-select').value === "Covenant2") {
        selectedCovenant = "Covenant 2";
        healingUsage = 6;
        healingAmount = 140;
        heal.textContent = healingUsage;
        maxPlayerHealth = 800;
        dealerHitDamage = 35;
        if (playerHealth >= 800) {
          playerHealth = 800;
        }
        playerHP.value = playerHealth;
        return playerHealth;
    }
    if (document.querySelector('.covenant-select').value === "Covenant3") {
        selectedCovenant = "Covenant 3";
        healingUsage = 20;
        healingAmount = 200;
        dealerHitDamage = 50;
        heal.textContent = healingUsage;
        maxPlayerHealth = 500;
        if (playerHealth >= 500) {
          playerHealth = 500;
        }
        document.querySelector('.screen-prompt').style.opacity = "100";
        document.querySelector('.covenant-select').disabled = true;
        onScreenPrompt.textContent = "You chose the hard way, there's no going back";
        playerHP.value = playerHealth;
        return playerHealth;
    }
}

function showUserSettings() {
  document.querySelector('.user-settings-prompt').style.opacity = "100";
  document.querySelector('.user-settings-prompt').style.zIndex = "1";
}

function hideUserSettings() {
  document.querySelector('.user-settings-prompt').style.opacity = "0";
  document.querySelector('.user-settings-prompt').style.zIndex = "-1";
}

userIconButton.addEventListener('click', showUserSettings);
crossIconButton.addEventListener('click', hideUserSettings);

function changeName() {
  playerNameOnHealth.textContent = playerNametag.value;
  console.log(playerNametag.value);
}

playerNametag.addEventListener('change', changeName);