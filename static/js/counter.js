// DOM manipulation Functions
const animateValue = async (obj, end, button) => {
  obj.innerHTML = (1).toFixed(2) + "×";
  setButtonValue(button, "cashout");
  await sleep(5000);
  for (let i = 1; i <= (end - 1) * 100; i++) {
    await sleep((1 / (0.2 * i + 1)) * 1000);
    obj.innerHTML = (1 + i / 100.0).toFixed(2) + "×";
  }
  obj.style.color = "#C41E3A";
  document.getElementById("bet-amount").value = "";
  resetShipAnimation();
  setButtonValue(button, "run");
};

//Helper Functions
// Sleep for X amount of time
// TODO/HACK: Find an alternative
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const setButtonValue = (obj, val) => {
  obj.name = val;
  obj.innerHTML = val;
};

let currBet = 0;

function runSim() {
  const runButton = document.getElementById("runSimButton");
  const betAmount = document.getElementById("bet-amount");
  const bank = document.getElementById("bank-val");

  if (runButton.name === "cashout") {
    cashout(betAmount, bank);
    setButtonValue(runButton, "cashed out");
    return;
  }

  if (runButton.name === "cashed out") {
    displayAlert("Crash is Running.", "Please wait for the round to end");
    return;
  }

  if (
    betAmount.value == "" ||
    betAmount.value <= 0 ||
    betAmount.value > parseFloat(bank.innerHTML)
  ) {
    displayAlert("Invalid.", "Please Enter a Valid Bet Amount");
    return;
  }
  currBet = betAmount.value;
  bank.innerHTML = (bank.innerHTML - currBet).toFixed(2);
  const multiplier = document.getElementById("counter");
  multiplier.style.color = "rgba(199, 210, 254)";

  getFactor(
    document.getElementById("init-crash").value,
    document.getElementById("growth-rate").value,
    multiplier,
    runButton
  );
}

const cashout = (bet, bank) => {
  const mult = parseFloat(document.getElementById("counter").innerHTML);
  displayAlert(
    "Cashed out at " +
      parseFloat(document.getElementById("counter").innerHTML) +
      "x.",
    "Gained " + (parseFloat(currBet) * mult).toFixed(2) + " Space Coins"
  );
  bank.innerText = (
    parseFloat(bank.innerText) +
    parseFloat(currBet) * mult
  ).toFixed(2);
  bet.value = "";
};

const getFactor = (div, g, mult, button) => {
  if (div === "") div = 33;
  if (g === "") g = 1;
  axios
    .get("/crash?div=" + div + "&g=" + g)
    .then((response) => {
      startShipAnimation();
      animateValue(mult, Math.round(response.data * 100) / 100, button);
    })
    .catch((error) => {
      console.log(error);
    });
};
