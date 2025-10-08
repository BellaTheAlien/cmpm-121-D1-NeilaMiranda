import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <div class = "myCounter">
    <p>Counter: <span id="counter">0</span> pumpkins</p>
  </div>
`;
//section project - interactivity
console.log("herro");
console.log(" 'ello ");

const button = document.createElement("button");
let counter = 0;
//setInterval(incrementClick, 1000);
button.textContent = "🎃";
button.id = "clicker";
document.body.append(button);

button.addEventListener("click", () => {
  incrementClick();
});

function incrementClick() {
  counter++;
  document.getElementById("counter")!.textContent = counter.toString();
  console.log("Button clicked", counter);
}

//step 4 - animation loop
let lastTime = 0;
const incremtPerSecond = 1;

function animate(timeStamp: number) {
  if (!lastTime) {
    lastTime = timeStamp;
    requestAnimationFrame(animate);
    return;
  }

  const delta = timeStamp - lastTime;
  const increment = (delta / 1000) * incremtPerSecond;

  counter += increment;
  document.getElementById("counter")!.textContent = Math.floor(counter)
    .toString();
  lastTime = timeStamp;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
