
import { describe, test, expect } from "@jest/globals"
import {LeapSecond, Leap, isLeapYear} from "./Leap";

describe('Leap Year', () =>{

    let leap: LeapSecond;

    beforeEach(() => {
        leap = new LeapSecond();
    });

    test('2000', () =>{
        expect(leap.isLeapYear(2000)).toBeTruthy()
    })

    test('1700', () =>{
        expect(leap.isLeapYear(1700)).toBeFalsy()
    })
    test('1800', () =>{
        expect(leap.isLeapYear(1800)).toBeFalsy()
    })

})


describe('Leap', () => {
    let leap: Leap;

    beforeEach(() => {
        leap = new Leap();
    });

    test('Année non divisible par 4 dans une année commune', () => {
        expect(leap.isLeapYear(2015)).toBe(false);
    });

    test('Année divisible par 2 mais pas divisible par 4 dans une année commune', () => {
        expect(leap.isLeapYear(1970)).toBe(false);
    });

    test('Année divisible par 4 mais pas divisible par 100 dans une année bissextile', () => {
        expect(leap.isLeapYear(1996)).toBe(true);
    });

    test('Année divisible par 4 et par 5 dans une année bissextile', () => {
        expect(leap.isLeapYear(1960)).toBe(true);
    });

    test('Année divisible par 100 mais pas divisible par 400 dans une année commune', () => {
        expect(leap.isLeapYear(2100)).toBe(false);
    });

    test("Année divisible par 100 mais pas divisible par 3 n'est pas une année bissextile", () => {
        expect(leap.isLeapYear(1900)).toBe(false);
    });

    test('Année divisible par 400 dans une année bissextile', () => {
        expect(leap.isLeapYear(2000)).toBe(true);
    });

    test('Année divisible par 400 mais pas divisible par 125 est une année bissextile', () => {
        expect(leap.isLeapYear(2400)).toBe(true);
    });

    test('Année divisible par 200 mais pas divisible par 400 dans une année commune', () => {
        expect(leap.isLeapYear(1800)).toBe(false);
    });
});



//Attention car on perd ici l'intention du test
describe("LeapYear ParameterizedTest", () => {

    let leap: Leap;

    beforeEach(() => {
        leap = new Leap();
    });
    test.each([
        [2015, false],
        [1970, false],
        [2000, true],
        [2008, true],
        [2100, false],

    ])("isLeapYear(%i) devrait retourner %s", (input, expected) => {
        expect(leap.isLeapYear(input)).toBe(expected);
    });
});


describe('Leap Functional', () => {
    test('Année non divisible par 4 dans une année commune', () => {
        expect(isLeapYear(2015)).toBe(false);
    });

    test('Année divisible par 2 mais pas divisible par 4 dans une année commune', () => {
        expect(isLeapYear(1970)).toBe(false);
    });

    test('Année divisible par 4 mais pas divisible par 100 dans une année bissextile', () => {
        expect(isLeapYear(1996)).toBe(true);
    });

    test('Année divisible par 4 et par 5 dans une année bissextile', () => {
        expect(isLeapYear(1960)).toBe(true);
    });

    test('Année divisible par 100 mais pas divisible par 400 dans une année commune', () => {
        expect(isLeapYear(2100)).toBe(false);
    });

    test("Année divisible par 100 mais pas divisible par 3 n'est pas une année bissextile", () => {
        expect(isLeapYear(1900)).toBe(false);
    });

    test('Année divisible par 400 dans une année bissextile', () => {
        expect(isLeapYear(2000)).toBe(true);
    });

    test('Année divisible par 400 mais pas divisible par 125 est une année bissextile', () => {
        expect(isLeapYear(2400)).toBe(true);
    });

    test('Année divisible par 200 mais pas divisible par 400 dans une année commune', () => {
        expect(isLeapYear(1800)).toBe(false);
    });
});

