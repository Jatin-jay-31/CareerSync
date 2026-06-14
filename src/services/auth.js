import { auth } from './firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider
} from "firebase/auth";
class AuthService {
    async createAccount({ email, password }) {
        try {
            const userData = await createUserWithEmailAndPassword(auth, email, password)
            return {
                uid: userData.user.uid,
                email: userData.user.email,
                displayName: userData.user.displayName,
                photoURL: userData.user.photoURL
            }
        }
        catch (error) {
            throw error;
        }

    }
    async signIn({ email, password }) {
        try {
            const userData = await signInWithEmailAndPassword(auth, email, password)
            return {
                uid: userData.user.uid,
                email: userData.user.email,
                displayName: userData.user.displayName,
                photoURL: userData.user.photoURL
            }
        }
        catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await signOut(auth)
        } catch (error) {
            throw error;
        }
    }
    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            const userData = await signInWithPopup(auth, provider)
            return {
                uid: userData.user.uid,
                email: userData.user.email,
                displayName: userData.user.displayName,
                photoURL: userData.user.photoURL
            }
        }
        catch (error) {
            throw error
        }
    }
    async signInWithGitHub() {
        try {
            const provider = new GithubAuthProvider()
            const userData = await signInWithPopup(auth, provider)
            return {
                uid: userData.user.uid,
                email: userData.user.email,
                displayName: userData.user.displayName,
                photoURL: userData.user.photoURL
            }
        }
        catch (error) {
            throw error
        }
    }
}
const authService = new AuthService()
export default authService
