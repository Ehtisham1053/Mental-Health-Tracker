document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      button.classList.add("active")
      const tabId = button.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // PDF Download functionality
  const downloadButton = document.getElementById("downloadPdf")

  downloadButton.addEventListener("click", () => {
    // Create a new window with printable content
    const printWindow = window.open("", "_blank")
    const activeTab = document.querySelector(".tab-pane.active")
    const tabTitle = document.querySelector(".tab-button.active").textContent

    // Create printable content
    printWindow.document.write(`
      <html>
        <head>
          <title>Mental Health Tracker - ${tabTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
            h1, h2, h3, h4, h5 { color: #2980b9; }
            img { max-width: 100%; height: auto; }
            .page-break { page-break-after: always; }
            pre { background-color: #f8f8f8; padding: 10px; border-radius: 4px; overflow-x: auto; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Mental Health Tracker Documentation</h1>
          <h2>${tabTitle}</h2>
          ${activeTab.innerHTML}
        </body>
      </html>
    `)

    // Trigger print dialog
    printWindow.document.close()
    printWindow.focus()

    // Add a slight delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print()
      // Close the window after printing (optional)
      // printWindow.close()
    }, 500)
  })
})
