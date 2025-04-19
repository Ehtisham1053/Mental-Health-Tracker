import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Mental Health Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">Project Documentation</h2>

          <p className="text-gray-700 mb-6">
            Welcome to the Mental Health Tracker project documentation. This comprehensive documentation includes the
            Software Requirements Specification (SRS), architecture diagrams, class diagrams, and data models for the
            Mental Health Tracker application.
          </p>

          <div className="bg-teal-50 p-6 rounded-lg border border-teal-100 mb-8">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Documentation Highlights</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Complete Software Requirements Specification (SRS)</li>
              <li>Detailed system architecture with UML diagrams</li>
              <li>Class diagrams showing object relationships</li>
              <li>Data model and storage specifications</li>
              <li>PDF download functionality</li>
            </ul>
          </div>

          <Link href="/documentation">
            <Button className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
              <FileText size={16} />
              View Documentation
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-100 p-4 border-t mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Mental Health Tracker Documentation | A Flask & Python Project</p>
        </div>
      </footer>
    </div>
  )
}
