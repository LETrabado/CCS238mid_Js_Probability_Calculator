console.log("Hello World! I Don't Give a Bug");
document.addEventListener("DOMContentLoaded", function () {
  // Function to calculate the sum of dice results

  // Attach event listeners to the buttons (sum and dice combinations)
  document.getElementById("sumButton").addEventListener("click", () => {
    const dn = document.getElementById("numDice").value;
    const ds = document.getElementById("numSides").value;
    const sum = document.getElementById("sum").value;

    totalResults = rollDice(dn, ds, [], []);
    posResult = sumRes(totalResults, sum);
    resProb = probability(posResult, totalResults.length);
    console.log(dn);
    console.log(ds);
    console.log(sum);
    console.log(posResult);
    document.getElementById("sumAnswer").textContent =
      "Probability of getting the total: " + resProb;
  });

  document.getElementById("indivButton").addEventListener("click", () => {
    const dn = document.getElementById("numDice").value;
    const ds = document.getElementById("numSides").value;
    const inputs = document.querySelectorAll("#inputs-container input");
    const values = [];

    inputs.forEach((input) => {
      if (input.value) values.push(input.value);
    });

    totalResults = rollDice(dn, ds, [], []);
    posResults = indivRes(values, totalResults);
    resProb = probability(posResults, totalResults.length);
    console.log(values);
    console.log(values.length);
    console.log(dn);
    console.log(ds);
    console.log(resProb);
    document.getElementById("indivAnswer").textContent =
      "Probability for getting specific combination: " + resProb;
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

function rollDice(dn, ds, result = [], results = []) {
  // Base case: If we have rolled all the dice, append the result
  if (dn === 0) {
    results.push([...result]); // Push a copy of the current result
    return results;
  }

  // Try all sides of the dice for the current roll
  for (let i = 1; i <= ds; i++) {
    rollDice(dn - 1, ds, [...result, i], results);
  }

  return results;
}

function sumRes(results, target) {
  let validCombinations = [];
  // Iterate over all the results and calculate the sum
  for (let result of results) {
    let sum = result.reduce((acc, num) => acc + num, 0);
    // If the sum equals the target, add the result to the valid combinations
    if (sum == target) {
      validCombinations.push(result);
    }
  }

  console.log(`Combinations that total the target ${target}:`);
  for (let result of validCombinations) {
    console.log(result);
  }

  return validCombinations.length;
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

// INDIVIDUAL OUTCOME
function indivRes(desRes, allRes) {
  // Array to store results that contain the subset
  let validResults = [];

  // Check which combinations contain the subset and store them
  for (let result of allRes) {
    if (containsSubset(result, desRes)) {
      validResults.push(result);
    }
  }

  console.log(
    `Combinations that contain the subset ${JSON.stringify(desRes)}:`
  );
  for (let result of validResults) {
    console.log(result);
  }

  return validResults.length;
}
