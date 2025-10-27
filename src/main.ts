import "./style.css";

// had some help from Gemini to clean up/understand the HYML style section
// created a counter area, then an instructions area
// then the buttons will be added via type script

// -- section off UI elements --

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

    <div id="upgrades-area"></div>
    
  </div>
`;

// section project - interactivity
console.log("herro");
console.log(" 'ello ");

// -- Creating the UI elements for the style.css --

// the pumpkin button and display for counter and rate of pumpkins
const pumpkinButton = document.createElement("button");
const pumpkinsPerSecDisplay = document.getElementById("rate-of-pumpkins")!;
const counterDisplay = document.getElementById("counter")!;
const upgradesArea = document.getElementById("upgrades-area")!;

// -- the ungrade buttons elements --
const upgrades = [
  {
    name: "Pumpkin Seeds",
    cost: 10,
    rate: 0.1,
    count: 0,
    id: "auto_clicker",
    description: "A pack of seeds. The first sprouts of the season",
  },
  {
    name: "Pumpkin Spice Latte",
    cost: 100,
    rate: 2,
    count: 0,
    id: "psl",
    description:
      "A delicious drink. Don't have too much or you'll turn into a pumpkin.",
  },
  {
    name: "Pumpkin Patch",
    cost: 1000,
    rate: 50,
    count: 0,
    id: "pumpkin_patch",
    description: "A small patch of pumpkins. Where the pumpkin king lives.",
  },
  {
    name: "Pumpkin Cake",
    cost: 5000,
    rate: 200,
    count: 0,
    id: "pumpkin_cake",
    description: "A sweet and most pumpkin cake, great fuel for the king.",
  },
  {
    name: "Pumpkin Soup",
    cost: 10000,
    rate: 500,
    count: 0,
    id: "pumpkin_soup",
    description: "A hearty bowl of pumpkin soup, the king's favorite.",
  },
];

// the counter and rate of pumpkins variables
let counter = 0;
let lastTimeStamp = 0;
let incremtPerSecond = 0;

// pumpikn button
pumpkinButton.textContent = "🎃";
pumpkinButton.id = "clicker";
document.body.append(pumpkinButton);

// -- The events listeners for the buttons when clicked --

// creating the upgrade buttons
upgrades.forEach((upgrade) => {
  //create a div to hold the upgrade button and info
  const upgradeElement = document.createElement("div");
  upgradeElement.classList.add("upgrade");

  //create the upgrade button
  const upgradeButton = document.createElement("button");
  upgradeButton.id = upgrade.id;
  upgradeButton.textContent = `Buy ${upgrade.name} (${upgrade.cost} pumpkins)`;
  upgradeButton.disabled = true;

  //create the upgrade description
  const upgradeDescription = document.createElement("p");
  upgradeDescription.textContent = upgrade.description;
  upgradeElement.appendChild(upgradeDescription);

  //create the upgrade info
  const upgradeInfo = document.createElement("span");
  upgradeInfo.id = `${upgrade.id}-count`;
  upgradeInfo.textContent = `Owned: ${upgrade.count}`;

  //event listener for the upgrade button
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      incremtPerSecond += upgrade.rate;
      upgrade.count++;
      upgrade.cost = Math.round((upgrade.cost * 1.15) * 100) / 100;
      upgradeButton.textContent = `Buy ${upgrade.name} (${
        upgrade.cost.toFixed(2)
      } pumpkins)`;
      console.log(`Bought ${upgrade.name}`);
      counterDisplay.textContent = Math.floor(counter).toString();
    }
  });

  upgradeElement.appendChild(upgradeButton);
  upgradeElement.appendChild(upgradeInfo);
  document.body.appendChild(upgradeElement);
  upgradesArea.appendChild(upgradeElement);
});

// event listeners for the pumpkin button and the upgrade buttons
pumpkinButton.addEventListener("click", () => {
  incrementClick();
});

// the function that increments the counter when the pumpkin button is clicked
function incrementClick() {
  counter++;
  document.getElementById("counter")!.textContent = counter.toString();
  console.log("Button clicked", counter);
}

// -- Animation loop / Game loop --

function animattion_loop(timeStamp: number) {
  if (!lastTimeStamp) {
    lastTimeStamp = timeStamp;
    requestAnimationFrame(animattion_loop);
    return;
  }

  const delta = timeStamp - lastTimeStamp;
  incremtPerSecond = upgrades.reduce(
    (total, upgrade) => total + upgrade.count * upgrade.rate,
    0,
  );
  //const incremt_per_second = (upgrades[0].count * upgrades[0].rate) +
  //  (upgrades[1].count * upgrades[1].rate) +
  //  (upgrades[2].count * upgrades[2].rate);
  //const increment = (delta / 1000) * incremt_per_second;

  counter += (incremtPerSecond * delta) / 1000;
  counterDisplay.textContent = Math.floor(counter).toString();
  pumpkinsPerSecDisplay.textContent = incremtPerSecond.toFixed(1) +
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

  lastTimeStamp = timeStamp;
  requestAnimationFrame(animattion_loop);
}

requestAnimationFrame(animattion_loop);
