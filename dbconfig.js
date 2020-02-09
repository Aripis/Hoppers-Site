import * as admin from 'firebase-admin'
import serviceAccount from './hoppers-site-firebase-adminsdk-5dmnh-d297f8ba31.json'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://hoppers-site.firebaseio.com"
    })
}

export let db = admin.firestore();