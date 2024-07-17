import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Firebase yapılandırma nesnesi
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const fetchAllTasksFromFirestore = async() => {
    const tasks = [];
    try {
        const querySnapshot = await firestore.collection('tasks').get();
        querySnapshot.forEach(doc => {
            const data = doc.data();
            tasks.push({
                ...data,
                id: doc.id,
                startDate: data.startDate.toDate(),
                endDate: data.endDate.toDate()
            });
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
    }
};

export const saveUserSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const loadUserSession = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const clearUserSession = () => {
    localStorage.removeItem('user');
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