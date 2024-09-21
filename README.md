
# App for Measurement Time on Sport Events - Engineering Project

This project is an application designed to measure and display timing data for sports events. It allows track and analyze performance metrics in real-time for measurers. The application runs locally and interacts with a MongoDB database to store and retrieve event data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Connecting to the Data Display Application](#connecting-to-the-data-display-application)
- [Learn More](#learn-more)
- [Troubleshooting](#troubleshooting)
- [Additional Information](#additional-information)
- [Contact](#contact)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm:** Ensure you have [Node.js](https://nodejs.org/) and npm installed.
- **MongoDB:** Install [MongoDB](https://www.mongodb.com/try/download/community) on your local machine.
- **Git:** *(Optional)* If you plan to clone the repository using Git.

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Kiriar21/app_measurement.git
    cd app_measurement

Alternatively, you can download the repository as a ZIP file and extract it.

2. **Install Dependencies:**

#### Navigate to the project directory backend and install the necessary dependencies using npm:

    cd backend
    npm install
    npm start

#### Navigate to the project directory frontend and install the necessary dependencies using npm:

    cd..
    cd frontend
    npm install
    npm start

#### datas-generator

    Python files to generate data for testing applications.

3. **Start MongoDB:**

#### Ensure MongoDB is running on your local machine. You can start MongoDB using the following command:

    mongod
    Make sure MongoDB is configured properly and accessible.

4.  **Set Up MongoDB Replication:**

#### To enable data replication (required for connecting to the data display application), set up a replica set named r0. Follow these steps:

    Open mongod.confg
    Uncomment #replication:
    And add in next line: replSetName: "rs0"

#### Next 

    Open a new terminal window and start the MongoDB shell:
    bash
    mongo
    
    rs.initiate({
        _id: "r0",
    })
    
    Verify the replica set status:

    rs.status()

    For more detailed instructions, refer to the MongoDB Replica Set Documentation.

5. **Start the React Application:**

        Open http://localhost:3000 in your browser to view it.

        The page will automatically reload if you make changes to the code.
        You may also see any lint errors in the console.


        npm test
        Launches the test runner in the interactive watch mode.
        See the section about running tests for more information.

        npm run build
        Builds the app for production to the build folder.
        It correctly bundles React in production mode and optimizes the build for the best performance.

        The build is minified and the filenames include the hashes.
        Your app is ready to be deployed!

        npm run eject
        Note: this is a one-way operation. Once you eject, you can't go back!

        If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove      
        the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

To learn React, check out the React documentation.

**Code Splitting**
#### This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

**Analyzing the Bundle Size**
#### This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

**Making a Progressive Web App**
#### This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

**Advanced Configuration**
#### This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

**Deployment**
#### This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

**npm run build fails to minify**
#### This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

**Additional Information**
#### Progressive Web App (PWA) Configuration: This application is configured to work as a PWA. Ensure that service workers are properly registered and that the manifest.json file is correctly set up. Refer to the PWA Documentation for more details.

**Environment Variables**
#### The application uses environment variables to manage configuration. Ensure that the .env file is properly set up with the required variables, such as REACT_APP_API_BASE_URL.

**Contact**
#### If you have any questions or need further assistance, feel free to open an issue or contact the project maintainer.