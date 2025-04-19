import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Terminal, ExternalLink, FileCode, Database, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RunInstructions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mental Health Tracker</h1>
            <Link href="/">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/documentation">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Button>
          </Link>
          <h2 className="text-2xl font-bold text-teal-700">Running the Application</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center text-teal-700">
                <Terminal className="mr-2 h-5 w-5" />
                Setup Environment
              </CardTitle>
              <CardDescription>Prepare your system to run the application</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Before running the application, you need to set up a Python environment with the required dependencies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center text-teal-700">
                <FileCode className="mr-2 h-5 w-5" />
                Run Application
              </CardTitle>
              <CardDescription>Start the Flask server</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Launch the Flask application to start the web server and make the application accessible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center text-teal-700">
                <ExternalLink className="mr-2 h-5 w-5" />
                Access Interface
              </CardTitle>
              <CardDescription>Use the web interface</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Access the web interface through your browser to start using the Mental Health Tracker.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="setup">Environment Setup</TabsTrigger>
            <TabsTrigger value="run">Running the App</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-4">Setting Up Your Environment</h3>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">1. Prerequisites</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Python 3.9 or higher installed on your system</li>
                <li>pip (Python package installer)</li>
                <li>Git (optional, for cloning the repository)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">2. Create a Virtual Environment (Recommended)</h4>
              <p className="text-gray-700 mb-3">
                It's best practice to create a virtual environment to isolate the project dependencies:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Navigate to your project directory
                  <br />
                  cd path/to/mental_health_tracker
                  <br />
                  <br /># Create a virtual environment
                  <br />
                  python -m venv venv
                  <br />
                  <br /># Activate the virtual environment
                  <br /># On Windows:
                  <br />
                  venv\Scripts\activate
                  <br />
                  <br /># On macOS/Linux:
                  <br />
                  source venv/bin/activate
                </p>
              </div>
              <p className="text-gray-700 text-sm">
                After activation, your command prompt should show the virtual environment name, like (venv).
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">3. Install Required Dependencies</h4>
              <p className="text-gray-700 mb-3">Install the necessary Python packages:</p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Make sure your virtual environment is activated
                  <br />
                  pip install flask
                </p>
              </div>
              <p className="text-gray-700 text-sm">
                This will install Flask and its dependencies. The application doesn't require any additional packages.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">4. Verify Installation</h4>
              <p className="text-gray-700 mb-3">Verify that Flask is installed correctly:</p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">python -c "import flask; print(flask.__version__)"</p>
              </div>
              <p className="text-gray-700 text-sm">
                This should print the Flask version number. If you see an error, the installation was not successful.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="run" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-4">Running the Application</h3>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">1. Ensure Your Environment is Ready</h4>
              <p className="text-gray-700 mb-3">
                Make sure you've completed all the steps in the Environment Setup tab and your virtual environment is
                activated.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">2. Navigate to the API Directory</h4>
              <p className="text-gray-700 mb-3">
                The Flask application is located in the api directory. Navigate to it:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">cd api</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">3. Run the Flask Application</h4>
              <p className="text-gray-700 mb-3">Start the Flask development server:</p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # On Windows:
                  <br />
                  python app.py
                  <br />
                  <br /># On macOS/Linux:
                  <br />
                  python app.py
                </p>
              </div>
              <p className="text-gray-700 text-sm">
                You should see output similar to:
                <br />
                <span className="font-mono">
                  * Running on http://127.0.0.1:5328/ (Press CTRL+C to quit)
                  <br />* Restarting with stat
                  <br />* Debugger is active!
                  <br />* Debugger PIN: 123-456-789
                </span>
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">4. Alternative: Using Flask Command</h4>
              <p className="text-gray-700 mb-3">
                You can also run the application using the Flask command-line interface:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Set the FLASK_APP environment variable
                  <br /># On Windows:
                  <br />
                  set FLASK_APP=app.py
                  <br />
                  <br /># On macOS/Linux:
                  <br />
                  export FLASK_APP=app.py
                  <br />
                  <br /># Run Flask
                  <br />
                  flask run --port=5328
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">5. Access the Web Interface</h4>
              <p className="text-gray-700 mb-3">Once the server is running, open your web browser and navigate to:</p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">http://localhost:5328</p>
              </div>
              <p className="text-gray-700 text-sm">
                You should see the Mental Health Tracker home page. From here, you can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
                <li>Add new journal entries</li>
                <li>View and filter existing entries</li>
                <li>Access the reports page for analytics</li>
                <li>View the project report</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">6. Stopping the Application</h4>
              <p className="text-gray-700 mb-3">
                To stop the Flask server, press <span className="font-mono">CTRL+C</span> in the terminal where it's
                running.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-4">Troubleshooting Common Issues</h3>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Port Already in Use</h4>
              <p className="text-gray-700 mb-3">
                If you see an error like <span className="font-mono">OSError: [Errno 98] Address already in use</span>,
                it means port 5328 is already being used by another application.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Modify app.py to use a different port
                  <br /># Change the last line to:
                  <br />
                  app.run(debug=True, port=5000) # or any other available port
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Module Not Found Error</h4>
              <p className="text-gray-700 mb-3">
                If you see an error like <span className="font-mono">ModuleNotFoundError: No module named 'flask'</span>
                , it means Flask is not installed in your current environment.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Make sure your virtual environment is activated, then:
                  <br />
                  pip install flask
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Permission Denied for Data Directory</h4>
              <p className="text-gray-700 mb-3">
                If the application fails to start with a permission error when trying to create or access the data
                directory:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Manually create the data directory with appropriate permissions
                  <br /># On Windows:
                  <br />
                  mkdir data
                  <br />
                  <br /># On macOS/Linux:
                  <br />
                  mkdir -p data
                  <br />
                  chmod 755 data
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">JSON Decode Error</h4>
              <p className="text-gray-700 mb-3">
                If you see errors related to JSON decoding when the application starts, it might be due to a corrupted
                data file:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border mb-3">
                <p className="font-mono text-sm">
                  # Backup the existing file (if needed) and create a new empty one
                  <br /># On Windows:
                  <br />
                  if exist data\journal_entries.json rename data\journal_entries.json data\journal_entries.json.bak
                  <br />
                  echo [] > data\journal_entries.json
                  <br />
                  <br /># On macOS/Linux:
                  <br />[ -f data/journal_entries.json ] && mv data/journal_entries.json data/journal_entries.json.bak
                  <br />
                  echo "[]" > data/journal_entries.json
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Browser Cannot Connect</h4>
              <p className="text-gray-700 mb-3">
                If your browser cannot connect to the application (shows "This site can't be reached"):
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Verify the Flask server is running and doesn't show any errors in the terminal</li>
                <li>Check that you're using the correct URL (http://localhost:5328 or the port you specified)</li>
                <li>Try using 127.0.0.1 instead of localhost: http://127.0.0.1:5328</li>
                <li>Check if your firewall is blocking the connection</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-6">
              <h4 className="text-lg font-medium text-yellow-800 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Need Further Assistance?
              </h4>
              <p className="text-yellow-800">
                If you're still experiencing issues, check the Flask documentation or create an issue in the project
                repository with details about the problem you're encountering.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-teal-50 p-6 rounded-lg border border-teal-100 mt-8">
          <h3 className="text-xl font-semibold text-teal-700 mb-4 flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Data Storage Information
          </h3>
          <p className="text-gray-700 mb-4">
            The Mental Health Tracker stores all journal entries in a JSON file located at{" "}
            <span className="font-mono">data/journal_entries.json</span>. This file is created automatically when you
            add your first journal entry.
          </p>
          <p className="text-gray-700">
            If you want to back up your journal entries, simply make a copy of this file. To restore from a backup,
            replace the file with your backup copy when the application is not running.
          </p>
        </div>
      </main>

      <footer className="bg-gray-100 p-4 border-t mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Mental Health Tracker | A Flask & Python Project</p>
        </div>
      </footer>
    </div>
  )
}
