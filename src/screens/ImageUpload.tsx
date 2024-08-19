import {View, Text, Button, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

export default function ImageUpload() {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  // Function to pick image from the gallery
  const pickImageFromGallery = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      console.log(response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to capture image from the camera
  const pickImageFromCamera = async () => {
    try {
      const response = await ImagePicker.openCamera({
        cropping: false, // Set to true if you want to crop the image
        includeBase64: true, // Optional: include base64 data
      });
      console.log(response);
      setImageData({
        uri: response.path,
        name: response.filename || 'camera_image.jpg',
        type: response.mime,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
      const response = storage().ref(`/profile/${imageData.name}`);
      const put = await response.putFile(imageData.uri);
      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();
      setImgDownloadUrl(url);
      Alert.alert('Image Uploaded Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete the image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await storage().ref(fullImgRefPath).delete();
              console.log(response);
              setImgDownloadUrl('');
              setImageData(null);
              Alert.alert('Image Deleted Successfully');
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {imageData ? (
        <Image
          source={{uri: imageData.uri}}
          style={{height: 200, width: 200, marginBottom: 20}}
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
        <Button title="Select Image from Gallery" onPress={pickImageFromGallery} />
        <Button title="Capture Image with Camera" onPress={pickImageFromCamera} />
        <Button title="Upload Image" onPress={uploadImage} />
        <Button
          title="Delete Image"
          onPress={deleteImage}
          color="red"
        />
      </View>

      <View style={{margin: 10}}>
        <Text>
          Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
        </Text>
      </View>

      {imgDownloadUrl.length > 0 && (
        <Image source={{uri: imgDownloadUrl}} style={{height: 300, width: 300}} />
      )}
    </View>
  );
}
