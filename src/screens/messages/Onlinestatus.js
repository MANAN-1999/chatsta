import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Onlinestatus = () => {
  const data = useSelector((state) => state.userData.userData);
  const [statusText, setStatusText] = useState('');

  const storeStatus = async () => {
    try {
      // Get a reference to the Firestore document for the user
      const userRef = firestore().collection('users').doc(data)

      // Update the "status" field with the text input value
      await userRef.update({
        status: statusText,
      });

      console.log('Status data stored successfully!');
    } catch (error) {
      console.error('Error storing status data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        {/* Your Image */}
        <Image source={{ uri: 'your_image_url_here' }} style={styles.image} />
      </View>

      <TextInput
        value={statusText}
        onChangeText={(text) => setStatusText(text)}
        placeholder="Enter your status"
        style={styles.input}
      />

      <TouchableOpacity onPress={storeStatus} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onlinestatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageView: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 50,
    marginBottom: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
