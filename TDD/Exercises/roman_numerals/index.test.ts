
import { describe, test, expect } from "@jest/globals"
import {romanConvert} from "./Roman";

describe('Roman Numerals', () =>{

    test('1 --> I', () =>{
        expect(romanConvert(1)).toBe("I")
    })

    test('2 --> II', () =>{
        expect(romanConvert(2)).toBe("II")
    })

    test('10 --> X', () =>{
        expect(romanConvert(10)).toBe("X")
    })

    test('37 --> XXXVII', () =>{
        expect(romanConvert(37)).toBe("XXXVII")
    })

})