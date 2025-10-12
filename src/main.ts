//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
import "./style.css";

//had some help from Gemini to clean up/understand the HYML style section
//created a counter area, then an instructions area
//then the buttons will be added via type script
document.body.innerHTML = `
  <div class = "game-container">
    <div class="counter-area">
      <p><span id="counter">0</span> pumpkins</p>
      <p id="rate-of-pumpkins">0.0 pumpkins per second</p>
      </div>

    <div class="instructions">
      <p>Click the pumpkin to earn pumpkins!</p>
      <p>Use pumpkins to buy upgrades below.</p>
    </div>
    
  </div>
`;

//section project - interactivity
console.log("herro");
console.log(" 'ello ");

//the pumpkin button and display for counter and rate of pumpkins
const pumpkin_button = document.createElement("button");
const rate_of_pumpkins = document.getElementById("rate-of-pumpkins")!;
const counter_display = document.getElementById("counter")!;

//the update/buy buttons
const pumpkin_seed_buyer = document.createElement("button");
const psl_buyer = document.createElement("button");
const pumpikn_pach = document.createElement("button");

//the counter and rate of pumpkins variables
let counter = 0;
let last_time_stamp = 0;
let incremt_per_second = 0;

//starting upgrade price variables
let seed_price = 10;
let psl_price = 100;
let pumpkin_patch_price = 1000;

//pumpikn button
pumpkin_button.textContent = "🎃";
pumpkin_button.id = "clicker";
document.body.append(pumpkin_button);

//buy clicker button - auto clicker
pumpkin_seed_buyer.textContent = "Buy Pumpkin Seeds (" + seed_price +
  " pumpkins)";
pumpkin_seed_buyer.id = "clicker_buyer";
pumpkin_seed_buyer.disabled = true;
document.body.append(pumpkin_seed_buyer);

//buy pls button - pumpkin spice latte auto clicker
psl_buyer.textContent = "Buy a Pumpkin Spice Latte (" + psl_price +
  " pumpkins)";
psl_buyer.id = "pls_buyer";
psl_buyer.disabled = true;
document.body.append(psl_buyer);

//buy a pumpkin patch button
pumpikn_pach.textContent = "Buy a Pumpkin Patch (" + pumpkin_patch_price +
  " pumpkins)";
pumpikn_pach.id = "pumpkin_patch_buyer";
pumpikn_pach.disabled = true;
document.body.append(pumpikn_pach);

//event listeners for the pumpkin button and the upgrade buttons
pumpkin_button.addEventListener("click", () => {
  incrementClick();
});

//buy clicker button event listener

//auto clicker adds 0.1 pumpkins per second
pumpkin_seed_buyer.addEventListener("click", () => {
  if (counter >= seed_price) {
    counter -= seed_price;
    incremt_per_second += 0.1;
    seed_price = Math.round((seed_price * 1.15) * 100) / 100;
    pumpkin_seed_buyer.textContent = "Buy Pumpkin Seeds (" +
      seed_price.toFixed(2) +
      " pumpkins)";
    console.log("Bought Clicker");
    counter_display.textContent = Math.floor(counter).toString();
  }
});

//buy psl button event listener
//psl auto clicker adds 2 pumpkins per second
psl_buyer.addEventListener("click", () => {
  if (counter >= psl_price) {
    counter -= psl_price;
    incremt_per_second += 2;
    psl_price = Math.round((psl_price * 1.15) * 100) / 100;
    psl_buyer.textContent = "Buy a Pumpkin Spice Latte (" +
      psl_price.toFixed(2) +
      " pumpkins)";
    console.log("Bought Pumpkin Spice Latte");
    counter_display.textContent = Math.floor(counter).toString();
  }
});

//buy pumpkin patch button event listener
//pumpkin patch auto clicker adds 50 pumpkins per second
pumpikn_pach.addEventListener("click", () => {
  if (counter >= pumpkin_patch_price) {
    counter -= pumpkin_patch_price;
    incremt_per_second += 50;
    pumpkin_patch_price = Math.round((pumpkin_patch_price * 1.15) * 100) / 100;
    pumpikn_pach.textContent = "Buy a Pumpkin Patch (" +
      pumpkin_patch_price.toFixed(2) +
      " pumpkins)";
    console.log("Bought Pumpkin Patch");
    counter_display.textContent = Math.floor(counter).toString();
  }
});

// the function that increments the counter when the pumpkin button is clicked
function incrementClick() {
  counter++;
  document.getElementById("counter")!.textContent = counter.toString();
  console.log("Button clicked", counter);

  //check if the counter is enough to buy upgrades
  //enable buttons if enough counter
  if (counter >= seed_price) {
    pumpkin_seed_buyer.disabled = false;
  }
  if (counter >= psl_price) {
    psl_buyer.disabled = false;
  }
  if (counter >= pumpkin_patch_price) {
    pumpikn_pach.disabled = false;
  }
}

//step 4 - animation loop

function animattion_loop(timeStamp: number) {
  if (!last_time_stamp) {
    last_time_stamp = timeStamp;
    requestAnimationFrame(animattion_loop);
    return;
  }

  const delta = timeStamp - last_time_stamp;
  const increment = (delta / 1000) * incremt_per_second;

  counter += increment;
  counter_display.textContent = Math.floor(counter).toString();
  rate_of_pumpkins.textContent = incremt_per_second.toFixed(1) +
    " pumpkins per second";

  //check if the counter is enough to buy upgrades
  //disable buttons if not enough counter, enable if enough counter
  if (counter < seed_price) {
    pumpkin_seed_buyer.disabled = true;
  } else {
    pumpkin_seed_buyer.disabled = false;
  }
  if (counter < psl_price) {
    psl_buyer.disabled = true;
  } else {
    psl_buyer.disabled = false;
  }
  if (counter < pumpkin_patch_price) {
    pumpikn_pach.disabled = true;
  } else {
    pumpikn_pach.disabled = false;
  }

  last_time_stamp = timeStamp;
  requestAnimationFrame(animattion_loop);
}

requestAnimationFrame(animattion_loop);
