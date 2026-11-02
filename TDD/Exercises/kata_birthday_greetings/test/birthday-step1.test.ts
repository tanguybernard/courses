
import { describe, test, expect } from "@jest/globals"

describe('Birthday Greetings', () =>{


    test('devrait appelé le service de message avec un destinataire, un sujet et un corps ', () =>{

        //ARRANGE
        const mockFn = jest.fn(); // on espionne les appels
        const messageService = { send: mockFn };

        //ACT
        sendBirthdayGreeting(messageService)

        //ASSERT
        expect(mockFn).toHaveBeenCalledWith(
            'alice@example.com',
            'Joyeux Anniversaire !',
            'Bon anniversaire Alice 🎉'
        );
    })

})

function sendBirthdayGreeting(service: any) {
    const to = "alice@example.com";
    const subject = "Joyeux Anniversaire !";
    const body = "Bon anniversaire Alice 🎉";
    service.send(to, subject, body);
}
