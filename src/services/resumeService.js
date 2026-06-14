import { db } from "./firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, where, query, serverTimestamp } from "firebase/firestore";
import supabase from '../supabase/supabase'
import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class ResumeService {

    async createResume(data) {
        const resumeRefs = collection(db, "resumes")

        const docRef = await addDoc(resumeRefs, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })

        return {
            id: docRef.id,
            ...data,
        }
    }
    async getResume(resumeId) {
        const resumeRef = doc(db, 'resumes', resumeId)

        try {
            const snapshot = await getDoc(resumeRef)

            return {
                id: snapshot.id,
                ...snapshot.data()
            }
        } catch (error) {
            throw error
        }
    }
async getResumes(userId) {
    const resumeRefs = collection(db, "resumes")

    const snapshot = await getDocs(
        query(resumeRefs, where("userId", "==", userId))
    )

    return snapshot.docs.map((doc) => {
        const data = doc.data()

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis?.() || null,
            updatedAt: data.updatedAt?.toMillis?.() || null,
        }
    })
}
async updateResume(resumeId, updatedData) {
    const resumeRef = doc(db, 'resumes', resumeId)

    try {
        await updateDoc(resumeRef, {
            ...updatedData,
            updatedAt: serverTimestamp()
        })

        return {
            id: resumeId,
            ...updatedData,
        }

    } catch (error) {
        throw error
    }
}
    async deleteResume(resumeId) {
        const resumeRef = doc(db, 'resumes', resumeId)
        try {
            await deleteDoc(resumeRef)
        }
        catch (error) {
            throw error
        }
    }
    async uploadResumeFile(file, userId) {
        const fileName = `${userId}_${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage
            .from("storage")
            .upload(fileName, file);


        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
            .from("storage")
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    }
    async extractResumeText(file) {
        const arrayBuffer = await file.arrayBuffer()

        const pdf = await pdfjs.getDocument({
            data: arrayBuffer
        }).promise
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);

            const textContent =
                await page.getTextContent();

            const pageText =
                textContent.items
                    .map(item => item.str)
                    .join(" ");

            fullText += pageText + "\n";
        }

        return fullText;
    }

}
const resumeService = new ResumeService()
export default resumeService