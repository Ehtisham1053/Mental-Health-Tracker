from flask import Flask, request, jsonify, render_template, send_from_directory
import os
import json
from datetime import datetime
from collections import Counter
import re
import traceback
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

# Ensure the data directory exists
os.makedirs('data', exist_ok=True)

class JournalEntry:
    def __init__(self, date, mood, text):
        self.date = date
        self.mood = mood
        self.text = text
    
    def to_dict(self):
        return {
            'date': self.date,
            'mood': self.mood,
            'text': self.text
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(data['date'], data['mood'], data['text'])


class StorageManager:
    def __init__(self, file_path='data/journal_entries.json'):
        self.file_path = file_path
        # Ensure the data directory exists
        os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
        # Create an empty JSON file if it doesn't exist
        if not os.path.exists(self.file_path):
            with open(self.file_path, 'w') as f:
                json.dump([], f)
    
    def save_entries(self, entries):
        with open(self.file_path, 'w') as f:
            json.dump([entry.to_dict() for entry in entries], f, indent=2)
    
    def load_entries(self):
        if not os.path.exists(self.file_path):
            return []
        
        try:
            with open(self.file_path, 'r') as f:
                data = json.load(f)
                return [JournalEntry.from_dict(entry) for entry in data]
        except (json.JSONDecodeError, FileNotFoundError) as e:
            logger.error(f"Error loading entries: {str(e)}")
            # If there's an error reading the file, create a new empty file
            with open(self.file_path, 'w') as f:
                json.dump([], f)
            return []


class MentalHealthTracker:
    def __init__(self):
        self.storage = StorageManager()
        self.entries = self.storage.load_entries()
    
    def add_entry(self, date, mood, text):
        entry = JournalEntry(date, mood, text)
        self.entries.append(entry)
        self.storage.save_entries(self.entries)
        return entry
    
    def get_all_entries(self):
        return sorted(self.entries, key=lambda x: x.date, reverse=True)
    
    def get_entries_by_date_range(self, start_date, end_date):
        return [e for e in self.entries if start_date <= e.date <= end_date]
    
    def get_entries_by_mood_range(self, min_mood, max_mood):
        return [e for e in self.entries if min_mood <= e.mood <= max_mood]


class Analytics:
    def __init__(self, tracker):
        self.tracker = tracker
    
    def get_average_mood(self):
        if not self.tracker.entries:
            return 0
        return sum(entry.mood for entry in self.tracker.entries) / len(self.tracker.entries)
    
    def get_best_day(self):
        if not self.tracker.entries:
            return None
        return max(self.tracker.entries, key=lambda x: x.mood)
    
    def get_worst_day(self):
        if not self.tracker.entries:
            return None
        return min(self.tracker.entries, key=lambda x: x.mood)
    
    def get_mood_data_for_chart(self):
        entries = sorted(self.tracker.entries, key=lambda x: x.date)
        return {
            'dates': [entry.date for entry in entries],
            'moods': [entry.mood for entry in entries]
        }
    
    def get_word_frequency(self, top_n=10):
        if not self.tracker.entries:
            return {}
        
        all_text = ' '.join(entry.text for entry in self.tracker.entries)
        # Remove special characters and convert to lowercase
        all_text = re.sub(r'[^\w\s]', '', all_text.lower())
        
        # Filter out common stop words
        stop_words = {'the', 'a', 'an', 'and', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'but', 'or', 'as', 'if', 'while', 'because', 'so', 'than', 'that', 'this', 'these', 'those', 'then', 'just', 'now', 'only', 'very', 'not', 'no', 'can', 'will', 'should', 'would', 'could', 'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves'}
        
        words = [word for word in all_text.split() if word not in stop_words and len(word) > 2]
        word_counts = Counter(words)
        
        return dict(word_counts.most_common(top_n))


# Initialize the tracker and analytics
tracker = MentalHealthTracker()
analytics = Analytics(tracker)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/entries', methods=['GET'])
def get_entries():
    entries = tracker.get_all_entries()
    return jsonify([entry.to_dict() for entry in entries])

@app.route('/entries', methods=['POST'])
def add_entry():
    try:
        data = request.json
        logger.debug(f"Received entry data: {data}")
        
        date = data.get('date')
        mood = int(data.get('mood'))
        text = data.get('text')
        
        if not date or not 1 <= mood <= 10 or not text:
            return jsonify({'error': 'Invalid entry data'}), 400
        
        entry = tracker.add_entry(date, mood, text)
        return jsonify(entry.to_dict()), 201
    except Exception as e:
        logger.error(f"Error adding entry: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/entries/filter', methods=['GET'])
def filter_entries():
    try:
        min_mood = request.args.get('min_mood', type=int, default=1)
        max_mood = request.args.get('max_mood', type=int, default=10)
        start_date = request.args.get('start_date', default='')
        end_date = request.args.get('end_date', default='')
        
        logger.debug(f"Filter params: min_mood={min_mood}, max_mood={max_mood}, start_date={start_date}, end_date={end_date}")
        
        if start_date and end_date:
            entries = tracker.get_entries_by_date_range(start_date, end_date)
        else:
            entries = tracker.get_entries_by_mood_range(min_mood, max_mood)
        
        return jsonify([entry.to_dict() for entry in entries])
    except Exception as e:
        logger.error(f"Error filtering entries: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/reports')
def reports():
    logger.debug("Rendering reports page")
    return render_template('reports.html')

@app.route('/api/mood-data')
def mood_data():
    try:
        data = analytics.get_mood_data_for_chart()
        logger.debug(f"Mood data: {data}")
        return jsonify(data)
    except Exception as e:
        logger.error(f"Error in mood-data endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/word-frequency')
def word_frequency():
    try:
        top_n = request.args.get('top_n', type=int, default=10)
        data = analytics.get_word_frequency(top_n)
        logger.debug(f"Word frequency data: {data}")
        return jsonify(data)
    except Exception as e:
        logger.error(f"Error in word-frequency endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


@app.route('/api/journal-entries')
def get_journal_entries():
    try:
        with open('data/journal_entries.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        logger.error(f"Error reading journal entries: {str(e)}")
        return jsonify({'error': 'Unable to read journal entries'}), 500



@app.route('/api/mood-stats')
def mood_stats():
    try:
        best_day = analytics.get_best_day()
        worst_day = analytics.get_worst_day()
        
        data = {
            'average_mood': analytics.get_average_mood(),
            'best_day': best_day.to_dict() if best_day else None,
            'worst_day': worst_day.to_dict() if worst_day else None
        }
        logger.debug(f"Mood stats: {data}")
        return jsonify(data)
    except Exception as e:
        logger.error(f"Error in mood-stats endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/project-report')
def project_report():
    return render_template('project_report.html')

@app.route('/documentation')
def documentation():
    # Render the documentation template instead of redirecting
    return render_template('documentation.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True, port=5328)
