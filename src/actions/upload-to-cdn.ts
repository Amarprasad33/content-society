"use server"
import cloudinary from "@/lib/cloudinary"
import { writeFile } from "fs/promises";
import path, { resolve } from "path";
import os from "os";
import { Readable } from "stream";

interface CloudinaryResponse {
    success: boolean,
    message?: string,
    url?: string
}

const uploadToClouodinary = async (formData: FormData): Promise<CloudinaryResponse> => {
    "use server"
    const file = formData.get('file') as File;
    if (!file) {
        return { success: false, message: "No file selected" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileStream = Readable.from(buffer);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'cs-org-logo' },
                (error, result) => {
                    if (error) {
                        console.error("Upload error:", error);
                        reject({ success: false, message: "Upload failed" });
                      } else {
                        console.log("upload-res", result);
                        resolve({ success: true, message: 'Image uploaded successfully', url: result?.secure_url ?? undefined });
                      }
                }
            );
            fileStream.pipe(uploadStream);
        })

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return { success: false, message: "Upload failed" };  
    }
}

export { uploadToClouodinary };