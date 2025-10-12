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

//making the upgrades data driven
const upgrades = [
  { name: "Pumpkin Seeds", cost: 10, rate: 0.1, count: 0, id: "auto_clicker" },
  { name: "Pumpkin Spice Latte", cost: 100, rate: 2, count: 0, id: "psl" },
  {
    name: "Pumpkin Patch",
    cost: 1000,
    rate: 50,
    count: 0,
    id: "pumpkin_patch",
  },
];

//the counter and rate of pumpkins variables
let counter = 0;
let last_time_stamp = 0;
let incremt_per_second = 0;

//pumpikn button
pumpkin_button.textContent = "🎃";
pumpkin_button.id = "clicker";
document.body.append(pumpkin_button);

//creating the upgrade buttons
upgrades.forEach((upgrade) => {
  const upgradeElement = document.createElement("div");
  upgradeElement.classList.add("upgrade");

  const upgradeButton = document.createElement("button");
  upgradeButton.id = upgrade.id;
  upgradeButton.textContent =
    `Buy ${upgrade.name} - (${upgrade.cost} pumpkins)`;
  upgradeButton.disabled = true;

  const upgradeInfo = document.createElement("span");
  upgradeInfo.id = `${upgrade.id}-count`;
  upgradeInfo.textContent = `Owned: ${upgrade.count}`;

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      incremt_per_second += upgrade.rate;
      upgrade.count++;
      upgrade.cost = Math.round((upgrade.cost * 1.15) * 100) / 100;
      upgradeButton.textContent = `Buy ${upgrade.name} (${
        upgrade.cost.toFixed(2)
      } pumpkins)`;
      console.log(`Bought ${upgrade.name}`);
      counter_display.textContent = Math.floor(counter).toString();
    }
  });

  upgradeElement.appendChild(upgradeButton);
  upgradeElement.appendChild(upgradeInfo);
  document.body.appendChild(upgradeElement);
});

//event listeners for the pumpkin button and the upgrade buttons
pumpkin_button.addEventListener("click", () => {
  incrementClick();
});

// the function that increments the counter when the pumpkin button is clicked
function incrementClick() {
  counter++;
  document.getElementById("counter")!.textContent = counter.toString();
  console.log("Button clicked", counter);
}

//step 4 - animation loop

function animattion_loop(timeStamp: number) {
  if (!last_time_stamp) {
    last_time_stamp = timeStamp;
    requestAnimationFrame(animattion_loop);
    return;
  }

  const delta = timeStamp - last_time_stamp;
  incremt_per_second = upgrades.reduce(
    (total, upgrade) => total + upgrade.count * upgrade.rate,
    0,
  );
  //const incremt_per_second = (upgrades[0].count * upgrades[0].rate) +
  //  (upgrades[1].count * upgrades[1].rate) +
  //  (upgrades[2].count * upgrades[2].rate);
  //const increment = (delta / 1000) * incremt_per_second;

  counter += (incremt_per_second * delta) / 1000;
  counter_display.textContent = Math.floor(counter).toString();
  rate_of_pumpkins.textContent = incremt_per_second.toFixed(1) +
    " pumpkins per second";

  //update the number of upgrades owned
  upgrades.forEach((upgrade) => {
    const upgradeButton = document.getElementById(
      upgrade.id,
    ) as HTMLButtonElement;
    const upgradeInfo = document.getElementById(`${upgrade.id}-count`);

    upgradeButton.disabled = counter < upgrade.cost;
    upgradeInfo!.textContent = `Owned: ${upgrade.count}`;
  });

  last_time_stamp = timeStamp;
  requestAnimationFrame(animattion_loop);
}

requestAnimationFrame(animattion_loop);
