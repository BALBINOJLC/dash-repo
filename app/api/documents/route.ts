import { NextResponse } from "next/server"

// Simulated document database
const documentDatabase = [
  { id: "doc1", name: "Certificado de Vigencia", expiry: "2023-12-31", path: "/documents/certificado-vigencia.pdf" },
  { id: "doc2", name: "Declaración Jurada", expiry: "2023-12-31", path: "/documents/declaracion-jurada.pdf" },
  { id: "doc3", name: "Estados Financieros", expiry: "2023-12-31", path: "/documents/estados-financieros.pdf" },
  { id: "doc4", name: "Certificado Bancario", expiry: "2023-12-31", path: "/documents/certificado-bancario.pdf" },
]

// Function to check if required documents are available
function checkDocumentAvailability(requiredDocs: string[]) {
  const availableDocs = documentDatabase.map((doc) => doc.name)

  const result = requiredDocs.map((doc) => ({
    name: doc,
    available: availableDocs.includes(doc),
    document: documentDatabase.find((d) => d.name === doc),
  }))

  return result
}

// Function to send email requesting missing documents
async function sendDocumentRequest(document: string, responsible: string) {
  // In a real implementation, this would send an actual email
  console.log(`Sending request for ${document} to ${responsible}`)

  // Simulate email sending
  return {
    sent: true,
    to: responsible,
    document,
    timestamp: new Date().toISOString(),
  }
}

export async function GET(request: Request) {
  try {
    return NextResponse.json({ documents: documentDatabase })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { requiredDocuments } = await request.json()

  try {
    const documentStatus = checkDocumentAvailability(requiredDocuments)

    return NextResponse.json({ documentStatus })
  } catch (error) {
    return NextResponse.json({ error: "Failed to check document availability" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { missingDocument, responsible } = await request.json()

  try {
    const requestResult = await sendDocumentRequest(missingDocument, responsible)

    return NextResponse.json({ requestResult })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send document request" }, { status: 500 })
  }
}
