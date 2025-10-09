
import { describe, test, expect } from "@jest/globals"

describe('Birthday Greetings', () =>{


    test('devrait envoyé le message avec un destinataire, un sujet et un corps ', () =>{

        const messageFakeService = new MessageFakeService();
        messageFakeService.send('bob@example.com', 'Hello', 'Bon anniversaire Bob 🎉');

        expect(mockFn).toHaveBeenCalledWith(
            'bob@example.com',
            'Hello',
            'Bon anniversaire Bob 🎉'
        );
    })

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

const mockFn = jest.fn();

class MessageFakeService {
    send(to: string, subject: string, body: string) {
        mockFn(to, subject, body);
    }
}


function sendBirthdayGreeting(service: any) {
    const to = "alice@example.com";
    const subject = "Joyeux Anniversaire !";
    const body = "Bon anniversaire Alice 🎉";
    service.send(to, subject, body);
}
