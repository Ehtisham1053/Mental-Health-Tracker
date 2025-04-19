// Fetch journal entries from the Flask API
fetch('/api/journal-entries')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Perform analytics on the data
    const moods = data.map(entry => entry.mood);
    const dates = data.map(entry => entry.date);
    const texts = data.map(entry => entry.text);

    // Calculate average mood
    const averageMood = moods.reduce((a, b) => a + b, 0) / moods.length;

    // Find best and worst days
    const bestDay = data.reduce((max, entry) => (entry.mood > max.mood ? entry : max), data[0]);
    const worstDay = data.reduce((min, entry) => (entry.mood < min.mood ? entry : min), data[0]);

    // Update the DOM with the analytics
    document.getElementById('averageMood').querySelector('.stat-value').textContent = averageMood.toFixed(2);
    document.getElementById('bestDay').querySelector('.stat-value').textContent = bestDay.mood;
    document.getElementById('bestDay').querySelector('.stat-details').textContent = `Date: ${bestDay.date}, Mood: ${bestDay.mood}, Journal: "${bestDay.text}"`;
    document.getElementById('worstDay').querySelector('.stat-value').textContent = worstDay.mood;
    document.getElementById('worstDay').querySelector('.stat-details').textContent = `Date: ${worstDay.date}, Mood: ${worstDay.mood}, Journal: "${worstDay.text}"`;

    // Generate Mood Trends Chart
    const ctx = document.getElementById('moodChart').getContext('2d');
    const moodChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Mood Trend',
          data: moods,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    });

    // Generate Word Cloud
    const wordFrequency = getWordFrequency(texts);
    const wordCloudData = Object.entries(wordFrequency).map(([word, count]) => ({ text: word, weight: count }));
    createWordCloud(wordCloudData);
  })
  .catch(error => {
    console.error('Error fetching journal entries:', error);
  });

// Function to calculate word frequency from journal entries
function getWordFrequency(texts) {
  const wordFrequency = {};
  texts.forEach(text => {
    const words = text.toLowerCase().split(/\W+/);
    words.forEach(word => {
      if (word && word.length > 1) {
        wordFrequency[word] = wordFrequency[word] ? wordFrequency[word] + 1 : 1;
      }
    });
  });
  return wordFrequency;
}

// Function to create a word cloud (basic implementation)
function createWordCloud(wordCloudData) {
  const ctx = document.getElementById('wordCloud').getContext('2d');
  const maxWordCount = Math.max(...wordCloudData.map(item => item.weight));
  
  wordCloudData.forEach(item => {
    item.size = (item.weight / maxWordCount) * 30 + 10; // Scale font size based on frequency
  });

  const wordCloud = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Word Cloud',
        data: wordCloudData.map(item => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: item.size
        })),
        backgroundColor: 'rgba(75, 192, 192, 1)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { min: 0, max: 100 },
        y: { min: 0, max: 100 }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return wordCloudData[tooltipItem.dataIndex].text + ': ' + wordCloudData[tooltipItem.dataIndex].weight;
            }
          }
        }
      }
    }
  });
}
