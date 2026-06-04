import { db } from "./firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, where, query } from "firebase/firestore";

class ResumeService {

    async createResume({userId,resumeFileUrl,resumeTitle,resumeText="",createdAt=new Date(),updatedAt=new Date()}){
        const resumeRefs = collection(db, 'resumes')
        try{
            const resumeData= await addDoc(resumeRefs, {
                userId,
                resumeFileUrl,
                resumeTitle,
                resumeText,
                createdAt,
                updatedAt
            })
            return resumeData
        }
        catch(error){
            throw error
        }

    }
    async getResume(resumeId){
        const resumeRef= doc(db, 'resumes', resumeId)
        try{
            const resumeData= await getDoc(resumeRef)
            return resumeData
        }
        catch(error){
            throw error
        }
    }
    async getResumes(userId){
        try{
            const resumeData= await getDocs(query(resumeRefs, where('userId', '==', userId)))
            return resumeData
        }
        catch(error){
            throw error
        }
    }
    async updateResume(resumeId, updatedData){
        const resumeRef= doc(db, 'resumes', resumeId)
        try{
            await updateDoc(resumeRef, updatedData)
        }
        catch(error){
            throw error
        }
    }
    async deleteResume(resumeId){
        const resumeRef= doc(db, 'resumes', resumeId)
        try{
            await deleteDoc(resumeRef)
        }
        catch(error){
            throw error
        }
    }
}
const resumeService = new ResumeService()
export default resumeService