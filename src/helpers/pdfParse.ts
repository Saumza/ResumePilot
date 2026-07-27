import { ApiError } from "@/utils/ApiError";
import { PDFParse } from "pdf-parse";

export const parsePdf = async (pdfData: Buffer): Promise<string> => {
    let parse: PDFParse | undefined
    try {
        parse = new PDFParse({ data: pdfData })
        const result = await parse.getText()
        return result.text
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