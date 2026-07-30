import { v2 as cloudinary, DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { ApiError } from "./ApiError";


const uploadOnCloudinary = async (fileData: Buffer): Promise<UploadApiResponse> => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    try {

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder: "ResumeDocs",
                resource_type: "auto"
            }, (error, result) => {
                if (error) {
                    return reject(error)
                }
                else {
                    resolve(result)
                }
            })
            stream.end(fileData)
        })
        return uploadResult as UploadApiResponse
    } catch (error) {
        const cloudinaryError = error as UploadApiErrorResponse
        throw new ApiError(cloudinaryError.http_code, cloudinaryError.message)
    }
}

const deleteFromCloudinary = async (publicId: string): Promise<DeleteApiResponse> => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    try {

        const deleteResult = await cloudinary.uploader.destroy(publicId)
        return deleteResult as DeleteApiResponse

    } catch (error) {

        const cloudinaryError = error as UploadApiErrorResponse
        throw new ApiError(cloudinaryError.http_code, cloudinaryError.message)

    }
}

export { uploadOnCloudinary, deleteFromCloudinary }