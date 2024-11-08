import React, { useState, useEffect } from 'react';
import { Button, View, Text, Alert, Image, StyleSheet, Modal, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state for upload progress


  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === 'granted');
    })();
  }, []);

  const getCurrentTime = () => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const Seconds = now.getSeconds()
    return (`${hour}_${minute}_${Seconds}.jpg`)
  }

  const takePicture = async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({ base64: true });
        setPhoto(photo);

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,  // Request high accuracy
          enableHighAccuracy: true,           // Enable high accuracy
          maximumAge: 0                       // No cached location data
        });
        setLocation(location.coords);
        setModalVisible(true); // Show confirmation modal
      } catch (error) {
        console.error("Error taking picture or getting location:", error);
        Alert.alert("Error", "Failed to take picture or get location.");
      }
    }
  };

  const handleConfirmation = (confirm) => {
    if (confirm) {
      saveImageLocally(location.latitude, location.longitude);
    } else {
      setPhoto(null); // Reset the photo state if canceled
    }
    setModalVisible(false); // Close the modal
  };

  const saveImageLocally = async (latitude, longitude) => {
    if (photo) {
      const formData = new FormData();

      // Prepare the image file for upload
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or the appropriate MIME type
        name: getCurrentTime(), // Use the appropriate name
      });
      console.log(getCurrentTime())

      // Add additional data, like coordinates if needed
      formData.append('latitude', latitude.toString());
      formData.append('longitude', longitude.toString());

      setIsUploading(true); // Show progress indicator

      try {
        const response = await axios.post('http://192.168.181.14:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status === 200) {
          Alert.alert("Success", "Photo uploaded successfully!");
        } else {
          Alert.alert("Error", "Failed to upload photo.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload Error", "Failed to upload photo.");
      } finally {
        setIsUploading(false); // Hide progress indicator
      }
    }
  };

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }
  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }
  if (!hasLocationPermission) {
    return <Text>No access to location</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <CameraView ref={ref => setCamera(ref)} style={styles.camera} />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>

      {photo && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: photo.uri }} style={styles.image} />
            <Text style={styles.confirmText}>Do you want to save this photo?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Yes" onPress={() => handleConfirmation(true)} />
              <Button title="No" onPress={() => handleConfirmation(false)} />
            </View>
          </View>
        </Modal>
      )}

      {isUploading && ( // Show progress indicator while uploading
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.uploadingText}>Uploading...</Text>
        </View>
      )}

      {location && (
        <Text>
          Location: {location.latitude}, {location.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#f0f8ff', // Light background color
  },
  camera: {
    flex: 0.8,
    borderRadius: 20, // Rounded edges for camera view
    overflow: 'hidden', // Prevent overflow
  },
  captureButton: {
    backgroundColor: '#007BFF', // Blue button color
    borderRadius: 30, // Rounded edges
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  confirmText: {
    color: 'white',
    margin: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  image: {
    width: '100%',
    height: '80%',
    marginTop: 10,
  },
  uploadingOverlay: { // New overlay style for upload progress
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  uploadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});
