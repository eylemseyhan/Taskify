import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Firebase yapılandırma nesnesi
const firebaseConfig = {
    apiKey: "AIzaSyAQB2QvoXRcJ2N2ffqhG62iXo6H6AFWd78",
    authDomain: "planner-7c4eb.firebaseapp.com",
    projectId: "planner-7c4eb",
    storageBucket: "planner-7c4eb.appspot.com",
    messagingSenderId: "648960895549",
    appId: "1:648960895549:web:70236fa7ea71a7451f5854",
    measurementId: "G-WTCLLTBTX1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const fetchAllTasksFromFirestore = async() => {
    const tasks = [];
    try {
        const querySnapshot = await firestore.collection('tasks').get();
        querySnapshot.forEach(doc => {
            tasks.push({...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
    return tasks;
};

export const getTasks = async() => {
    try {
        const tasksSnapshot = await firestore.collection('tasks').get();
        const tasksList = tasksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return tasksList;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Error fetching tasks');
    }
};

export const getUserInfo = async(email) => {
    try {
        const userQuery = await firestore.collection('users').where('email', '==', email).get();
        if (!userQuery.empty) {
            const userDoc = userQuery.docs[0];
            return userDoc.data();
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting user document:', error);
        return null;
    }
};

const getUsers = async() => {
    const users = [];
    try {
        const querySnapshot = await firestore.collection('users').get();
        querySnapshot.forEach(doc => {
            users.push({...doc.data(), email: doc.id });
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return users;
};

const addTaskToFirestore = async(task) => {
    try {
        // Firestore'a görevi ekle ve referansını al
        const docRef = await firestore.collection('tasks').add(task);
        // ID'yi döndür
        return docRef.id;
    } catch (error) {
        console.error('Error adding task:', error);
        throw new Error('Error adding task');
    }
};

const updateTaskInFirestore = async(taskId, updatedTask) => {
    try {
        await firestore.collection('tasks').doc(taskId).update(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Error updating task');
    }
};

const deleteTaskFromFirestore = async(taskId) => {
    try {
        await firestore.collection('tasks').doc(taskId).delete();
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Error deleting task');
    }
};

export {
    auth,
    firestore,
    fetchAllTasksFromFirestore,

    getUsers,
    addTaskToFirestore,
    updateTaskInFirestore,
    deleteTaskFromFirestore
};