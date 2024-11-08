import React, { useState, useEffect } from 'react';
import { Button, View, Text, Alert, Image, StyleSheet, Modal, StatusBar } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as Location from 'expo-location';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({ base64: true });
        setPhoto(photo);

        const location = await Location.getCurrentPositionAsync({});
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
      Alert.alert("Saved", "Your photo has been saved!");
    } else {
      setPhoto(null); // Reset the photo state if canceled
    }
    setModalVisible(false); // Close the modal
  };

  const saveImageLocally = (latitude, longitude) => {
    console.log("Latitude:", latitude, "Longitude:", longitude);
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
        <StatusBar barStyle={"default"}/>
        <CameraView ref={ref => setCamera(ref)} style={styles.camera} />
        <Button style={styles.button} title="Capture Image" onPress={takePicture} />

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
    paddingTop:100
  },
  camera: {
    flex: 0.8,
  },
  image: {
    width: '100%',
    height: '80%',
    marginTop: 10,
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
  button:{
    borderRadius:100,
  }
});
