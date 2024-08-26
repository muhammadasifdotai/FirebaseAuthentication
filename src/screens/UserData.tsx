import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';

// userData 

const activities =  [
    {
      "id": 1,
      "name": "Morning Yoga",
      "category": "Yoga",
      "duration": "30 minutes",
      "caloriesBurned": 150,
      "difficultyLevel": "Beginner",
      "instructor": "Sarah Lee",
      "date": "2024-08-26",
      "completed": false
    },
    {
      "id": 2,
      "name": "HIIT Workout",
      "category": "Cardio",
      "duration": "20 minutes",
      "caloriesBurned": 300,
      "difficultyLevel": "Intermediate",
      "instructor": "John Doe",
      "date": "2024-08-26",
      "completed": true
    },
    {
      "id": 3,
      "name": "Strength Training",
      "category": "Strength",
      "duration": "45 minutes",
      "caloriesBurned": 400,
      "difficultyLevel": "Advanced",
      "instructor": "Emily Davis",
      "date": "2024-08-25",
      "completed": false
    },
    {
      "id": 4,
      "name": "Evening Run",
      "category": "Running",
      "duration": "30 minutes",
      "caloriesBurned": 250,
      "difficultyLevel": "Intermediate",
      "instructor": "Mike Johnson",
      "date": "2024-08-25",
      "completed": true
    },
    {
      "id": 5,
      "name": "Pilates Session",
      "category": "Pilates",
      "duration": "40 minutes",
      "caloriesBurned": 200,
      "difficultyLevel": "Beginner",
      "instructor": "Laura Smith",
      "date": "2024-08-24",
      "completed": false
    },
    {
      "id": 6,
      "name": "Cycling Challenge",
      "category": "Cycling",
      "duration": "60 minutes",
      "caloriesBurned": 500,
      "difficultyLevel": "Advanced",
      "instructor": "James Wilson",
      "date": "2024-08-24",
      "completed": true
    },
    {
      "id": 7,
      "name": "Meditation",
      "category": "Mindfulness",
      "duration": "15 minutes",
      "caloriesBurned": 50,
      "difficultyLevel": "Beginner",
      "instructor": "Nina Brown",
      "date": "2024-08-23",
      "completed": false
    },
    {
      "id": 8,
      "name": "Swimming Laps",
      "category": "Swimming",
      "duration": "45 minutes",
      "caloriesBurned": 400,
      "difficultyLevel": "Intermediate",
      "instructor": "Chris Green",
      "date": "2024-08-23",
      "completed": true
    },
    {
      "id": 9,
      "name": "Boxing Session",
      "category": "Boxing",
      "duration": "30 minutes",
      "caloriesBurned": 350,
      "difficultyLevel": "Advanced",
      "instructor": "Alex White",
      "date": "2024-08-22",
      "completed": true
    },
    {
      "id": 10,
      "name": "CrossFit",
      "category": "CrossFit",
      "duration": "60 minutes",
      "caloriesBurned": 600,
      "difficultyLevel": "Advanced",
      "instructor": "Kelly Black",
      "date": "2024-08-21",
      "completed": false
    }
  ]




//   Add Documents to Firestore:

const addActivitiesToFirestore = async () => {
    const batch = firestore().batch(); // Use batch for better performance
  
    activities.forEach(activity => {
      const activityRef = firestore().collection('Activities').doc(activity.id.toString()); // Use the id as the document ID
      batch.set(activityRef, activity);
    });
  
    try {
      await batch.commit();
      console.log('Activities added successfully!');
    } catch (error) {
      console.error('Error adding activities: ', error);
    }
  };





  // Call the Function:

//   useEffect(() => {
//     addActivitiesToFirestore();
//   }, []);
  
  

export default function UserData(): JSX.Element {
  return (
    <View>
      <Text>Alhamdulillah</Text>
      <TouchableOpacity onPress={addActivitiesToFirestore}>
        <Text>Add data</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})