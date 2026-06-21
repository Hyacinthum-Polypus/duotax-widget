/**
 * Building Cost Index (BCI) Data Table
 * Mapped by completion year (rows) and state/territory (columns).
 * 
 * Column Index Mapping (States):
 * 0: ACT (Australian Capital Territory)
 * 1: NSW (New South Wales)
 * 2: NT  (Northern Territory)
 * 3: QLD (Queensland)
 * 4: SA  (South Australia)
 * 5: TAS (Tasmania)
 * 6: VIC (Victoria)
 * 7: WA  (Western Australia)
 * 
 * Row Index Mapping (Years):
 * 0:  Before Sep 1987
 * 1:  Sep 1987
 * 2:  1988
 * ...
 * 40: 2026
 */

export const BCI_STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

export const BCI_YEARS = [
  "before sep 1987",
  "sep 1987",
  ...Array.from({ length: 2026 - 1988 + 1 }, (_, i) => String(1988 + i))
];

export const bciDataTable = [
  // 0: Before Sep 1987
  [0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
  // 1: Sep 1987
  [0.4864, 0.4147, 0.3815, 0.3535, 0.3815, 0.4759, 0.4759, 0.3972],
  // 2: 1988
  [0.5179, 0.4637, 0.4129, 0.3867, 0.4129, 0.5144, 0.5144, 0.4147],
  // 3: 1989
  [0.5459, 0.5004, 0.4427, 0.4322, 0.4427, 0.5144, 0.5144, 0.4514],
  // 4: 1990
  [0.5879, 0.5337, 0.4707, 0.4637, 0.4707, 0.5144, 0.5144, 0.4847],
  // 5: 1991
  [0.6089, 0.5284, 0.4969, 0.4584, 0.4969, 0.5144, 0.5144, 0.4899],
  // 6: 1992
  [0.6159, 0.5109, 0.5039, 0.4444, 0.5039, 0.4847, 0.4847, 0.4899],
  // 7: 1993
  [0.6124, 0.5144, 0.5074, 0.4497, 0.5074, 0.4619, 0.4619, 0.4899],
  // 8: 1994
  [0.6124, 0.5144, 0.5144, 0.4567, 0.5144, 0.4619, 0.4619, 0.4917],
  // 9: 1995
  [0.6177, 0.5389, 0.5214, 0.4777, 0.5214, 0.4759, 0.4759, 0.4934],
  // 10: 1996
  [0.6387, 0.5512, 0.5442, 0.4532, 0.5442, 0.4882, 0.4882, 0.5039],
  // 11: 1997
  [0.6562, 0.5599, 0.5582, 0.4584, 0.5582, 0.5022, 0.5022, 0.5179],
  // 12: 1998
  [0.6597, 0.5687, 0.5669, 0.4584, 0.5669, 0.5074, 0.5074, 0.5284],
  // 13: 1999
  [0.6684, 0.5862, 0.5739, 0.4602, 0.5739, 0.5214, 0.5214, 0.5389],
  // 14: 2000
  [0.6754, 0.6177, 0.5949, 0.5092, 0.5949, 0.5652, 0.5652, 0.5512],
  // 15: 2001
  [0.6877, 0.6247, 0.6124, 0.5074, 0.6124, 0.5809, 0.5809, 0.5459],
  // 16: 2002
  [0.7017, 0.6422, 0.6282, 0.5162, 0.6282, 0.6107, 0.6107, 0.5547],
  // 17: 2003
  [0.7419, 0.6719, 0.6544, 0.5774, 0.6544, 0.6439, 0.6439, 0.5897],
  // 18: 2004
  [0.7871, 0.7024, 0.6985, 0.6765, 0.6985, 0.6758, 0.6758, 0.6500],
  // 19: 2005
  [0.8322, 0.7328, 0.7426, 0.7755, 0.7426, 0.7076, 0.7076, 0.7104],
  // 20: 2006
  [0.8933, 0.7725, 0.8058, 0.8618, 0.8058, 0.7515, 0.7515, 0.8110],
  // 21: 2007
  [0.9484, 0.8058, 0.8600, 0.9116, 0.8600, 0.7857, 0.7857, 0.9055],
  // 22: 2008
  [1.0009, 0.8434, 0.9186, 0.9720, 0.9186, 0.8215, 0.8215, 0.9991],
  // 23: 2009
  [1.0219, 0.8521, 0.9484, 0.9895, 0.9484, 0.8416, 0.8416, 1.0350],
  // 24: 2010
  [1.0297, 0.8548, 0.9755, 0.9650, 0.9755, 0.8565, 0.8565, 0.9930],
  // 25: 2011
  [1.0569, 0.8670, 0.9895, 0.9484, 0.9895, 0.8854, 0.8854, 0.9851],
  // 26: 2012
  [1.0831, 0.8854, 0.9720, 0.9598, 0.9720, 0.9046, 0.9046, 1.0061],
  // 27: 2013
  [1.0954, 0.8985, 0.9650, 0.9633, 0.9650, 0.9143, 0.9143, 1.0175],
  // 28: 2014
  [1.1164, 0.9169, 0.9746, 0.9799, 0.9746, 0.9283, 0.9283, 1.0271],
  // 29: 2015
  [1.1479, 0.9545, 0.9904, 1.0070, 0.9904, 0.9493, 0.9493, 1.0455],
  // 30: 2016
  [1.1680, 1.0000, 0.9974, 1.0752, 0.9974, 0.9851, 0.9851, 1.0359],
  // 31: 2017
  [1.1925, 1.0157, 1.0184, 1.1102, 1.0184, 1.0166, 1.0166, 1.0324],
  // 32: 2018
  [1.2178, 1.0560, 1.0464, 1.1391, 1.0464, 1.0472, 1.0472, 1.0306],
  // 33: 2019
  [1.2581, 1.1006, 1.0761, 1.1680, 1.0761, 1.0796, 1.0796, 1.0289],
  // 34: 2020
  [1.2992, 1.1531, 0.9858, 1.1864, 0.9858, 1.1111, 1.1111, 1.0341],
  // 35: 2021
  [1.3403, 1.1776, 1.0386, 1.2091, 1.0386, 1.1566, 1.1566, 1.0656],
  // 36: 2022
  [1.4024, 1.2397, 1.1401, 1.3140, 1.1401, 1.2388, 1.2388, 1.1304],
  // 37: 2023
  [1.4706, 1.3158, 1.2102, 1.4514, 1.2102, 1.3219, 1.3219, 1.2066],
  // 38: 2024
  [1.5416, 1.3727, 1.2724, 1.5836, 1.2724, 1.3911, 1.3911, 1.2758],
  // 39: 2025
  [1.6098, 1.4593, 1.3598, 1.7078, 1.3598, 1.4462, 1.4462, 1.3474],
  // 40: 2026
  [1.6737, 1.5241, 1.4307, 1.8390, 1.4307, 1.5109, 1.5109, 1.4174]
];

/**
 * State to Column Index Mapper
 * @param {string} stateName - E.g. "Victoria", "VIC", "New South Wales", "NSW"
 * @returns {number} The column index in the BCI table (defaults to 1 for NSW if unmatched)
 */
export function getStateColumnIndex(stateName) {
  if (!stateName) return 1;
  const canonical = stateName.toLowerCase().trim();
  
  if (canonical.includes("nsw") || canonical.includes("south wales")) return 1;
  if (canonical.includes("vic") || canonical.includes("victoria")) return 6;
  if (canonical.includes("qld") || canonical.includes("queensland")) return 3;
  if (canonical.includes("sa") || canonical.includes("south australia")) return 4;
  if (canonical.includes("wa") || canonical.includes("western australia")) return 7;
  if (canonical.includes("tas") || canonical.includes("tasmania")) return 5;
  if (canonical.includes("nt") || canonical.includes("northern territory")) return 2;
  if (canonical.includes("act") || canonical.includes("capital territory")) return 0;
  
  return 1; // Default fallback to NSW
}

/**
 * Year to Row Index Mapper
 * @param {string|number} yearInput - E.g. "before sep 1987", "sep 1987", 2024, "2024"
 * @returns {number} The row index in the BCI table (defaults to 39 for 2025 if unmatched)
 */
export function getYearRowIndex(yearInput) {
  if (!yearInput) return 39;
  const canonical = String(yearInput).toLowerCase().trim();
  
  if (canonical === "before sep 1987" || canonical.includes("before")) {
    return 0;
  }
  if (canonical === "sep 1987" || canonical === "sept 1987") {
    return 1;
  }
  
  const year = parseInt(canonical, 10);
  if (!Number.isFinite(year)) return 39;
  
  // Math matches the logic used in the website's calculator
  return Math.max(0, Math.min(39, year - 1987));
}

/**
 * Gets the Building Cost Index (BCI) value for a given state and completion year.
 * @param {string} stateName - E.g. "Victoria", "NSW"
 * @param {string|number} yearInput - E.g. "before sep 1987", 2024
 * @returns {number} The BCI multiplier
 */
export function getBCIMultiplier(stateName, yearInput) {
  const colIndex = getStateColumnIndex(stateName);
  const rowIndex = getYearRowIndex(yearInput);
  return bciDataTable[rowIndex][colIndex];
}
