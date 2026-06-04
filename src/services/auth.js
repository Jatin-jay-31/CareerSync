import { auth } from './firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, signInWithPopup, GoogleAuthProvider, GitHubAuthProvider
} from "firebase/auth";
class AuthService{
    async createAccount({ email, password }){
        try {
            const userData = await createUserWithEmailAndPassword(auth, email, password)
            return userData
        }
        catch (error) {
            throw error;
        }

    }
async signIn({ email, password }){
        try {
            const userData = await signInWithEmailAndPassword(auth, email, password)
            return userData
        }
        catch (error) {
            throw error;
        }
    }

async logout(){
        try {
            return await signOut(auth)
        } catch (error) {
            throw error;
        }
    }
async getCurrentUser(){
    try {
        return auth.currentUser
    } catch (error) {
        throw error;
    }
}

async signInWithGoogle(){
    try{
        const provider= new GoogleAuthProvider()
        const userData= await signInWithPopup(auth, provider)
        return userData
    }
    catch(error){
        throw error
    }
}
async signInWithGitHub(){
    try{
        const provider= new GitHubAuthProvider()
        const userData= await signInWithPopup(auth, provider)
        return userData
    }
    catch(error){
        throw error
    }
}
}
const authService=new AuthService()
export default authService
