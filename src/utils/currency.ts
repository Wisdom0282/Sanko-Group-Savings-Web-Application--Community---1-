export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

export const parseNaira = (value: string): number => {
  const cleaned = value.replace(/[₦,\s]/g, '');
  return parseFloat(cleaned) || 0;
};