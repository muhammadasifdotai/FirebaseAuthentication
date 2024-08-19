import {View, Text, Button, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

export default function ImageUpload() {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        // nechay walay code ka matlab hay kay hum sirf images hi pick kr payeen gay. iger koi or document pick krna hay to usay define krna pray ga.
        // cachesDirectory: jo bhi image selectk krani gay us ki ya dublicate copy bna kay rakh da ga. 
        // .. or usi ka path hum nay use krna hay.
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory'
      });
      console.log(response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
        // ref: reference kay kaha upload krna hay image ko.
        // imageData: is may sara data hay image ka is say us ka name nikal kr save krnay wali jagha pr pass kr deya hay.
        // .ref(`/profile/${imageData.name}`) : is may 'profile' aik folder ka name hay or is say agay or phlay hum or bhi folders bna saktay hay. e.g: '/profile/pic/users/'
      const response = storage().ref(`/profile/${imageData.name}`); //response: is varible may poray reference ko kr deya hay store. or phir 'putfile or getdownloadUrl' ko waha say call kya hay.

      // putFile method is used to upload the image using its fileCopyUri.
      const put = await response.putFile(imageData.fileCopyUri); // putfile may 'uri' dena hay. kay is file ko upload kro.

      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();

      setImgDownloadUrl(url);

      Alert.alert('Image Uploaded Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async () => {
    try {
      const response = await storage().ref(fullImgRefPath).delete();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {imageData ? (
        // uri: ki madat say hum nay image ko open kya hay.
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
        <Button title="Select Image" onPress={() => pickImage()} />
        <Button title="Upload Image" onPress={() => uploadImage()} />
        <Button
          title="Delete Image"
          onPress={() => deleteImage()}
          color="red"
        />
      </View>

      <View style={{margin: 10}}>
        <Text>
          Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
        </Text>
      </View>

      <Image source={{uri: imgDownloadUrl}} style={{height: 300, width: 300}} />
    </View>
  );
}