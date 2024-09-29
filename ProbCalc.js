document.addEventListener("DOMContentLoaded", function () {
  // Function to calculate the sum of dice results

  // Attach event listeners to the buttons (sum and dice combinations)
  document.getElementById("sumButton").addEventListener("click", () => {
    const dn = document.getElementById("numDice").value;
    const ds = document.getElementById("numSides").value;
    const sum = document.getElementById("sum").value;

    //totalResults = rollDice2(dn, ds);
    // posResult = sumRes(totalResults, sum);
    // resProb = probability(posResult, totalResults.length);
    // let results = rollDiceAndCount(dn, ds, sum);
    //resProb = probability(results.valid, results.count);
    console.log(dn);
    console.log(ds);
    console.log(sum);
    // console.log(posResult);
    result = OsumProbability(dn, ds, sum);
    document.getElementById("sumAnswer").textContent =
      "Probability of getting the total: " + result + " %";
  });

  document.getElementById("indivButton").addEventListener("click", () => {
    const dn = document.getElementById("numDice").value;
    const ds = document.getElementById("numSides").value;
    const inputs = document.querySelectorAll("#inputs-container input");
    const values = [];

    inputs.forEach((input) => {
      if (input.value) values.push(input.value);
    });
    console.log(values);
    result = OindivProbability(dn, ds, values);
    // totalResults = rollDice(dn, ds, [], []);
    // posResults = indivRes(values, totalResults);
    // resProb = probability(posResults, totalResults.length);
    // console.log(values);
    // console.log(values.length);
    // console.log(dn);
    // console.log(ds);
    // console.log(resProb);
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

//SUMRESULT
function OsumProbability(dn, ds, sum) {
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

function OindivProbability(dn, ds, subset) {
  let count = 0;

  // Helper function to roll the dice and check the subset
  function rollDiceHelper(dn, result) {
    // Base case: If we have rolled all the dice, check the result
    if (dn === 0) {
      if (containsSubset(result, subset)) {
        count++;
      }
      return;
    }

    // Try all sides of the dice for the current roll
    for (let i = 1; i <= ds; i++) {
      rollDiceHelper(dn - 1, [...result, i]);
    }
  }

  // Total possible rolls
  let totalCount = Math.pow(ds, dn);

  // Start rolling the dice
  rollDiceHelper(dn, []);

  // Calculate and return the probability
  return (count / totalCount) * 100;
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
//~++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

function rollDice(dn, ds, result = [], results = []) {
  // Base case: If we have rolled all the dice, append the result
  if (dn === 0) {
    results.push([...result]);
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
  return validCombinations.length;
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
  return validResults.length;
}
