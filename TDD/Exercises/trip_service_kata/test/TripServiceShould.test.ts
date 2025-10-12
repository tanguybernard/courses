import {describe, expect} from "@jest/globals"
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import Trip from "../src/trip/Trip";

describe("TripServiceShould", () => {
    it("...", () => {
        expect(4 + 4).toBe(8);
    });

    it("devrait retourner aucun voyages pour un utilisateur n'ayant pas reservé", () => {

        const mockUser = new User();
        const fakeSession = { getLoggedUser: () => mockUser };

        //null pour tripDao pas nécessaire pour ce test
        const tripService = new TripService(fakeSession, null);

        expect(tripService.getTripsByUser(mockUser)).toEqual([]);
    });

    it("devrait retourner un voyage", () => {

        const mockUser = new User();
        mockUser.addTrip(new Trip());

        const loggedUser = new User(); // celui qui demande les trips
        // IMPORTANT : l'utilisateur connecté doit être ami de celui qu'on cherche
        mockUser.addFriend(loggedUser);

        const fakeSession = { getLoggedUser: () => loggedUser };

        const fakeTripDao = { findTripsByUser: (user: User) => user.getTrips() };

        const tripService = new TripService(fakeSession, fakeTripDao);

        //ACT
        const resultat = tripService.getTripsByUser(mockUser)

        expect(resultat.length).toBeGreaterThan(0);
    });
});
