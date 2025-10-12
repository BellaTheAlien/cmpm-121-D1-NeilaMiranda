//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
import "./style.css";

//had some help from Gemini to clean up/understand the HYML style section
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

//the buttons and displays
const pumpkin_button = document.createElement("button");
const rate_of_pumpkins = document.getElementById("rate-of-pumpkins")!;
const counter_display = document.getElementById("counter")!;

//the update/buy buttons
const clicker_buyer = document.createElement("button");
const psl_buyer = document.createElement("button");
const pumpikn_pach = document.createElement("button");


let counter = 0;
let last_time_stamp = 0;
let incremt_per_second = 0;

//pumpikn button
pumpkin_button.textContent = "🎃";
pumpkin_button.id = "clicker";
document.body.append(pumpkin_button);

//buy clicker button
clicker_buyer.textContent = "Buy Pumpkin Seeds (10 pumpkins)";
clicker_buyer.id = "clicker_buyer";
clicker_buyer.disabled = true;
document.body.append(clicker_buyer);

//buy pls button
psl_buyer.textContent = "Buy a Pumpkin Spice Latte (100 pumpkins)";
psl_buyer.id = "pls_buyer";
psl_buyer.disabled = true;
document.body.append(psl_buyer);

//but a pumpkin patch button
pumpikn_pach.textContent = "Buy a Pumpkin Patch (1000 pumpkins)";
pumpikn_pach.id = "pumpkin_patch_buyer";
pumpikn_pach.disabled = true;
document.body.append(pumpikn_pach);

pumpkin_button.addEventListener("click", () => {
  incrementClick();
});

clicker_buyer.addEventListener("click", () => {
  counter -= 10;
  incremt_per_second += 0.1;
  console.log("Bought Clicker");
  counter_display.textContent = Math.floor(counter).toString();
});

psl_buyer.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    incremt_per_second += 2;
    console.log("Bought Pumpkin Spice Latte");
    counter_display.textContent = Math.floor(counter).toString();
  }
});

pumpikn_pach.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    incremt_per_second += 50;
    console.log("Bought Pumpkin Patch");
    counter_display.textContent = Math.floor(counter).toString();
  }
});

function incrementClick() {
  counter++;
  document.getElementById("counter")!.textContent = counter.toString();
  console.log("Button clicked", counter);

  if (counter >= 10) {
    clicker_buyer.disabled = false;
  }
  if (counter >= 100) {
    psl_buyer.disabled = false;
  }
  if (counter >= 1000) {
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
  rate_of_pumpkins.textContent = incremt_per_second.toFixed(1) + " pumpkins per second";

  if (counter < 10) {
    clicker_buyer.disabled = true;
  } else {
    clicker_buyer.disabled = false;
  }
  if (counter < 100) {
    psl_buyer.disabled = true;
  } else {
    psl_buyer.disabled = false;
  }
  if (counter < 1000) {
    pumpikn_pach.disabled = true;
  } else {
    pumpikn_pach.disabled = false;
  }

  //document.getElementById("counter")!.textContent = Math.floor(counter).toString();

  last_time_stamp = timeStamp;
  requestAnimationFrame(animattion_loop);
}

requestAnimationFrame(animattion_loop);
