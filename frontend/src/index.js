import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import axios from 'axios';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
serviceWorkerRegistration.register();

