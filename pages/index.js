import { useState } from "react";

const pricingTable = {
  "2-210": {
    "Up to 27": [101257, 202514, 67218, 30334, 274761],
    "28 to 35": [151912, 264766, 67218, 30334, 274761],
    "36+": [208596, 352554, 67218, 30334, 274761]
  },
  "2-310": {
    "Up to 27": [132383, 264766, 88944, 35015, 354872],
    "28 to 35": [197846, 395692, 88944, 35015, 354872],
    "36+": [269748, 523818, 88944, 35015, 354872]
  },
  "2-410": {
    "Up to 27": [176277, 352554, 115869, 46097, 485283],
    "28 to 35": [261909, 523818, 115869, 46097, 485283],
    "36+": [368934, 612806, 115869, 46097, 485283]
  },
  "2-450": {
    "Up to 27": [266789, 533578, 155898, 89913, 629942],
    "28 to 35": [398920, 797840, 155898, 89913, 629942],
    "36+": [603521, 947404, 155898, 89913, 629942]
  },
  "2-510": {
    "Up to 27": [436543, 873086, 272495, 136478, 983150],
    "28 to 35": [660843, 1321686, 272495, 136478, 983150],
    "36+": [957513, 1564227, 272495, 136478, 983150]
  }
};


export default function Calculator() {
  const [plan, setPlan] = useState("2-210");
  const [ageGroup, setAgeGroup] = useState("Up to 27");
  const [marriage, setMarriage] = useState("No");
  const [children, setChildren] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = () => {
    const [basePrice, marriageCost, firstChildCost, additionalChildCost, otherDependentCost] = pricingTable[plan][ageGroup];
    let cost = marriage === "Yes" ? marriageCost : basePrice;
    if (children > 0) cost += firstChildCost + (children - 1) * additionalChildCost;
    cost += dependents * otherDependentCost;
    setTotalCost(cost);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Health Insurance Calculator</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Plan:</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="2-210">2-210</option>
            <option value="2-310">2-310</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age Group:</label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Up to 27">Up to 27</option>
            <option value="28 to 35">28 to 35</option>
            <option value="36+">36+</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Marriage:</label>
          <select
            value={marriage}
            onChange={(e) => setMarriage(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Children:</label>
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Dependents:</label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => setDependents(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={calculateCost}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>
        <div className="mt-4 text-xl text-center text-green-600 font-bold">
          Total Cost: ${totalCost.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
