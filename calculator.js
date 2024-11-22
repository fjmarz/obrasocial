const pricingTable = {
  "2-210": { "Up to 27": [101257, 202514, 67218, 30334, 274761], "28 to 35": [151912, 264766, 67218, 30334, 274761], "36+": [208596, 352554, 67218, 30334, 274761] },
  "2-310": { "Up to 27": [132383, 264766, 88944, 35015, 354872], "28 to 35": [197846, 395692, 88944, 35015, 354872], "36+": [269748, 523818, 88944, 35015, 354872] },
  "2-410": { "Up to 27": [176277, 352554, 115869, 46097, 485283], "28 to 35": [261909, 523818, 115869, 46097, 485283], "36+": [368934, 612806, 115869, 46097, 485283] },
  "2-450": { "Up to 27": [266789, 533578, 155898, 89913, 629942], "28 to 35": [398920, 797840, 155898, 89913, 629942], "36+": [603521, 947404, 155898, 89913, 629942] },
  "2-510": { "Up to 27": [436543, 873086, 272495, 136478, 983150], "28 to 35": [660843, 1321686, 272495, 136478, 983150], "36+": [957513, 1564227, 272495, 136478, 983150] }
};

function calculate() {
  const plan = document.getElementById("plan").value;
  const ageGroup = document.getElementById("ageGroup").value;
  const marriage = document.getElementById("marriage").value;
  const children = parseInt(document.getElementById("children").value);
  const dependents = document.getElementById("dependents").value;
  const numDependents = parseInt(document.getElementById("numDependents").value);

  // Extract pricing data
  const [basePrice, marriageCost, firstChildCost, additionalChildCost, otherDependentCost] = pricingTable[plan][ageGroup];

  // Base or Marriage cost
  let totalCost = marriage === "Yes" ? marriageCost : basePrice;

  // Child costs
  if (children >= 1) {
    totalCost += firstChildCost; // Add 1st child cost
    if (children > 1) {
      totalCost += (children - 1) * additionalChildCost; // Add additional children costs
    }
  }

  // Other dependents cost
  if (dependents === "Yes" && numDependents > 0) {
    totalCost += numDependents * otherDependentCost;
  }

  // Display result
  document.getElementById("result").innerText = `Total Cost: $${totalCost.toLocaleString()}`;
}
