import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    constructor(
        private readonly userSession: UserSession,//1ere extraction
        private readonly tripDAO: TripDAO,
    ) {
    }
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.userSession.getLoggedUser(); //1ere extraction
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = this.tripDAO.findTripsByUser(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }
}
