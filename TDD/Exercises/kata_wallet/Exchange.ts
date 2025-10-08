export type Currency = "PETROLEUM" | "EURO" | "DOLLARS" | "BITCOIN";

export type ExchangeFn = (amount: number, from: Currency, to: Currency) => number;
