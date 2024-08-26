import { View, Text, Button, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

export default function ImageUpload() {
  const [imageData, setImageData] = useState(null); // State to store image data
  const [fullImgRefPath, setFullImgRefPath] = useState(''); // State to store the full reference path of the image
  const [imgDownloadUrl, setImgDownloadUrl] = useState(''); // State to store the image download URL

  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        // This code ensures that only images can be selected. 
        // 'cachesDirectory' ensures that a duplicate copy of the selected image is stored.
        // The path of this copy will be used in the upload process.
        // type: [DocumentPicker.types.images], // for uploading single image
        type: [DocumentPicker.types.allFiles], // for uploading single video
        copyTo: 'cachesDirectory',
      });
      console.log(response);
      setImageData(response); // Save the selected image data
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
  };

  const uploadImage = async () => {
    try {
      // Define the reference path where the image will be uploaded
      const response = storage().ref(`/profile/${imageData.name}`);

      // Upload the image using its fileCopyUri
      const put = await response.putFile(imageData.fileCopyUri); // Provide the URI for the file to be uploaded

      setFullImgRefPath(put.metadata.fullPath); // Save the full path of the uploaded image
      const url = await response.getDownloadURL(); // Get the download URL of the uploaded image

      setImgDownloadUrl(url); // Save the download URL
      Alert.alert('Image Uploaded Successfully');
    } catch (err) {
      console.log('Upload Error: ', err);
    }
  };

  const confirmDeleteImage = () => {
    // Show an alert to confirm the deletion of the image
    Alert.alert(
      'Confirm Deletion', // Title of the alert
      'Are you sure you want to delete this image?', // Message in the alert
      [
        {
          text: 'Cancel', // Text for the cancel button
          style: 'cancel', // Cancel button style
        },
        {
          text: 'Delete', // Text for the delete button
          onPress: deleteImage, // Call deleteImage function when pressed
          style: 'destructive', // Destructive style for delete button
        },
      ],
      { cancelable: true }
    );
  };

  const deleteImage = async () => {
    try {
      // Delete the image using the stored reference path
      await storage().ref(fullImgRefPath).delete();
      setImageData(null); // Reset image data after deletion
      setFullImgRefPath(''); // Clear the reference path
      setImgDownloadUrl(''); // Clear the download URL
      Alert.alert('Image Deleted Successfully');
    } catch (err) {
      console.log('Delete Error: ', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageData ? (
        // Display the selected image using its URI
        <Image
          source={{ uri: imageData.uri }}
          style={{ height: 200, width: 200, marginBottom: 20 }}
        />
      ) : (
        <Text>No Image Found</Text>
      )}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button title="Select Image" onPress={pickImage} />
        <Button title="Upload Image" onPress={uploadImage} />
        <Button
          title="Delete Image"
          onPress={confirmDeleteImage} // Use the confirmDeleteImage function
          color="red"
        />
      </View>

      <View style={{ margin: 10 }}>
        <Text>
          Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
        </Text>
      </View>

      {imgDownloadUrl ? (
        // Display the uploaded image using its download URL
        <Image source={{ uri: imgDownloadUrl }} style={{ height: 300, width: 300 }} />
      ) : null}
    </View>
  );
}
