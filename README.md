# KSR-GDG

# Oceanic Plastic Detection and Marine Conservation Dashboard

![WhatsApp Image 2024-11-08 at 9 06 05 AM](https://github.com/user-attachments/assets/d67d2899-d127-4b54-adee-c5e0e50877bb)


## Overview

- *Problem*: Rising plastic pollution threatens marine ecosystems, biodiversity, and human health, creating an urgent need for effective identification and classification of oceanic plastic waste.
- *Solution*: A technology-driven system that combines precise plastic detection with community incentives to support sustainable ocean conservation efforts.
- *Impact*: This solution will help mitigate oceanic plastic pollution, protect endangered marine species, and engage communities in marine conservation activities.

![WhatsApp Image 2024-11-08 at 9 06 07 AM](https://github.com/user-attachments/assets/3a2a7031-0141-488f-9300-bf1d5bb3318b)



## Components
-React Native Mobile App: Scans images and sends them to the Flask server, along with user location.
-Flask Server: Manages image data from the mobile app and stores it with metadata.
-Web Application: Displays the collected data in a user-friendly dashboard format.

## Features

1. *Plastic Detection & Location Tracking*
   - Utilizes smartphone camera and GPS to capture images and locations of plastic waste in land and delta water areas (rivers, lakes).
   - Data (images and coordinates) is uploaded to a centralized server.
   - The data is visualized as a heatmap on a website, showing the distribution of plastic waste in real-time.

2. *Breeding Season Prediction for Marine Species*
   - Trained machine learning models predict the breeding seasons of rare fish species, turtles, and tortoises.
   - Visualizations of breeding patterns are displayed using Matplotlib on a dedicated dashboard.

3. *Fish and Marine Species Movement Pattern Tracking*
   - Tracks the movement and migration patterns of fish and marine species in real-time.
   - Visualized data helps stakeholders identify protected habitats and critical migration routes.

4. *Community Engagement & Education*
   - Educates local communities on breeding seasons to discourage fishing during vulnerable periods.
   - Provides real-time information and insights to drive awareness and sustainable practices among local populations.

5. *Target Customers*
   - *Yacht Owners*: Access oceanic health data to ensure safe and sustainable navigation.
   - *Fish Traders*: Insights into fish populations and breeding seasons to ensure sustainable trade practices.
   - *NGOs and Environmental Organizations*: Tools for monitoring and advocating for marine conservation.
   - *Researchers*: Data to support studies on marine ecosystems, biodiversity, and conservation.
   - *Government & Authorized Startups*: Tools for monitoring compliance with marine regulations.


## Installation Guide

1. *Install Dependencies*
   - Install required libraries using pip:
     bash
     pip install -r requirements.txt
     

2. *Set Up the Database*
   - Configure and initialize the database (SQLite or preferred database).
   - Set up tables for storing image data, GPS coordinates, and species data.

3. *Run the Flask App*
   - Start the Flask app to serve the backend:
     bash
     python app.py
     

4. *Deploy the Frontend*
   - Set up the frontend to display the heatmap and breeding season visualizations.

5. *Test the System*
   - Test the app to ensure that the camera, GPS, and data upload functionalities are working correctly.
   - Verify the heatmap and breeding season visualizations on the dashboard.

## Contribution

- Contributions to improve the accuracy of the detection model and enhance predictive analytics are welcome.
- To contribute, fork the repository and submit a pull request with proposed changes.

This structure lays out each component of the solution, from features to business model and installation, in a clear and concise point-wise manner.

1. *Flask* (for web development)
   - For building and running the web application.
   bash
   pip install flask
   

2. *OpenCV* (for image processing)
   - For capturing and processing images from the camera in the app.
   bash
   pip install opencv-python
   

3. *TensorFlow / PyTorch* (for machine learning model)
   - To train and deploy models for plastic detection and breeding season prediction.
   - If you're using TensorFlow:
     bash
     pip install tensorflow
     
   - If you're using PyTorch:
     bash
     pip install torch torchvision
     

4. *NumPy* (for numerical processing)
   - For data manipulation and preprocessing.
   bash
   pip install numpy
   

5. *Pandas* (for data manipulation)
   - For handling data and converting it into formats suitable for machine learning models and visualizations.
   bash
   pip install pandas
   

6. *Matplotlib* (for data visualization)
   - For creating static, interactive, and animated visualizations of data (e.g., breeding season charts, heatmaps).
   bash
   pip install matplotlib
   

7. *Seaborn* (for statistical data visualization)
   - Used in conjunction with Matplotlib for more advanced visualizations.
   bash
   pip install seaborn
   

8. *SQLite* (for database management)
   - For storing image data, GPS coordinates, and other related information.
   bash
   pip install sqlite3
   

9. *Geopy* (for geolocation)
   - For geocoding and working with GPS coordinates.
   bash
   pip install geopy
   

10. *Flask-SQLAlchemy* (for SQL database interaction in Flask)
    - If you plan on using SQLAlchemy as the ORM for database management in Flask.
    bash
    pip install flask_sqlalchemy
    

11. *Flask-Cors* (for cross-origin resource sharing)
    - Useful when your app needs to communicate with frontend code running in a different domain or on a different port.
    bash
    pip install flask-cors
    

12. *Requests* (for making HTTP requests)
    - Useful if you need to send or receive data from external services or APIs.
    bash
    pip install requests
    

13. *scikit-learn* (for machine learning tasks)
    - For classification, regression, and other machine learning tasks.
    bash
    pip install scikit-learn
    

14. *Flask-Login* (for user authentication)
    - If you need authentication features for your app (e.g., users submitting plastic data or viewing the dashboard).
    bash
    pip install flask-login
    

15. *Flask-WTF* (for web forms)
    - For handling forms and user inputs (if necessary in your web app).
    bash
    pip install flask-wtf
    


### Installation Command for All Libraries
Once you have your list of dependencies, you can create a requirements.txt file containing all the necessary libraries:

txt
flask
opencv-python
tensorflow
numpy
pandas
matplotlib
seaborn
sqlite3
geopy
flask_sqlalchemy
flask-cors
requests
scikit-learn
flask-login
flask-wtf
twilio
bokeh
plotly
roboflow
yolo


Then, to install all dependencies at once:

bash
pip install -r requirements.txt



Ideas / Changes suggested to us in Evaluation - 1 

-The idea/change suggested us is to make our solution into a business model , it should make some effective business output.
Progress made / Changes incorporated after Evaluation - 1
-yes, so far we induced and added some more features to make the model focus more on business aspect as our model helps many NGO,s , govt. authorities and other local communities and fisherman we made our best to make it as a business model.Ideas / Changes suggested to you in Evaluation - 1 

## Business Model

1. *Subscription-Based Access*
   - Different subscription tiers for various customer segments (NGOs, yacht owners, researchers, etc.).
2. *Premium Features*
   - Advanced analytics, real-time data access, and detailed insights for premium customers.
3. *Public Engagement*
   - Incentivize users to contribute data (e.g., images and locations) in exchange for recognition or rewards within the app.
4. *Partnerships with NGOs*
   - Collaboration with environmental organizations to promote the platform and encourage wide-scale use.


This should cover all the major functionality your solution will need, including web development, image processing, machine learning, and data visualization.


License
This project is licensed under the MIT License. See the LICENSE file for details
