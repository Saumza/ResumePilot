import { ApiError } from "@/utils/ApiError";
import { PDFParse } from "pdf-parse";

export const parsePdf = async (pdfData: Buffer): Promise<string> => {
    let parse: PDFParse | undefined
    try {

        parse = new PDFParse({ data: pdfData })
        const result = await parse.getText()
        const cleanedText = result.text.replace(/--\s*\d+\s*of\s*\d+\s*--/g, '').trim()
        return cleanedText

    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(500, error.message)
        }
        throw new ApiError(500, "Pdf Parsing Failed")
    }
    finally {
        if (parse) {
            await parse.destroy()
        }
    }
}