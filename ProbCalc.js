document.addEventListener("DOMContentLoaded", function () {
  // Function to calculate the sum of dice results

  // Attach event listeners to the buttons (sum and dice combinations)
  document.getElementById("sumButton").addEventListener("click", () => {
    //Get values from document
    const dice = document.getElementById("numDice").value;
    const sides = document.getElementById("numSides").value;
    const sum = document.getElementById("sum").value;
    start();
    result = formatNumber(sumProbability(dice, sides, sum));
    document.getElementById("sumAnswer").textContent =
      "Probability of getting the total: " + result + " %";

    logElapsedTime();
    stop();
    reset();
  });

  document.getElementById("indivButton").addEventListener("click", () => {
    //Get values from document
    const dice = document.getElementById("numDice").value;
    const sides = document.getElementById("numSides").value;
    const inputs = document.querySelectorAll("#inputs-container input");
    const values = [];
    inputs.forEach((input) => {
      if (input.value) values.push(input.value);
    });

    result = formatNumber(indivProbability(dice, sides, values));
    document.getElementById("indivAnswer").textContent =
      "Probability for getting specific combination: " + result + " %";
  });
});

function calculateSum() {
  const sumInput = document.getElementById("sum").value;
  const sumAnswer = document.getElementById("sumAnswer");
  if (sumInput) {
    sumAnswer.textContent = "Answer: " + sumInput;
  } else {
    sumAnswer.textContent = "Answer: Please enter a valid sum.";
  }
}

// Function to calculate the dice combinations
function probability(desResult, posResult) {
  let result = (desResult / posResult) * 100;
  return result;
}

//SUM PROBABILITY CALCULATOR
function sumProbability(dn, ds, sum) {
  // Helper function to calculate all possible combinations recursively
  function countCombinations(dn, sum, sides) {
    if (dn === 0) {
      return sum === 0 ? 1 : 0;
    }
    let count = 0;
    for (let i = 1; i <= sides; i++) {
      count += countCombinations(dn - 1, sum - i, sides);
    }
    return count;
  }

  // Calculate the number of possible rolls resulting in the sum
  let desres = countCombinations(dn, sum, ds);

  // Calculate the number of all possible rolls
  let totalPossibleRolls = Math.pow(ds, dn);

  // Call the provided probability function
  return probability(desres, totalPossibleRolls);
}

//COMBINATION PROBABILITY CALCULATOR
function indivProbability(dn, ds, subset) {
  let count = 0;

  // Helper function to roll the dice and check the subset
  function rollDice(dn, result) {
    // Base case: If we have rolled all the dice, check the result
    if (dn === 0) {
      if (containsSubset(result, subset)) {
        count++;
      }
      return;
    }

    // Try all sides of the dice for the current roll
    for (let i = 1; i <= ds; i++) {
      rollDice(dn - 1, [...result, i]);
    }
  }

  // Total possible rolls
  let totalCount = Math.pow(ds, dn);

  // Start rolling the dice
  rollDice(dn, []);

  // Calculate and return the probability
  return probability(count, totalCount);
}

// containsSubset checks if result contains all elements of the subset
function containsSubset(result, subset) {
  // Create a frequency map for both result and subset
  let resultCount = {};

  for (let val of result) {
    resultCount[val] = (resultCount[val] || 0) + 1;
  }

  for (let val of subset) {
    // If an element in subset is missing or occurs less often in result, return false
    if (!resultCount[val] || resultCount[val] === 0) {
      return false;
    }
    resultCount[val]--;
  }

  return true;
}

function formatNumber(value) {
  if (value === 0) {
    return "0"; // Display zero as "0"
  }
  if (Math.abs(value) < 0.01) {
    return value.toExponential(2); // Use scientific notation for very small values
  }
  return value.toFixed(2); // Use standard decimal format otherwise
}

let startTime,
  elapsedTime = 0,
  intervalId;

// Function to format and log elapsed time to the console
function logElapsedTime() {
  const time = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(time / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = (time % 1000).toString().padStart(3, "0"); // Get milliseconds and pad to 3 digits

  console.log(`Elapsed time: ${hours}:${minutes}:${seconds}.${milliseconds}`);
}

// Start the stopwatch
function start() {
  if (!intervalId) {
    startTime = Date.now();
    intervalId = setInterval(logElapsedTime, 1000); // Log elapsed time every second
    console.log("Stopwatch started");
  }
}

// Stop the stopwatch
function stop() {
  if (intervalId) {
    clearInterval(intervalId);
    elapsedTime += Date.now() - startTime;
    intervalId = null;
    console.log("Stopwatch stopped");
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(intervalId);
  intervalId = null;
  elapsedTime = 0;
  console.log("Stopwatch reset to 00:00:00");
}
