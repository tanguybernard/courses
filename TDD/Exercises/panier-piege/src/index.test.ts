import { describe, expect, it, test } from "vitest";


//FIZZBUZZ  %3 : FIZZ %5 : BUZZ  FIZZBUZZ
//1 => 1 2 => 2, 3 => FIZZ


describe("Kata FizzBuzz", () => {

it("devrait renvoyer le nombre quand ce n'est pas fizzbuzz ", () => {
    [1, 2, 4].forEach(n => {
    expect(fizzbuzz(n)).toBe(n.toString());
    })    
    
    })
        it("devrait renvoyer FIZZ quand j execute avec 3", () => {
            
            //ARRANGE ///GIVEN
            const nbATester = 3
            //ACT //WHEN
            const resultat = fizzbuzz(nbATester)
            //ASSERT.  //THEN
            expect(resultat).toBe("FIZZ");
    })

    it("devrait renvoyer BUZZ quand j execute avec 5", () => {
        expect(fizzbuzz(5)).toBe("BUZZ");
  })
            it("devrait renvoyer FIZZ quand j execute avec 6", () => {
        expect(fizzbuzz(6)).toBe("FIZZ");
    })

})

describe(" parametrized", () => {

    test.each([
        [1, 1, 2],
        [1, 2, 3],
        [2, 1, 3],
        ])('add(%i, %i) -> %i', (a, b, expected) => {
        expect(a + b).toBe(expected)
        })
})


const fizzbuzz = (nb: number) => 
    
    nb % 3 == 0 
    ? "FIZZ"  
    : (
        nb % 5 == 0 ? "BUZZ" 
        : nb.toString()
    )
