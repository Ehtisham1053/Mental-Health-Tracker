document.addEventListener("DOMContentLoaded", () => {
  // Set default date to today
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("date").value = today

  // Update mood value display when slider changes
  const moodSlider = document.getElementById("mood")
  const moodValue = document.getElementById("moodValue")

  moodSlider.addEventListener("input", function () {
    moodValue.textContent = this.value
  })

  // Form submission
  const entryForm = document.getElementById("entryForm")
  entryForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const date = document.getElementById("date").value
    const mood = Number.parseInt(document.getElementById("mood").value)
    const text = document.getElementById("text").value

    if (!date || !mood || !text) {
      alert("Please fill in all fields")
      return
    }

    const entry = { date, mood, text }

    fetch("/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save entry")
        }
        return response.json()
      })
      .then((data) => {
        // Reset form
        document.getElementById("text").value = ""
        document.getElementById("mood").value = "5"
        document.getElementById("moodValue").textContent = "5"

        // Reload entries
        loadEntries()

        // Show success message
        alert("Journal entry saved successfully!")
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Failed to save entry. Please try again.")
      })
  })

  // Filter controls
  const applyFilterBtn = document.getElementById("applyFilter")
  const resetFilterBtn = document.getElementById("resetFilter")

  applyFilterBtn.addEventListener("click", () => {
    loadEntries(true)
  })

  resetFilterBtn.addEventListener("click", () => {
    document.getElementById("minMood").value = "1"
    document.getElementById("maxMood").value = "10"
    document.getElementById("startDate").value = ""
    document.getElementById("endDate").value = ""
    loadEntries()
  })

  // Load entries on page load
  loadEntries()

  // Function to load entries with optional filtering
  function loadEntries(filter = false) {
    const entriesList = document.getElementById("entriesList")
    entriesList.innerHTML = '<div class="loading">Loading entries...</div>'

    let url = "/entries"

    if (filter) {
      const minMood = document.getElementById("minMood").value
      const maxMood = document.getElementById("maxMood").value
      const startDate = document.getElementById("startDate").value
      const endDate = document.getElementById("endDate").value

      url = "/entries/filter?"

      if (startDate && endDate) {
        url += `start_date=${startDate}&end_date=${endDate}`
      } else {
        url += `min_mood=${minMood}&max_mood=${maxMood}`
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then((entries) => {
        if (entries.length === 0) {
          entriesList.innerHTML =
            '<div class="no-entries">No journal entries found. Start journaling to see entries here.</div>'
          return
        }

        entriesList.innerHTML = ""

        entries.forEach((entry) => {
          const entryCard = document.createElement("div")
          entryCard.className = "entry-card"

          let moodClass = "mood-medium"
          if (entry.mood >= 8) {
            moodClass = "mood-high"
          } else if (entry.mood <= 3) {
            moodClass = "mood-low"
          }

          // Format date for display
          const dateObj = new Date(entry.date)
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          entryCard.innerHTML = `
                        <div class="entry-header">
                            <span class="entry-date">${formattedDate}</span>
                            <span class="entry-mood ${moodClass}">Mood: ${entry.mood}/10</span>
                        </div>
                        <div class="entry-text">${entry.text}</div>
                    `

          entriesList.appendChild(entryCard)
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        entriesList.innerHTML = '<div class="error">Failed to load entries. Please try again.</div>'
      })
  }
})
