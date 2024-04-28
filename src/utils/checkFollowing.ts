import {User} from "../types/user.ts";

export default function checkFollowing(userData: User, user: User):boolean {
    return userData.followers.some(follower  => {
        if(!follower) return;
        return follower.uid === user.uid
    })
}