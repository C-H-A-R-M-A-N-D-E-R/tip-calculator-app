// Variables.
const bill = document.querySelector("#bill");
const custom = document.querySelector("#custom");
const people = document.querySelector("#people");
const tipButton = document.querySelectorAll(".grid__tip");
const resetButton = document.querySelector(".grid__reset");
const warning = document.querySelector(".grid__warning");
let [billValue, tipValue, peopleValue] = [0, 0, 0];

// Event Listeners.
bill.addEventListener("input", (e) => {
  if (isHavePeoople()) {
    showWarning();
  }

  billValue = parseFloat(e.target.value);
  enabledResetButton();
  computeAmount();
});

custom.addEventListener("input", (e) => {
  if (isHavePeoople()) {
    showWarning();
  }

  tipValue = parseFloat(e.target.value) / 100;
  enabledResetButton();
  computeAmount();
});

people.addEventListener("input", (e) => {
  if (isHavePeoople()) {
    showWarning();
  } else {
    hideWarning();
  }

  peopleValue = +e.target.value;
  enabledResetButton();
  computeAmount();
});

tipButton.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    if (isHavePeoople()) {
      showWarning();
    }

    tipValue = parseFloat(e.target.value) / 100;
    enabledResetButton();
    removeActive();
    setActive(e.target);
    computeAmount();
  });
});

resetButton.addEventListener("click", (e) => {
  disabledResetButton();
  hideWarning();
  removeActive();
  resetAmounts();
});

// Functions.
const enabledResetButton = () => {
  resetButton.removeAttribute("disabled");
};

const disabledResetButton = () => {
  resetButton.setAttribute("disabled", "");
  bill.value = "";
  custom.value = "";
  people.value = "";
};

const showWarning = () => {
  warning.removeAttribute("hidden");
  people.style.border = "3px solid hsl(18, 68%, 56%)";
};

const hideWarning = () => {
  warning.setAttribute("hidden", "");
  people.style.border = "none";
};

const isHavePeoople = () => {
  return people.value <= 0 || people.value === "";
};

const setActive = (tip) => {
  tip.classList.add("active");
};

const removeActive = () => {
  tipButton.forEach((tip) => tip.classList.remove("active"));
};

const resetAmounts = () => {
  [billValue, tipValue, peopleValue] = [0, 0, 0];
  const tipAmount = document.querySelector(".tip-amount");
  const totalAmount = document.querySelector(".total-amount");

  tipAmount.textContent = `$0.00`;
  totalAmount.textContent = `$0.00`;
};

const computeAmount = () => {
  const tipAmount = document.querySelector(".tip-amount");
  const totalAmount = document.querySelector(".total-amount");
  const isAllInputValid =
    +billValue <= 0 || +tipValue <= 0 || +peopleValue <= 0;

  if (!isAllInputValid) {
    const perPerson = billValue / peopleValue;
    const tip = perPerson * tipValue;
    const total = perPerson + tip;

    tipAmount.textContent = `$${Math.floor(tip * 100) / 100}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
};

const computeTotalAmout = () => {};
