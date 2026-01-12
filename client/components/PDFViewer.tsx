'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
    fileUrl: string
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
        setPageNumber(1)
    }

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    const previousPage = () => {
        changePage(-1)
    }

    const nextPage = () => {
        changePage(1)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-skin-darker">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="font-semibold">Event Rulebook</p>
                        <p className="text-sm">View complete rules and guidelines</p>
                    </div>
                </div>
                <a
                    href={fileUrl}
                    download="event-rulebook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-skin-deep text-white font-semibold py-2 px-4 rounded-lg hover:bg-skin-darker transition-colors duration-300 text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                </a>
            </div>

            {/* PDF Viewer */}
            <div className="border-2 border-skin-light rounded-xl overflow-hidden bg-white">
                <div className="flex items-center justify-center bg-skin-light p-4">
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-skin-deep"></div>
                            </div>
                        }
                        error={
                            <div className="text-center py-8 text-red-600">
                                <p>Failed to load PDF.</p>
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 inline-block">
                                    Click here to download
                                </a>
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 100 : 800)}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                        />
                    </Document>
                </div>

                {/* PDF Controls */}
                {numPages && (
                    <div className="bg-skin-lighter px-4 py-3 flex items-center justify-between border-t-2 border-skin-light">
                        <button
                            onClick={previousPage}
                            disabled={pageNumber <= 1}
                            className="px-4 py-2 bg-skin-deep text-white rounded-lg hover:bg-skin-darker disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                        >
                            Previous
                        </button>
                        <p className="text-sm text-skin-darker font-medium">
                            Page {pageNumber} of {numPages}
                        </p>
                        <button
                            onClick={nextPage}
                            disabled={pageNumber >= numPages}
                            className="px-4 py-2 bg-skin-deep text-white rounded-lg hover:bg-skin-darker disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
