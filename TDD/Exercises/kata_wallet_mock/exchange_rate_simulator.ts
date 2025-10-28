import {Currency, ExchangeFn} from "./Exchange";


interface ExchangeRates {
    [key: string]: number;
}

/**
 * Retourne un taux de change simulé entre deux devises.
 * Les taux sont centrés sur une valeur moyenne, mais varient légèrement à chaque appel.
 */
function getExchangeRate(from: Currency, to: Currency): number {
    if (from === to) return 1;

    // Taux moyens de référence (1 unité de "from" = combien de "to")
    const baseRates: Record<Currency, ExchangeRates> = {
        PETROLEUM: { EURO: 0.85, DOLLARS: 0.92, BITCOIN: 0.000021 },
        EURO: { PETROLEUM: 1.18, DOLLARS: 1.08, BITCOIN: 0.000025 },
        DOLLARS: { PETROLEUM: 1.09, EURO: 0.93, BITCOIN: 0.000023 },
        BITCOIN: { PETROLEUM: 47000, EURO: 40000, DOLLARS: 43000 },
    };

    const base = baseRates[from]?.[to];
    if (!base) throw new Error(`Conversion non supportée : ${from} → ${to}`);

    // Ajoute une variation aléatoire de ±3 %
    const variation = 1 + (Math.random() - 0.5) * 0.06;
    return base * variation;
}


const defaultExchangeImpl: ExchangeFn = (amount, from, to) => {
    const rate = getExchangeRate(from, to);
    return amount * rate;
}

export {defaultExchangeImpl};
