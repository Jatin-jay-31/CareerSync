import { db } from './firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, where, query } from "firebase/firestore";

class DbService{
    async createJobEntry({userId,companyName,position,jobLink,status='Applied',notes='',dateApplied=new Date(),createdAt=new Date()}){
        const jobRef = collection(db, 'jobs')
        try{
            const jobData= await addDoc(jobRef, {
                userId,
                companyName,
                position,
                jobLink,
                status,
                notes,
                dateApplied,
                createdAt
            })
            return jobData
        }
        catch(error){
            throw error
        }
    }

    async updateJobEntry(jobId, updatedData){
        const jobRef = doc(db,'jobs',jobId)
        try{
            await updateDoc(jobRef, updatedData)
        }
        catch(error){
            throw error
        }
    }

    async deleteJobEntry(jobId){
        const jobRef = doc(db,'jobs',jobId)
        try{
            await deleteDoc(jobRef)
        }
        catch(error){
            throw error
        }
    }

    async getUserJobEntries(userId){
        const jobRef = collection(db, 'jobs')
        try{
            const jobEntries= await getDocs(query(jobRef, where('userId', '==', userId)))
            return jobEntries
        }
        catch(error){
            throw error
        }
    }

    async getJobEntry(jobId){
        const jobRef = doc(db, 'jobs', jobId)
        try{
            const jobEntry= await getDoc(jobRef)
            return jobEntry
        }
        catch(error){
            throw error
        }
    }
}

const dbService= new DbService()
export default dbService