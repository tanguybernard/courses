export function romanConvert(nombre: number) {
    /*
        if(nombre == 1) return 'I'
        return "II"
    */

    let result = ""
    while(nombre > 0) {

        const v = valuesRR.find(v => v <= nombre)
        result += RomanMap[v]
        nombre -= v

    }
    return result;

}



const RomanMap: Record<number, string> = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I"
};

const valuesRR = Object.keys(RomanMap).map(Number).sort((a, b) => b - a)