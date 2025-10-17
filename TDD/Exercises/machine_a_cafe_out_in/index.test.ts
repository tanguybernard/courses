import {describe, test, expect} from "@jest/globals"


describe("Kata Tennis", () => {

    test("test", () => {
        expect(true).toBeTruthy()
    })

    test("devrait renvoyer 0-0 au debut de la partie", () => {
        const jeu = new Jeu()
        expect(jeu.getScore()).toBe("0-0")
    })

    test("devrait renvoyer 15-0 si le joueur 1 marque", () => {
        const jeu = new Jeu()
        jeu.incrementScoreForJoueur1()
        expect(jeu.getScore()).toBe("15-0")
    })

    test("devrait renvoyer 30-0 si le joueur 1 marque", () => {
        let jeu = new Jeu()
        jeu = joueur1marque2Fois(jeu)
        expect(jeu.getScore()).toBe("30-0")
    })

    test("devrait renvoyer le joueur1 car il a gagné", () => {

        const jeu = new Jeu()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        expect(jeu.getJoueurGagnant()).toBe("J1")
    })

    test("devrait renvoyer 15-15 si le joueur 1 marque, joueur 2 marque", () => {
        let jeu = new Jeu()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur2()
        expect(jeu.getScore()).toBe("15-15")
    })

    test("devrait renvoyer AV-40 si le joueur 1 marque, joueur 2 marque", () => {
        let jeu = new Jeu()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()
        expect(jeu.getScore()).toBe("40-40")

        jeu.incrementScoreForJoueur1()

        expect(jeu.getScore()).toBe("AV-40")
    })

    test("devrait renvoyer 40-40 si l'avantage est perdu", () => {
        let jeu = new Jeu()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()

        jeu.incrementScoreForJoueur1()//AVANTAGE
        jeu.incrementScoreForJoueur2()//AVANTAGE PERDU


        expect(jeu.getScore()).toBe("40-40")
    })
    test("devrait faire gagner J2 ", () => {
        let jeu = new Jeu()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()

        jeu.incrementScoreForJoueur1()//AVANTAGE
        jeu.incrementScoreForJoueur2()//AVANTAGE PERDU pour J1

        jeu.incrementScoreForJoueur2()
        jeu.incrementScoreForJoueur2()

        expect(jeu.getJoueurGagnant()).toBe("J2")
    })


    function joueur1marque2Fois(jeu: Jeu){

        jeu.incrementScoreForJoueur1()
        jeu.incrementScoreForJoueur1()
        return jeu
    }


})

class Jeu {
    scoreJoueur1: number
    scoreJoueur2: number
    constructor(){
        this.scoreJoueur1 = 0;
        this.scoreJoueur2 = 0;
    }

    incrementScoreForJoueur1(){
        this.rollback4040IfAvantage()
        this.scoreJoueur1 += 1;
    }

    incrementScoreForJoueur2(){
        this.scoreJoueur2 += 1;
        this.rollback4040IfAvantage()
    }

    rollback4040IfAvantage(){
        if(this.scoreJoueur1 == 4 && this.scoreJoueur2 == 4) {
            this.scoreJoueur2 -=1
            this.scoreJoueur1 -=1
        }
    }

    getJoueurGagnant() {
        if( this.scoreJoueur1 == 5 || (this.scoreJoueur1 == 4 && this.scoreJoueur2 <3)){
            return "J1"
        }
        if( this.scoreJoueur2 == 5 || (this.scoreJoueur2 == 4 && this.scoreJoueur1 <3)){
            return "J2"
        }
        return "NOPE"
    }

     getScore() {
        if(this.getJoueurGagnant() !== "NOPE") {
            return `${this.getJoueurGagnant()} A GAGNE`
        }
        return `${scores[this.scoreJoueur1]}-${scores[this.scoreJoueur2]}`
    }
}


const scores = [0, 15, 30, 40, "AV"]
    