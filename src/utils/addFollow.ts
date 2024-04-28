import {arrayRemove, collection, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import {Dispatch} from "react";
import {User} from "../types/user.ts";

export default async function addFollow(follower: string, following: string, setProccessing: Dispatch<boolean>) {
    try {
        setProccessing(true)
        const usersCollectionRef = collection(db, "users");
        const userQueryFollowing = query(usersCollectionRef, where("email", "==", following));
        const userQueryFollower = query(usersCollectionRef, where("email", "==", follower));
        const querySnapshotFollowing = await getDocs(userQueryFollowing);
        const querySnapshotFollower = await getDocs(userQueryFollower);

        if (!querySnapshotFollowing.empty && !querySnapshotFollower.empty) {
            const followingUserDocRef = querySnapshotFollowing.docs[0].ref;
            const followingUserData = querySnapshotFollowing.docs[0].data();
            const followerUserData = querySnapshotFollower.docs[0].data();

            const followersIndex = followingUserData.followers.findIndex((follower: User) => follower.uid === followerUserData.uid);

            if (followersIndex !== -1) {
                await updateDoc(followingUserDocRef, {
                    followers: arrayRemove(followingUserData.followers[followersIndex])
                });
            } else {
                await setDoc(followingUserDocRef, {followers: [...followingUserData.followers, {
                        uid: followerUserData.uid,
                        profilePic:followerUserData.profilePhoto,
                        name: followerUserData.name,
                        email: followerUserData.email,
                }]}, {merge: true});
            }
        } else {
            throw Error('No user with that email was found.');
        }
    } catch (e) {
        throw Error('Something bad happened!');
    } finally {
        setProccessing(false)
    }
}