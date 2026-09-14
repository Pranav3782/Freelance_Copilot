import { ProjectAnalysis } from '../types';

/**
 * Extracts the recommended rough budget amount for an analyzed project in Indian Rupees (INR).
 * If the project budget is in USD (< 10000), it converts to INR at ~₹85/USD.
 */
export function getProjectAmountINR(proj: Partial<ProjectAnalysis> | null | undefined): number {
  if (!proj) return 45000;

  const pIntel = proj.pricingIntelligence;
  let rawAmount = 0;

  if (typeof pIntel?.suggestedMax === 'number' && pIntel.suggestedMax > 0) {
    rawAmount = pIntel.suggestedMax;
  } else if (typeof pIntel?.suggestedMin === 'number' && pIntel.suggestedMin > 0) {
    rawAmount = pIntel.suggestedMin;
  } else if (typeof pIntel?.freelancerFloor === 'number' && pIntel.freelancerFloor > 0) {
    rawAmount = pIntel.freelancerFloor;
  } else if (proj.projectOverview?.budget) {
    const str = String(proj.projectOverview.budget);
    const numMatch = str.match(/[\d,.]+/);
    if (numMatch) {
      rawAmount = parseFloat(numMatch[0].replace(/,/g, '')) || 0;
    }
  }

  if (!rawAmount || isNaN(rawAmount)) {
    rawAmount = 45000;
  }

  // If raw amount is USD or under ₹10,000, convert to INR (x85)
  if (rawAmount < 10000) {
    return Math.round(rawAmount * 85);
  }

  return Math.round(rawAmount);
}

/**
 * Formats a numeric value or budget string to Indian Rupees (INR / ₹) with standard locale formatting.
 */
export function formatINR(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '₹0';

  if (typeof val === 'number') {
    const rupees = val < 10000 ? Math.round(val * 85) : Math.round(val);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(rupees);
  }

  const str = String(val).trim();
  if (!str) return '₹0';

  const hasDollar = str.includes('$');
  const numMatch = str.match(/[\d,.]+/);
  if (!numMatch) return str;

  let num = parseFloat(numMatch[0].replace(/,/g, ''));
  if (isNaN(num)) return str;

  if (hasDollar || num < 10000) {
    num = Math.round(num * 85);
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}
