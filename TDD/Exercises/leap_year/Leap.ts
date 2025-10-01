
export class LeapFirst {

    isLeapYear(year: number): boolean {
        return true
    }

}

export class LeapSecond {

    isLeapYear(year: number): boolean {
        switch (year) {
            case 2000: return true;
            case 1700:
            case 1800:
            case 1900:
            case 2100:
                return false;
            default: return true;

        }
    }

}


export class Leap {

    isLeapYear(year: number): boolean {
        if(year % 400 === 0) { //VRAI
            return true;
        }
        else {
            if(year % 100 === 0) {
                return false;
            }
            else { //VRAI si year % 100 !== 0
                if(year % 4 === 0) { //et VRAI si year % 4 === 0
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

}

/*
    Bissextiles si :
    - le nombre est divisible par 400
    - !(divisible par 100 et pas 400)
    - divisible par 4 et pas 100
 */
export const isLeapYear = (year: number) =>
    (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);

