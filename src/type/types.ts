
export type CalculationResult = {
    monthlyRepayments: number;
    totalOverTerm: number;
};
export const formatNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP"
})