console.log("Hello World! I Don't Give a Bug");

let result = probability(9, 20);
console.log(result);

let rolls = rollDice(3, 6);

let totaloutcome = sumRes(rolls, 10);
console.log(totaloutcome);

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
    if (sum === target) {
      validCombinations.push(result);
    }
  }

  console.log(`Combinations that total the target ${target}:`);
  for (let result of validCombinations) {
    console.log(result);
  }

  return validCombinations.length;
}
