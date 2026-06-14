import { db } from './firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, where, query, serverTimestamp } from "firebase/firestore";

class DbService {
    async createJobEntry({
        userId,
        companyName,
        position,
        jobLink,
        status = "Applied",
        notes = "",
        location,
        dateApplied
    }) {

        const jobRef = collection(db, "jobs")

        try {

            const docRef = await addDoc(jobRef, {
                userId,
                companyName,
                position,
                jobLink,
                status,
                notes,
                location,
                dateApplied,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })

            return {
                id: docRef.id,
                userId,
                companyName,
                position,
                jobLink,
                status,
                notes,
                location,
                dateApplied,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

        } catch (error) {
            throw error
        }
    }

    async updateJobEntry(jobId, updatedData) {
        const jobRef = doc(db, 'jobs', jobId)
        try {
            await updateDoc(jobRef, updatedData)
            return {
                id: jobId,
                ...updatedData
            }
        }
        catch (error) {
            throw error
        }
    }

    async deleteJobEntry(jobId) {
        const jobRef = doc(db, 'jobs', jobId)
        try {
            await deleteDoc(jobRef)
            return jobId
        }
        catch (error) {
            throw error
        }
    }

    async getUserJobEntries(userId) {
        const jobRef = collection(db, 'jobs')
        try {
            const jobEntries = await getDocs(query(jobRef, where('userId', '==', userId)))
            return jobEntries.docs.map((doc) => {

                const data = doc.data()

                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toMillis() || null,
                    updatedAt: data.updatedAt?.toMillis() || null,
                }
            })
        }
        catch (error) {
            throw error
        }
    }

    async getJobEntry(jobId) {
        const jobRef = doc(db, 'jobs', jobId)
        try {
            const jobEntry = await getDoc(jobRef)
            return jobEntry
        }
        catch (error) {
            throw error
        }
    }
}

const dbService = new DbService()
export default dbService