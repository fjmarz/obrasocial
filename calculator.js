// Pricing data
const pricingTable = {
  "2-210": { "Up to 27": [101257, 202514, 67218, 30334, 274761], "28 to 35": [151912, 264766, 88944, 35015, 354872], "36+": [208596, 352554, 115869, 46097, 485283] },
  "2-310": { "Up to 27": [132383, 264766, 88944, 35015, 354872], "28 to 35": [197846, 395692, 115869, 46097, 485283], "36+": [269748, 523818, 155898, 89913, 629942] }
};

function calculate() {
  const plan = document.getElementById("plan").value;
  const ageGroup = document.getElementById("ageGroup").value;
  const marriage = document.getElementById("marriage").value;
  const children = parseInt(document.getElementById("children").value);
  const dependents = document.getElementById("dependents").value;
  const numDependents = parseInt(document.getElementById("numDependents").value);

  // Get pricing data for selected plan and age group
  const [basePrice, marriageCost, firstChildCost, additionalChildCost, otherDependentCost] = pricingTable[plan][ageGroup];

  // Calculate total cost
  let totalCost = marriage === "Yes" ? marriageCost : basePrice;
  if (children > 0) totalCost += firstChildCost + (children - 1) * additionalChildCost;
  if (dependents === "Yes") totalCost += numDependents * otherDependentCost;

  // Display result
  document.getElementById("result").innerText = `Total Cost: $${totalCost.toLocaleString()}`;
}
