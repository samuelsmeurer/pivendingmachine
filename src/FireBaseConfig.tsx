import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { DataSnapshot, getDatabase, ref, set, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyD-HxxOugtCCBAyHrj1oBk1yX2Y5Yu6AlY",
  authDomain: "infinity-18397.firebaseapp.com",
  databaseURL: "https://infinity-18397-default-rtdb.firebaseio.com",
  projectId: "infinity-18397",
  storageBucket: "infinity-18397.appspot.com",
  messagingSenderId: "44659519277",
  appId: "1:44659519277:web:5a2c19c683a40084c8ada4",
  measurementId: "G-VGYS702NL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const database = getDatabase(app);

const db = getDatabase();

export function writeUserData(address:`0x${string}`| undefined) {
    const formattedDate = new Date().toLocaleString('pt-BR', { timeZone: 'UTC' }).replace(/(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{2}):(\d{2})/, '$1/$2/$3 $4:$5');
    set(ref(db, 'users/' + address), {
      ultimoAcesso:formattedDate
    });
    return 0;
  }

export function readUserData(address:`0x${string}`| undefined){
    const usersRef = ref(db, 'users/' + address);
    get(usersRef).then((snapshot: DataSnapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
} 

