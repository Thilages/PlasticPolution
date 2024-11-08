from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import sqlite3
from ultralytics import YOLO
import cv2

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
DATABASE = './plastic_locations.db'

# Ensure the upload folder and database exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# Initialize database connection
def init_db():
    with sqlite3.connect(DATABASE) as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS PlasticLocations (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        filename TEXT,
                        latitude REAL,
                        longitude REAL,
                        detected INTEGER,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')


def process_image(image_path):
    trained_model = YOLO("./best.pt")


# Run inference with the YOLO model on the sample image
    results = trained_model(image_path)

    # Set the confidence threshold
    confidence_threshold = 0.4

    # Extract detections
    detections = results[0].boxes

    # Filter detections with confidence above the threshold
    filtered_detections = [box for box in detections if box.conf[0] > confidence_threshold]

    # Check if any valid objects were detected
    object_found = len(filtered_detections) > 0
    if object_found:
        print("Plastic object detected")
    else:
        print("No Plastic object detected")
    # print(object_found)
    return object_found

@app.route('/upload', methods=['POST'])
def upload():
    if 'photo' not in request.files:
        return jsonify({'error': 'No photo file uploaded'}), 400

    photo = request.files['photo']
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')

    # Save the photo file locally
    file_path = os.path.join(UPLOAD_FOLDER, photo.filename)
    photo.save(file_path)

    # Store verified data in the database
    if process_image(file_path):
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''INSERT INTO PlasticLocations (filename, latitude, longitude, detected)
                              VALUES (?, ?, ?, ?)''',
                           (photo.filename, latitude, longitude, 1))
            conn.commit()

    return jsonify({
        'message': 'Photo uploaded successfully!',
        'latitude': latitude,
        'longitude': longitude,
    }), 200


@app.route('/get_locations', methods=['GET'])
def get_locations():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT latitude, longitude FROM PlasticLocations WHERE detected = 1")
        locations = cursor.fetchall()

    # Convert locations to a list of dictionaries
    location_list = [{'latitude': loc[0], 'longitude': loc[1]} for loc in locations]
    return jsonify(location_list)


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
