let savedUsername = "";
let savedPin = "";

const bankAccount = {                                                                         
  balance: 0,
  transactions: [],

  deposit(amount) {
    if (amount <= 0) {
      alert("Deposit amount must be greater than 0!");
      return;
    }
    this.balance += amount;
    this.transactions.push(`Deposited: $${amount}`);
    this.update();
  },

  withdraw(amount) {
    if (amount <= 0) {
      alert("Withdrawal amount must be greater than 0!");
      return;
    }
    if (amount > this.balance) {
      alert("Insufficient funds!");
      return;
    }
    this.balance -= amount;
    this.transactions.push(`Withdrew: $${amount}`);
    this.update();
  },

  update() {
    document.querySelector("#balance").innerText = this.balance;
    this.updateHistory();
  },

  updateHistory() {
    const historyList = document.querySelector("#transaction-history");
    historyList.innerHTML = "";
    this.transactions.forEach((transaction) => {
      const li = document.createElement("li");
      li.textContent = transaction;
      historyList.appendChild(li);
    });
  }
};

// düyme klikledikde müeyyen sahelerden melumatları toplayıb, çagırılan funksiyaya ötürmekdir.
function handleFormSubmit(buttonSelector, inputSelectors, callback) {
  document.querySelector(buttonSelector).addEventListener("click", () => {
    const inputs = inputSelectors.map(selector => document.querySelector(selector).value.trim());
    callback(...inputs);
  });
}

// Sign-up Logic
handleFormSubmit("#signup-btn", ["#signup-username", "#signup-pin"], (username, pin) => {
  if (username === "" || pin.length !== 4) {
    alert("Username cannot be empty and PIN must be 4 digits!");
    return;
  }

  savedUsername = username;
  savedPin = pin;

  document.querySelector("#signup-msg").textContent = "Account created successfully!";
  setTimeout(() => {
    document.querySelector("#signup-section").style.display = "none";
    document.querySelector("#login-section").style.display = "block";
  }, 1000);
});

// Login Logic
handleFormSubmit("#login-btn", ["#login-username", "#login-pin"], (username, pin) => {
  const errorMsg = document.querySelector("#error-msg");

  if (username === savedUsername && pin === savedPin) {
    document.querySelector("#login-section").style.display = "none";
    document.querySelector("#app-section").style.display = "block";
    document.querySelector("#user-display").innerText = savedUsername;
  } else {
    errorMsg.textContent = "Incorrect Username or PIN! Please try again.";
  }
});

// Deposit ve Withdraw Events
["#deposit-btn", "#withdraw-btn"].forEach(selector => {
  document.querySelector(selector).addEventListener("click", () => {
    const amount = parseFloat(document.querySelector("#amount").value);
    if (selector === "#deposit-btn") {
      bankAccount.deposit(amount);
    } else {
      bankAccount.withdraw(amount);
    }
    document.querySelector("#amount").value = "";
  });
});
