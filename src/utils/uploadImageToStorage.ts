import { storage } from '../libs/firebase/firebase';
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export const uploadImageToStorage = (imageFile: File):Promise<string> => {

    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, imageFile.name);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("upload is" + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload paused");
                        break;
                    case "running":
                        console.log("Upload running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.error("Error uploading image:", error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        console.error("Error getting download URL:", error);
                        reject(error);
                    });
            }
        );
    });
};
