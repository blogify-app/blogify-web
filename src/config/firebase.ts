import {__PROD__} from "@/config/env.ts";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

function getEnvironmentFirebaseConfig(env: string) {
  return {
    apiKey: process.env[`FIREBASE_API_KEY_${env}`],
    authDomain: process.env[`FIREBASE_AUTH_DOMAIN_${env}`],
    projectId: process.env[`FIREBASE_PROJECT_ID_${env}`],
    storageBucket: process.env[`FIREBASE_STORAGE_BUCKET_${env}`],
    messagingSenderId: process.env[`FIREBASE_MESSAGING_SENDERID_${env}`],
    appId: process.env[`FIREBASE_APP_ID_${env}`],
    measurementId: process.env[`FIREBASE_MEASUREMENT_ID_${env}`],
  };
}

const firebaseConfig = getEnvironmentFirebaseConfig(
  __PROD__ ? "PROD" : "PREPROD"
);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("app_id", app.options.appId);
