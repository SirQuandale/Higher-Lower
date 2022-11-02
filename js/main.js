let dealerHealth = 5000;
let dealerHitDamage = 35;
let playerHealth = 1000;
let maxPlayerHealth = 1000;
let healingUsage = 10;
let healingAmount = 180;

const level = window.location.pathname.split("/").slice(-1)[0].replace('.html',''); //gets the html page level
if (level == "level1") {
  dealerHealth = 5000; //changes dealer health depending on which level is selected, in this case level 1
}
if (level == "level2") { //changes dealer health depending on level
 dealerHealth = 10000;
}
if (level == "level3") {
  dealerHealth = 15000;
}

//both player and dealer get randomised numbers
let dealerDamage = Math.floor(Math.random() * 99) + 1; //random number between 1 and 99 every time the page is refreshed
let playerDamage = Math.floor(Math.random() * 99) + 1;

//all starter queryselectors in main.js
const hp = document.querySelector('.dealer-health');
const playerHP = document.querySelector('.player-health');
const userIconButton = document.querySelector('.user-icon');
const crossIconButton = document.querySelector('.x-icon');
const pdmg = document.querySelector('.player-damage');
const dmg = document.querySelector('.dealer-damage');
const higherbutton = document.querySelector('.button-higher');
const onScreenPrompt = document.querySelector('.screen-prompt');
const lowerbutton = document.querySelector('.button-lower');
const heal = document.querySelector('.healing');
const deathScreenPrompt = document.querySelector('.lose-prompt');
const winScreenPrompt = document.querySelector('.win-prompt');
const deathScreen = document.querySelector('.reset');
let playerNametag = document.querySelector('.player-name');
const playerNameOnHealth = document.querySelector('.player-name-tag');
let selectedCovenant = document.querySelector('.covenant-select').value; //difficulty selector is named covenant due to old idea
const startButton = document.querySelector('.start');
document.querySelector('.button-higher').disabled = true;
document.querySelector('.button-lower').disabled = true;

//show variables everytime page refreshes
heal.textContent = healingUsage;
hp.value = dealerHealth;

function startFunction() { //gives the dealer a random number
  dealerDamage = Math.floor(Math.random() * 99) + 1;
  dmg.textContent = dealerDamage;
  document.querySelector('.start').disabled = true; //disables the start button
  document.querySelector('.button-higher').disabled = false; //enables the higher button
  document.querySelector('.button-lower').disabled = false; //enables the lower button
  pdmg.textContent = "?"; //gives the player number a ? to avoid confusion of which number is which
}

startButton.addEventListener('click', startFunction);

//player guesses if he is going to get a higher number than dealer
function higher() {
  if (playerHealth > 0) {
  document.querySelector('.screen-prompt').style.opacity = "100"; //screen text pops up
  playerDamage = Math.floor(Math.random() * 99) + 1;
  pdmg.textContent = playerDamage; //changes the numbers on screen
  document.querySelector('.start').disabled = false; //enables the start button
  document.querySelector('.button-higher').disabled = true; //disables the higher button
  document.querySelector('.button-lower').disabled = true; //disables the lower button
  if (playerDamage > dealerDamage) { //checks if player number is higher than dealer number
    onScreenPrompt.textContent = "You hit the dealer (chose higher and got higher)"; //help text on screen
    if (dealerHealth > 0) { //checks if dealer health is 0. If so, win prompt pops up
      dealerHealth = dealerHealth - 100;
      hp.value = dealerHealth;
      if (dealerHealth <= 0) {
        document.querySelector('.win-prompt').style.opacity = "100"; //shows win prompt
        document.querySelector('.win-prompt').style.zIndex = "2"; //prioritizes win prompt
      }
      return dealerHealth;
    }
  } else {
    onScreenPrompt.textContent = "You are hit by the dealer (chose higher but got lower)";
    if (playerHealth > 0) { //checks if player is dead
      playerHealth = playerHealth - dealerHitDamage;
      playerHP.value = playerHealth;
      if (playerHealth <= 0) { //checks if player is dead for the second time. When health = 0, death prompt shows up
        document.querySelector('.lose-prompt').style.opacity = "100";
        document.querySelector('.lose-prompt').style.zIndex = "2";
      }
      return playerHealth;
    }
  }
} else { //last player health check
  document.querySelector('.lose-prompt').style.opacity = "100";
  document.querySelector('.lose-prompt').style.zIndex = "2";
}
}

higherbutton.addEventListener('click', higher);

//player guesses if he gets lower than dealer
function lower() {
  if (playerHealth > 0) {
  document.querySelector('.screen-prompt').style.opacity = "100"; //screen text pops up
  playerDamage = Math.floor(Math.random() * 99) + 1;
  pdmg.textContent = playerDamage; //changes the numbers on screen
  document.querySelector('.start').disabled = false;
  document.querySelector('.button-higher').disabled = true;
  document.querySelector('.button-lower').disabled = true;
  if (playerDamage < dealerDamage) { //checks if player number is lower than dealer number
    onScreenPrompt.textContent = "You hit the dealer (chose lower and got lower)";
    if (dealerHealth > 0) { //checks if dealer health is 0. If so, win prompt pops up
      dealerHealth = dealerHealth - 100;
      hp.value = dealerHealth;
      if (dealerHealth <= 0) {
        document.querySelector('.win-prompt').style.opacity = "100";
        document.querySelector('.win-prompt').style.zIndex = "2";
      }
      return dealerHealth;
    }
  } else {
    onScreenPrompt.textContent = "You are hit by the dealer (chose lower but got higher)";
    if (playerHealth > 0) { //checks if player is dead for the second time. When health = 0, death prompt shows up
      playerHealth = playerHealth - dealerDamage;
      playerHP.value = playerHealth;
      if (playerHealth <= 0) { //second check nessecary for smooth gameplay
        document.querySelector('.lose-prompt').style.opacity = "100";
        document.querySelector('.lose-prompt').style.zIndex = "2";
      }
      return playerHealth;
    }
  }
} else { //final check
  document.querySelector('.lose-prompt').style.opacity = "100";
  document.querySelector('.lose-prompt').style.zIndex = "2";
}
}

lowerbutton.addEventListener('click', lower);

function doHealing() { //heals player
  if (healingUsage > 0) {
    if (playerHealth <= maxPlayerHealth) {
      healingUsage = healingUsage - 1;
      heal.textContent = healingUsage;
      playerHealth = playerHealth + healingAmount;
      if (playerHealth > maxPlayerHealth) { //if health is above max health, it will change to the max and not above
        playerHealth = maxPlayerHealth;
      }
      playerHP.value = playerHealth; //changes progress/health bar according to value of variable
      return playerHealth;
    }
  } else {
    onScreenPrompt.textContent = "You have no healing left";
  }
}

heal.addEventListener('click', doHealing);

function deathScreenReset() {
  document.location.reload(); //reloads the html page
}

deathScreen.addEventListener('click', deathScreenReset);

function selectCovenant() { //difficulty selector is named covenant due to old idea.
    if (document.querySelector('.covenant-select').value === "Covenant1") { //easy mode, changes health and healing back to standard
        selectedCovenant = "Covenant 1";
        healingUsage = 10;
        healingAmount = 180;
        heal.textContent = healingUsage;
        dealerHitDamage = 35;
        maxPlayerHealth = 1000;
        if (playerHealth >= 1000) { //if health is full, than full health will not change
          playerHealth = 1000;
        }
        playerHP.value = playerHealth;
        return playerHealth;
    }
    if (document.querySelector('.covenant-select').value === "Covenant2") { //medium mode, reduces health and healing. Also dealer does more damage
        selectedCovenant = "Covenant 2";
        healingUsage = 7;
        healingAmount = 150;
        heal.textContent = healingUsage;
        maxPlayerHealth = 900;
        dealerHitDamage = 40;
        if (playerHealth >= 900) { //checks if health is 800 or higher, if so, will change health to full.
          playerHealth = 900;
        }
        playerHP.value = playerHealth;
        return playerHealth;
    }
    if (document.querySelector('.covenant-select').value === "Covenant3") { //hard more, more healing and halve health. Dealer does more damage
        selectedCovenant = "Covenant 3";
        healingUsage = 10;
        healingAmount = 200;
        dealerHitDamage = 50;
        heal.textContent = healingUsage;
        maxPlayerHealth = 500;
        if (playerHealth >= 500) {
          playerHealth = 500;
        }
        document.querySelector('.screen-prompt').style.opacity = "100"; //shows help text
        document.querySelector('.covenant-select').disabled = true; //disables the difficulty selector
        onScreenPrompt.textContent = "You chose the hard way, there's no going back"; //help text
        playerHP.value = playerHealth;
        return playerHealth;
    }
    if (document.querySelector('.covenant-select').value === "Covenant4") { //extreme mode, halve health and two healing. same damage as medium mode
      selectedCovenant = "Covenant 4";
      healingUsage = 3;
      heal.textContent = healingUsage;
      dealerHitDamage = 50;
      maxPlayerHealth = 500;
        if (playerHealth >= 500) {
          playerHealth = 500;
        }
        document.querySelector('.screen-prompt').style.opacity = "100"; //shows help text
        document.querySelector('.covenant-select').disabled = true; //disables the difficulty selector
        onScreenPrompt.textContent = "You made a big mistake"; //help text
        playerHP.value = playerHealth;
        return playerHealth;
    }
}

function showUserSettings() { //shows user settings
  document.querySelector('.user-settings-prompt').style.opacity = "100";
  document.querySelector('.user-settings-prompt').style.zIndex = "1";
  document.querySelector('.covenant-select').disabled = false;
}

function hideUserSettings() {
  document.querySelector('.user-settings-prompt').style.opacity = "0";
  document.querySelector('.user-settings-prompt').style.zIndex = "-1";
  document.querySelector('.covenant-select').disabled = true;
}

userIconButton.addEventListener('click', showUserSettings);
crossIconButton.addEventListener('click', hideUserSettings);

function changeName() { //entered name will be displayed above health bar
  playerNameOnHealth.textContent = playerNametag.value;
}

document.querySelector('.covenant-select').disabled = true; //enables difficulty selector each time the page is reloaded
playerNametag.addEventListener('change', changeName);