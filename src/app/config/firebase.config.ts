import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../../environments/environment';

export const firebaseApp = initializeApp(environment.firebase);
export const analytics = getAnalytics(firebaseApp); 