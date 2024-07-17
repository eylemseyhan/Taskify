# Taskify

_Taskify is a task management application that helps users manage and track their tasks. This application allows users to add, edit, delete, and list tasks. Additionally, it is possible to manage assigned users, date ranges, and subtasks for each task._

## Ekran Görüntüleri

![Ekran görüntüsü 2024-06-27 121329](https://github.com/eylemseyhan/Taskify/assets/99998017/a05a55a5-110f-4e5c-955c-46679e760997)
![Ekran görüntüsü 2024-06-27 121336](https://github.com/eylemseyhan/Taskify/assets/99998017/81bc251e-74c8-4213-9b20-b5c06b13d02d)
![Ekran görüntüsü 2024-06-27 121342](https://github.com/eylemseyhan/Taskify/assets/99998017/0493e139-3acd-45c1-836b-ae277154cd6f)
![Ekran görüntüsü 2024-06-27 121405](https://github.com/eylemseyhan/Taskify/assets/99998017/04fdda8c-f25c-4066-ae50-fe29c259a2a5)
![Ekran görüntüsü 2024-06-27 121412](https://github.com/eylemseyhan/Taskify/assets/99998017/e9ef95a4-f13a-4787-806a-a2a6094fa15c)
![Ekran görüntüsü 2024-06-27 121416](https://github.com/eylemseyhan/Taskify/assets/99998017/b99b511e-56ab-4d22-99a5-4121eceb766e)
![Ekran görüntüsü 2024-06-27 121436](https://github.com/eylemseyhan/Taskify/assets/99998017/efbf7d5d-f58d-4ed3-916c-1dc8b2e4d3db)


## Presentation for Taskify


[TASKIFY SUNUM.pdf](https://github.com/user-attachments/files/16181705/TASKIFY.SUNUM.pdf)

## Features

Add, edit, and delete tasks
Assign users to tasks
Set date ranges for tasks
Add and manage subtasks
Task status management (Pending, Completed, In Progress)
User notifications

## Technologies Used

React
Firebase (Firestore and Authentication)
Ant Design (for UI components

## Installation and Usage

1. Clone or download this project:
    ```sh
    git clone https://github.com/YOUR_GITHUB_USERNAME/Taskify.git
    cd Taskify
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3.Create a Firebase project and set up the configuration file:

Create a new project through the Firebase Console.
Enable Firestore and Authentication features.
Obtain your Firebase project configuration and add it to the src/firebaseConfig.js file:

    ```javascript
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    export default firebaseConfig;
    ```

4. Run the application on your local server:
    ```sh
    npm start
    ```

5. Open your browser and go to http://localhost:3000 to view the application.



## Contributing

If you would like to contribute, please send a pull request or open an issue.

## License

This project is licensed under the MIT License. For more information, see the LICENSE file.
