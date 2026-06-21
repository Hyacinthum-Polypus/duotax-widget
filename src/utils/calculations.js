import { getBCIMultiplier } from "./bciData";

const PROPERTY_BASE = {
  house: 1560,
  granny_flat: 1615,
  townhouse: 1665,
  apartment: 1410,
  office: 940,
  warehouse: 590
};

const WALL_POINTS = {
  brick_veneer: 140,
  double_brick: 180,
  concrete: 220
};

/**
 * Maps the number of floors to a stories offset coefficient.
 * @param {number|string} floors 
 * @returns {number}
 */
export function mapStoriesOffset(floors) {
  const n = Math.max(1, Math.floor(Number(floors || 1)));
  if (n >= 8) return 10;
  return Math.max(0, n - 1);
}

/**
 * Maps the number of bedrooms to a scale factor.
 * @param {number|string} bedrooms 
 * @returns {number}
 */
export function mapBedroomsFactor(bedrooms) {
  const b = Math.max(1, Math.min(5, Number(bedrooms || 3)));
  if (b === 1) return -0.08;
  if (b === 2) return -0.04;
  if (b === 3) return 0;
  if (b === 4) return 0.04;
  return 0.08;
}

/**
 * Computes estimated construction costs using quantity surveyor logic.
 * 
 * @param {Object} inputs
 * @param {string} inputs.propertyType - "House", "Granny Flat", "Townhouse", "Apartment", "Office", "Warehouse"
 * @param {string} inputs.state - State/Territory (e.g. "Victoria", "NSW")
 * @param {string|number} inputs.year - Completion Year/Range (e.g. 2025, "before sep 1987")
 * @param {string} inputs.wallType - "Brick veneer", "Double brick", "Reinforced concrete"
 * @param {number|string} inputs.bedrooms - Number of bedrooms
 * @param {number|string} inputs.floors - Number of floors/storeys
 * @param {number|string} inputs.floorArea - Area in m2
 * @param {boolean} inputs.hasBasement - Property has basement
 * @param {boolean} inputs.hasDucted - Property has ducted air-conditioning
 * @param {boolean} inputs.hasMezzanine - Property has mezzanine
 * @param {boolean} inputs.hasElevator - Property has elevator
 * @param {string} inputs.finishLevel - "Economy", "Standard", "Premium", "Luxury"
 * 
 * @returns {Object} Estimated costs and BCI factors
 */
export function calculateConstructionCost({
  propertyType,
  state,
  year,
  wallType,
  bedrooms,
  floors,
  floorArea,
  hasBasement,
  hasDucted,
  hasMezzanine,
  hasElevator,
  finishLevel
}) {
  // Normalize string inputs to lowercase and snake_case for mapping keys
  const typeKey = String(propertyType || "").toLowerCase().trim().replace(/\s+/g, "_");
  const wallKey = String(wallType || "").toLowerCase().trim().replace(/\s+/g, "_").replace("reinforced_", ""); // "reinforced concrete" -> "concrete"
  const finishKey = String(finishLevel || "standard").toLowerCase().trim();

  // Core base rates
  const f241 = PROPERTY_BASE[typeKey] || 0;
  const f255 = WALL_POINTS[wallKey] || 0;
  const f260 = hasBasement ? 1 : 0;
  const f259 = hasDucted ? 255 : 0;
  
  // Offset multipliers
  const f256 = mapStoriesOffset(floors);
  const f244 = mapBedroomsFactor(bedrooms);
  const f261 = Math.max(0, Number(floorArea || 0));
  const f257 = hasElevator ? 1 : 0;
  const f258 = hasMezzanine ? 120 : 0;

  // Perform core calculations
  const baseWithoutElevator = (f241 + f258 + f255 + (f260 * 105) + f259) * (1 + (f256 * 0.04)) * (1 + f244) * f261;
  const elevatorAllowance = f257 ? (100000 + (f256 * 9500)) : 0;

  // Retrieve building cost index (BCI) for location & year
  const bci = getBCIMultiplier(state, year);
  
  // Calculate final base value (with location factor)
  const baseCalc = (baseWithoutElevator + elevatorAllowance) * bci;

  // Determine low/mid/high range (+/- 9%)
  const low = Math.round(baseCalc * 0.91);
  const mid = Math.round(baseCalc * 1.00);
  const high = Math.round(baseCalc * 1.09);

  // Map finish level to the correct output tier
  let selected = mid;
  if (finishKey === "economy") {
    selected = low;
  } else if (finishKey === "premium" || finishKey === "luxury") {
    selected = high;
  }

  return {
    lowEstimate: low,
    midEstimate: mid,
    highEstimate: high,
    selectedEstimate: selected,
    bci,
    baseWithoutElevator: Math.round(baseWithoutElevator * bci),
    elevatorAllowance: Math.round(elevatorAllowance * bci)
  };
}
