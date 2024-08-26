import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// userData

const activities = [
  {
    id: 1,
    name: 'Morning Yoga',
    category: 'Yoga',
    duration: '30 minutes',
    caloriesBurned: 150,
    difficultyLevel: 'Beginner',
    instructor: 'Sarah Lee',
    date: '2024-08-26',
    completed: false,
  },
  {
    id: 2,
    name: 'HIIT Workout',
    category: 'Cardio',
    duration: '20 minutes',
    caloriesBurned: 300,
    difficultyLevel: 'Intermediate',
    instructor: 'John Doe',
    date: '2024-08-26',
    completed: true,
  },
  {
    id: 3,
    name: 'Strength Training',
    category: 'Strength',
    duration: '45 minutes',
    caloriesBurned: 400,
    difficultyLevel: 'Advanced',
    instructor: 'Emily Davis',
    date: '2024-08-25',
    completed: false,
  },
  {
    id: 4,
    name: 'Evening Run',
    category: 'Running',
    duration: '30 minutes',
    caloriesBurned: 250,
    difficultyLevel: 'Intermediate',
    instructor: 'Mike Johnson',
    date: '2024-08-25',
    completed: true,
  },
  {
    id: 5,
    name: 'Pilates Session',
    category: 'Pilates',
    duration: '40 minutes',
    caloriesBurned: 200,
    difficultyLevel: 'Beginner',
    instructor: 'Laura Smith',
    date: '2024-08-24',
    completed: false,
  },
  {
    id: 6,
    name: 'Cycling Challenge',
    category: 'Cycling',
    duration: '60 minutes',
    caloriesBurned: 500,
    difficultyLevel: 'Advanced',
    instructor: 'James Wilson',
    date: '2024-08-24',
    completed: true,
  },
  {
    id: 7,
    name: 'Meditation',
    category: 'Mindfulness',
    duration: '15 minutes',
    caloriesBurned: 50,
    difficultyLevel: 'Beginner',
    instructor: 'Nina Brown',
    date: '2024-08-23',
    completed: false,
  },
  {
    id: 8,
    name: 'Swimming Laps',
    category: 'Swimming',
    duration: '45 minutes',
    caloriesBurned: 400,
    difficultyLevel: 'Intermediate',
    instructor: 'Chris Green',
    date: '2024-08-23',
    completed: true,
  },
  {
    id: 9,
    name: 'Boxing Session',
    category: 'Boxing',
    duration: '30 minutes',
    caloriesBurned: 350,
    difficultyLevel: 'Advanced',
    instructor: 'Alex White',
    date: '2024-08-22',
    completed: true,
  },
  {
    id: 10,
    name: 'CrossFit',
    category: 'CrossFit',
    duration: '60 minutes',
    caloriesBurned: 600,
    difficultyLevel: 'Advanced',
    instructor: 'Kelly Black',
    date: '2024-08-21',
    completed: false,
  },
];

export default function UserData(): JSX.Element {


  //   Add Documents to Firestore:

  const addActivitiesToFirestore = async () => {
    const batch = firestore().batch(); // Use batch for better performance

    activities.forEach(activity => {
      const activityRef = firestore()
        .collection('Activities')
        .doc(activity.id.toString()); // Use the id as the document ID
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

  // .....................now getting data from firebase ......................

  // state
  const [activitiess, setActivitiess] = useState([]);

  // Fetch Data from Firestore
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const snapshot = await firestore().collection('Activities').get();
        const activitiesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivitiess(activitiesList);
      } catch (error) {
        console.error('Error fetching activities: ', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alhamdulillah</Text>
      <TouchableOpacity style={styles.addButton} onPress={addActivitiesToFirestore}>
        <Text style={styles.addButtonText}>Add data</Text>
      </TouchableOpacity>

      <FlatList
        data={activitiess}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.activityName}>{item.name}</Text>
            <Text style={styles.activityDetail}>Category: {item.category}</Text>
            <Text style={styles.activityDetail}>Duration: {item.duration}</Text>
            <Text style={styles.activityDetail}>Calories Burned: {item.caloriesBurned}</Text>
            <Text style={styles.activityDetail}>Instructor: {item.instructor}</Text>
            <Text style={styles.activityDetail}>Date: {item.date}</Text>
            <Text style={styles.activityDetail}>
              Completed: {item.completed ? 'Yes' : 'No'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  activityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  activityDetail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});
