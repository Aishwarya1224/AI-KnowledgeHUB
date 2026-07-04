import fs from "fs";
import pdfParse from "pdf-parse";

export async function extractTextFromPdf(filePath: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(fileBuffer);

  return pdfData.text.trim();
}