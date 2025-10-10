//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
import "./style.css";

document.body.innerHTML = `
  
  <div class = "myCounter">
    <p>Counter: <span id="counter">0</span> pumpkins</p>
  </div>
`;
//section project - interactivity
console.log("herro");
console.log(" 'ello ");

const pumpkin_button = document.createElement("button");
const clicker_buyer = document.createElement("button");
const psl_buyer = document.createElement("button");
const counter_display = document.getElementById("counter")!;

let counter = 0;
let last_time_stamp = 0;
let incremt_per_second = 0;

//pumpikn button
pumpkin_button.textContent = "🎃";
pumpkin_button.id = "clicker";
document.body.append(pumpkin_button);

//buy clicker button
clicker_buyer.textContent = "Buy Clicker (10 pumpkins)";
clicker_buyer.id = "clicker_buyer";
clicker_buyer.disabled = true;
document.body.append(clicker_buyer);

//buy pls button
psl_buyer.textContent = "Buy a Pumpkin Spice Latte (100 pumpkins)";
psl_buyer.id = "pls_buyer";
psl_buyer.disabled = true;
document.body.append(psl_buyer);

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

  //document.getElementById("counter")!.textContent = Math.floor(counter).toString();

  last_time_stamp = timeStamp;
  requestAnimationFrame(animattion_loop);
}

requestAnimationFrame(animattion_loop);
