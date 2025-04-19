"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Code, Database, Layers } from "lucide-react"
import html2pdf from "html2pdf.js"

export default function Documentation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDownloadPDF = () => {
    const element = document.getElementById("documentation-content")
    const opt = {
      margin: 10,
      filename: "mental_health_tracker_documentation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }

    html2pdf().set(opt).from(element).save()
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mental Health Tracker Documentation</h1>
            <Button
              onClick={handleDownloadPDF}
              className="bg-white text-teal-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <Download size={16} />
              Download as PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4" id="documentation-content">
        <Tabs defaultValue="srs" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="srs" className="flex items-center gap-2">
              <FileText size={16} />
              SRS Document
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Layers size={16} />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="class-diagram" className="flex items-center gap-2">
              <Code size={16} />
              Class Diagram
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database size={16} />
              Data Model
            </TabsTrigger>
          </TabsList>

          <TabsContent value="srs" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">Software Requirements Specification</h2>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">1. Introduction</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">1.1 Purpose</h4>
                <p className="text-gray-700 mb-4">
                  This Software Requirements Specification (SRS) document describes the functional and non-functional
                  requirements for the Mental Health Tracker with Journal Analytics application. This document is
                  intended for developers, testers, and stakeholders involved in the development process.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">1.2 Scope</h4>
                <p className="text-gray-700 mb-4">
                  The Mental Health Tracker is a web application that allows users to track their mental health through
                  daily journal entries. The application provides insights into mood trends over time and analyzes
                  journal content to identify patterns. The system will store all journal entries locally using JSON
                  files.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">1.3 Definitions, Acronyms, and Abbreviations</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>SRS</strong> - Software Requirements Specification
                  </li>
                  <li>
                    <strong>UI</strong> - User Interface
                  </li>
                  <li>
                    <strong>API</strong> - Application Programming Interface
                  </li>
                  <li>
                    <strong>JSON</strong> - JavaScript Object Notation
                  </li>
                  <li>
                    <strong>OOP</strong> - Object-Oriented Programming
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">2. Overall Description</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">2.1 Product Perspective</h4>
                <p className="text-gray-700 mb-4">
                  The Mental Health Tracker is a standalone web application that does not require integration with
                  external systems. It operates as a self-contained system with a Flask backend and HTML/CSS/JavaScript
                  frontend.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">2.2 Product Functions</h4>
                <p className="text-gray-700 mb-2">The primary functions of the Mental Health Tracker include:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Recording daily journal entries with mood ratings</li>
                  <li>Viewing past journal entries</li>
                  <li>Filtering entries by date or mood</li>
                  <li>Generating mood reports and analytics</li>
                  <li>Analyzing word frequency in journal entries</li>
                  <li>Providing a comprehensive project report</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">2.3 User Classes and Characteristics</h4>
                <p className="text-gray-700 mb-4">
                  The system is designed for a single user who wants to track their mental health through journaling.
                  The user is expected to have basic computer literacy and be able to navigate a web application.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">2.4 Operating Environment</h4>
                <p className="text-gray-700 mb-4">
                  The application will operate in a web browser environment. It is compatible with modern web browsers
                  including Chrome, Firefox, Safari, and Edge. The backend requires Python 3.9 or higher with Flask
                  installed.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">2.5 Design and Implementation Constraints</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The application must use Flask for the backend</li>
                  <li>Data storage must use JSON files (no database)</li>
                  <li>The frontend must use HTML, CSS, and JavaScript (no frontend frameworks)</li>
                  <li>The application must follow object-oriented programming principles</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">2.6 Assumptions and Dependencies</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The user has Python and Flask installed on their system</li>
                  <li>The user has a modern web browser</li>
                  <li>The system has file read/write permissions for JSON storage</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">3. Specific Requirements</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">3.1 External Interface Requirements</h4>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.1.1 User Interfaces</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Journal Entry Page: Form for adding new entries and viewing past entries</li>
                    <li>Reports Page: Displays mood analytics and word frequency analysis</li>
                    <li>Project Report Page: Provides documentation about the project</li>
                    <li>Navigation: Menu for navigating between pages</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.1.2 Hardware Interfaces</h5>
                  <p className="text-gray-700">
                    No specific hardware interfaces are required beyond a standard computer with a web browser.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.1.3 Software Interfaces</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Python 3.9 or higher</li>
                    <li>Flask web framework</li>
                    <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                    <li>Chart.js for data visualization</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">3.2 Functional Requirements</h4>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.2.1 Journal Entry Management</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall allow users to add new journal entries with date, mood rating, and text</li>
                    <li>The system shall validate that all required fields are completed</li>
                    <li>The system shall display a confirmation message when an entry is saved</li>
                    <li>The system shall display all journal entries in reverse chronological order</li>
                    <li>The system shall allow filtering of entries by mood range or date range</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.2.2 Analytics and Reporting</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall calculate and display the average mood rating</li>
                    <li>The system shall identify and display the best day (highest mood rating)</li>
                    <li>The system shall identify and display the worst day (lowest mood rating)</li>
                    <li>The system shall generate a line chart showing mood trends over time</li>
                    <li>The system shall analyze journal text and display word frequency</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.2.3 Data Storage</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall store all journal entries in a JSON file</li>
                    <li>The system shall load existing entries when the application starts</li>
                    <li>The system shall save new entries to the JSON file</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.2.4 Project Report</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall provide a comprehensive project report</li>
                    <li>The report shall include project overview, architecture, and module details</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">3.3 Non-Functional Requirements</h4>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.3.1 Performance</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall load journal entries within 2 seconds</li>
                    <li>The system shall save new entries within 1 second</li>
                    <li>The system shall generate reports within 3 seconds</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.3.2 Usability</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The user interface shall be intuitive and easy to navigate</li>
                    <li>The system shall provide clear feedback for user actions</li>
                    <li>The system shall be responsive and work on different screen sizes</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.3.3 Reliability</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall handle errors gracefully and display appropriate error messages</li>
                    <li>The system shall not lose data in case of unexpected shutdowns</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-base font-medium text-gray-800 mb-2">3.3.4 Security</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The system shall store data locally without transmitting it over the network</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">4. System Features</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">4.1 Journal Entry System</h4>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Description:</h5>
                  <p className="text-gray-700 mb-2">
                    The journal entry system allows users to record their daily mood and thoughts.
                  </p>
                </div>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Stimulus/Response Sequences:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>User fills out the journal entry form</li>
                    <li>User submits the form</li>
                    <li>System validates the input</li>
                    <li>System saves the entry</li>
                    <li>System displays a confirmation message</li>
                    <li>System updates the entries list</li>
                  </ul>
                </div>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Functional Requirements:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>REQ-1: The system shall provide a form for entering journal entries</li>
                    <li>REQ-2: The system shall validate that all required fields are completed</li>
                    <li>REQ-3: The system shall save entries to the JSON file</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">4.2 Entry Filtering System</h4>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Description:</h5>
                  <p className="text-gray-700 mb-2">
                    The entry filtering system allows users to filter journal entries by mood or date range.
                  </p>
                </div>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Stimulus/Response Sequences:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>User sets filter parameters</li>
                    <li>User clicks "Apply Filter"</li>
                    <li>System retrieves filtered entries</li>
                    <li>System displays filtered entries</li>
                  </ul>
                </div>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Functional Requirements:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>REQ-4: The system shall allow filtering by mood range</li>
                    <li>REQ-5: The system shall allow filtering by date range</li>
                    <li>REQ-6: The system shall display filtered entries</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">4.3 Analytics System</h4>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Description:</h5>
                  <p className="text-gray-700 mb-2">
                    The analytics system provides insights into mood trends and journal content.
                  </p>
                </div>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Stimulus/Response Sequences:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>User navigates to the Reports page</li>
                    <li>System calculates mood statistics</li>
                    <li>System generates mood chart</li>
                    <li>System analyzes word frequency</li>
                    <li>System displays analytics</li>
                  </ul>
                </div>
                <div className="mb-2">
                  <h5 className="text-base font-medium text-gray-800 mb-1">Functional Requirements:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>REQ-7: The system shall calculate average mood</li>
                    <li>REQ-8: The system shall identify best and worst days</li>
                    <li>REQ-9: The system shall generate a mood trend chart</li>
                    <li>REQ-10: The system shall analyze word frequency</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">5. Other Requirements</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">5.1 Data Requirements</h4>
                <p className="text-gray-700 mb-2">The system shall store the following data for each journal entry:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Date (YYYY-MM-DD format)</li>
                  <li>Mood rating (integer from 1 to 10)</li>
                  <li>Journal text (free-form text)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">5.2 Constraints</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>The application must be implemented using Flask</li>
                  <li>The application must use object-oriented programming principles</li>
                  <li>The application must store data in JSON format</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-teal-600 mb-4">6. Appendices</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">6.1 Glossary</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>
                    <strong>Journal Entry:</strong> A record of a user's mood and thoughts for a specific date
                  </li>
                  <li>
                    <strong>Mood Rating:</strong> A numerical value from 1 to 10 representing the user's mood
                  </li>
                  <li>
                    <strong>Word Frequency:</strong> Analysis of how often specific words appear in journal entries
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">6.2 References</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>
                    Flask Documentation:{" "}
                    <a href="https://flask.palletsprojects.com/" className="text-teal-600 hover:underline">
                      https://flask.palletsprojects.com/
                    </a>
                  </li>
                  <li>
                    Chart.js Documentation:{" "}
                    <a href="https://www.chartjs.org/docs/" className="text-teal-600 hover:underline">
                      https://www.chartjs.org/docs/
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="architecture" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">System Architecture</h2>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Architecture Overview</h3>
              <p className="text-gray-700 mb-6">
                The Mental Health Tracker follows a Model-View-Controller (MVC) architecture pattern. The system is
                divided into three main components:
              </p>

              <div className="mb-8">
                <img
                  src="/architecture-diagram.png"
                  alt="Architecture Diagram"
                  className="w-full max-w-3xl mx-auto border rounded-lg shadow-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-lg font-medium text-teal-700 mb-2">Model</h4>
                  <p className="text-gray-700">
                    Handles data management and business logic. Includes classes for journal entries, data storage, and
                    analytics processing.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-lg font-medium text-teal-700 mb-2">View</h4>
                  <p className="text-gray-700">
                    Handles the presentation layer. Includes HTML templates, CSS styling, and JavaScript for dynamic
                    content and visualizations.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-lg font-medium text-teal-700 mb-2">Controller</h4>
                  <p className="text-gray-700">
                    Handles user input and application flow. Includes Flask routes that process requests and coordinate
                    between Model and View.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Component Details</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Backend Components</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>Flask Application (app.py):</strong> The main entry point that initializes the application
                    and defines routes.
                  </li>
                  <li>
                    <strong>JournalEntry Class:</strong> Represents individual journal entries with date, mood, and text
                    attributes.
                  </li>
                  <li>
                    <strong>MentalHealthTracker Class:</strong> Manages journal entries and provides methods for
                    filtering and retrieval.
                  </li>
                  <li>
                    <strong>StorageManager Class:</strong> Handles data persistence using JSON file storage.
                  </li>
                  <li>
                    <strong>Analytics Class:</strong> Provides statistical analysis and reporting on journal entries.
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Frontend Components</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>HTML Templates:</strong> Define the structure of the web pages.
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li>index.html: Main journal entry page</li>
                      <li>reports.html: Analytics dashboard</li>
                      <li>project_report.html: Project documentation</li>
                    </ul>
                  </li>
                  <li>
                    <strong>CSS Stylesheets:</strong> Define the visual appearance of the application.
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li>styles.css: Main stylesheet</li>
                      <li>project-report.css: Styles for the project report</li>
                    </ul>
                  </li>
                  <li>
                    <strong>JavaScript Files:</strong> Provide dynamic behavior and interactivity.
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li>journal.js: Handles journal entry form and list</li>
                      <li>reports.js: Handles analytics and visualizations</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Data Storage</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>JSON File:</strong> Stores journal entries in a structured format.
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li>data/journal_entries.json: Contains serialized journal entries</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Interaction Flow</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Adding a Journal Entry</h4>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>User fills out the journal entry form in the browser</li>
                  <li>JavaScript validates the form input</li>
                  <li>Form data is sent to the Flask backend via a POST request to /entries</li>
                  <li>Flask route extracts the data and calls tracker.add_entry()</li>
                  <li>MentalHealthTracker creates a new JournalEntry object</li>
                  <li>StorageManager saves the updated entries list to the JSON file</li>
                  <li>Flask returns a success response</li>
                  <li>JavaScript updates the UI to show the new entry</li>
                </ol>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Viewing Analytics</h4>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>User navigates to the Reports page</li>
                  <li>Browser loads reports.html template</li>
                  <li>JavaScript makes API requests to fetch analytics data</li>
                  <li>Flask routes process the requests and call Analytics methods</li>
                  <li>Analytics class processes the journal entries and calculates statistics</li>
                  <li>Flask returns the analytics data as JSON</li>
                  <li>JavaScript renders the data using Chart.js and DOM manipulation</li>
                </ol>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Technology Stack</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-lg font-medium text-teal-700 mb-2">Backend</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Python 3.9+</li>
                    <li>Flask Web Framework</li>
                    <li>JSON for data storage</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-lg font-medium text-teal-700 mb-2">Frontend</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>JavaScript (ES6+)</li>
                    <li>Chart.js for data visualization</li>
                  </ul>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="class-diagram" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">Class Diagram</h2>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">UML Class Diagram</h3>
              <p className="text-gray-700 mb-6">
                The following UML class diagram illustrates the structure and relationships between the classes in the
                Mental Health Tracker application:
              </p>

              <div className="mb-8">
                <img
                  src="/class-diagram.png"
                  alt="UML Class Diagram"
                  className="w-full max-w-4xl mx-auto border rounded-lg shadow-md"
                />
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Class Descriptions</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">JournalEntry</h4>
                <p className="text-gray-700 mb-2">
                  Represents an individual journal entry with date, mood rating, and text content.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border mb-2">
                  <h5 className="font-medium text-gray-800 mb-1">Attributes:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>date: string - The date of the entry in YYYY-MM-DD format</li>
                    <li>mood: int - The mood rating from 1 to 10</li>
                    <li>text: string - The journal entry text</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-1">Methods:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>to_dict(): dict - Converts the entry to a dictionary for serialization</li>
                    <li>from_dict(data: dict): JournalEntry - Creates an entry from a dictionary (class method)</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">StorageManager</h4>
                <p className="text-gray-700 mb-2">
                  Handles the persistence of journal entries using JSON file storage.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border mb-2">
                  <h5 className="font-medium text-gray-800 mb-1">Attributes:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>file_path: string - The path to the JSON file</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-1">Methods:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>save_entries(entries: list): void - Saves entries to the JSON file</li>
                    <li>load_entries(): list - Loads entries from the JSON file</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">MentalHealthTracker</h4>
                <p className="text-gray-700 mb-2">
                  Manages journal entries and provides methods for adding, retrieving, and filtering entries.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border mb-2">
                  <h5 className="font-medium text-gray-800 mb-1">Attributes:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>storage: StorageManager - The storage manager for persistence</li>
                    <li>entries: list - The list of journal entries</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-1">Methods:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>add_entry(date: string, mood: int, text: string): JournalEntry - Adds a new entry</li>
                    <li>get_all_entries(): list - Returns all entries sorted by date</li>
                    <li>
                      get_entries_by_date_range(start_date: string, end_date: string): list - Filters entries by date
                      range
                    </li>
                    <li>
                      get_entries_by_mood_range(min_mood: int, max_mood: int): list - Filters entries by mood range
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Analytics</h4>
                <p className="text-gray-700 mb-2">Provides statistical analysis and reporting on journal entries.</p>
                <div className="bg-gray-50 p-4 rounded-lg border mb-2">
                  <h5 className="font-medium text-gray-800 mb-1">Attributes:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>tracker: MentalHealthTracker - The tracker containing entries to analyze</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-1">Methods:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>get_average_mood(): float - Calculates the average mood rating</li>
                    <li>get_best_day(): JournalEntry - Returns the entry with the highest mood</li>
                    <li>get_worst_day(): JournalEntry - Returns the entry with the lowest mood</li>
                    <li>get_mood_data_for_chart(): dict - Formats mood data for charting</li>
                    <li>get_word_frequency(top_n: int): dict - Analyzes word frequency in journal entries</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Flask Application</h4>
                <p className="text-gray-700 mb-2">
                  The main Flask application that defines routes and handles HTTP requests.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-1">Routes:</h5>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>/ (GET): Renders the main journal page</li>
                    <li>/entries (GET): Returns all journal entries</li>
                    <li>/entries (POST): Adds a new journal entry</li>
                    <li>/entries/filter (GET): Returns filtered entries</li>
                    <li>/reports (GET): Renders the reports page</li>
                    <li>/api/mood-data (GET): Returns mood data for charts</li>
                    <li>/api/word-frequency (GET): Returns word frequency data</li>
                    <li>/api/mood-stats (GET): Returns mood statistics</li>
                    <li>/project-report (GET): Renders the project report page</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Class Relationships</h3>

              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>MentalHealthTracker → StorageManager:</strong> The MentalHealthTracker has a composition
                  relationship with StorageManager. It creates and owns a StorageManager instance for data persistence.
                </li>
                <li>
                  <strong>MentalHealthTracker → JournalEntry:</strong> The MentalHealthTracker has an aggregation
                  relationship with JournalEntry. It contains a list of JournalEntry objects but does not own their
                  lifecycle.
                </li>
                <li>
                  <strong>Analytics → MentalHealthTracker:</strong> The Analytics class has an association relationship
                  with MentalHealthTracker. It references a tracker instance but does not own it.
                </li>
                <li>
                  <strong>Flask Application → MentalHealthTracker:</strong> The Flask application creates and uses a
                  MentalHealthTracker instance to handle journal entries.
                </li>
                <li>
                  <strong>Flask Application → Analytics:</strong> The Flask application creates and uses an Analytics
                  instance to generate reports.
                </li>
              </ul>
            </section>
          </TabsContent>

          <TabsContent value="database" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">Data Model</h2>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Data Storage Overview</h3>
              <p className="text-gray-700 mb-4">
                The Mental Health Tracker uses a file-based storage system with JSON as the data format. This approach
                was chosen for its simplicity and compatibility with the object-oriented design of the application.
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">JSON File Structure</h4>
                <p className="text-gray-700 mb-4">
                  All journal entries are stored in a single JSON file located at <code>data/journal_entries.json</code>
                  . The file contains an array of journal entry objects, each with the following structure:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                  <pre className="text-sm overflow-x-auto">
                    {`[
  {
    "date": "2025-04-15",
    "mood": 8,
    "text": "Today was a productive day. I completed my project and felt accomplished."
  },
  {
    "date": "2025-04-14",
    "mood": 5,
    "text": "Average day, nothing special happened."
  },
  {
    "date": "2025-04-13",
    "mood": 3,
    "text": "Feeling a bit down today. The weather was gloomy and I didn't get much done."
  }
]`}
                  </pre>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Data Model Diagram</h3>
              <p className="text-gray-700 mb-6">
                The following diagram illustrates the data model of the Mental Health Tracker application:
              </p>

              <div className="mb-8">
                <img
                  src="/data-model-diagram.png"
                  alt="Data Model Diagram"
                  className="w-full max-w-3xl mx-auto border rounded-lg shadow-md"
                />
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Data Entities</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">JournalEntry</h4>
                <p className="text-gray-700 mb-4">
                  The primary data entity in the application is the JournalEntry, which represents a single journal
                  entry made by the user.
                </p>

                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-teal-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Attribute</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">date</td>
                      <td className="border border-gray-300 px-4 py-2">string</td>
                      <td className="border border-gray-300 px-4 py-2">The date of the journal entry</td>
                      <td className="border border-gray-300 px-4 py-2">Required, YYYY-MM-DD format</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">mood</td>
                      <td className="border border-gray-300 px-4 py-2">integer</td>
                      <td className="border border-gray-300 px-4 py-2">The mood rating for the day</td>
                      <td className="border border-gray-300 px-4 py-2">Required, Range: 1-10</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">text</td>
                      <td className="border border-gray-300 px-4 py-2">string</td>
                      <td className="border border-gray-300 px-4 py-2">The journal entry text</td>
                      <td className="border border-gray-300 px-4 py-2">Required, No length limit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Data Access Layer</h3>
              <p className="text-gray-700 mb-4">
                The StorageManager class serves as the data access layer for the application. It provides methods for
                reading from and writing to the JSON file.
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Key Methods</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>load_entries():</strong> Reads the JSON file and deserializes the data into JournalEntry
                    objects.
                    <pre className="bg-gray-50 p-3 mt-2 rounded-lg border text-sm overflow-x-auto">
                      {`def load_entries(self):
    if not os.path.exists(self.file_path):
        return []
    
    try:
        with open(self.file_path, 'r') as f:
            data = json.load(f)
            return [JournalEntry.from_dict(entry) for entry in data]
    except (json.JSONDecodeError, FileNotFoundError):
        return []`}
                    </pre>
                  </li>
                  <li>
                    <strong>save_entries(entries):</strong> Serializes JournalEntry objects and writes them to the JSON
                    file.
                    <pre className="bg-gray-50 p-3 mt-2 rounded-lg border text-sm overflow-x-auto">
                      {`def save_entries(self, entries):
    with open(self.file_path, 'w') as f:
        json.dump([entry.to_dict() for entry in entries], f, indent=2)`}
                    </pre>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Data Flow</h3>
              <p className="text-gray-700 mb-4">
                The following diagram illustrates the data flow in the Mental Health Tracker application:
              </p>

              <div className="mb-8">
                <img
                  src="/data-flow-diagram.png"
                  alt="Data Flow Diagram"
                  className="w-full max-w-3xl mx-auto border rounded-lg shadow-md"
                />
              </div>

              <p className="text-gray-700 mb-4">The data flow process follows these steps:</p>

              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>User submits a journal entry through the web interface</li>
                <li>The Flask application receives the request and extracts the data</li>
                <li>The MentalHealthTracker creates a new JournalEntry object</li>
                <li>The StorageManager serializes the entries and saves them to the JSON file</li>
                <li>When retrieving entries, the StorageManager reads the JSON file and deserializes the data</li>
                <li>The MentalHealthTracker provides the entries to the Flask application</li>
                <li>The Flask application sends the data to the frontend for display</li>
              </ol>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-100 p-4 border-t mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Mental Health Tracker Documentation | A Flask & Python Project</p>
        </div>
      </footer>
    </div>
  )
}
