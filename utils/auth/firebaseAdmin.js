import * as admin from 'firebase-admin'

export const verifyIdToken = token => {
  const firebasePrivateKey = process.env.firebase_private_key

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.firebase_project_id,
        clientEmail: process.env.firebase_client_email,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.firebase_database_url,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error
    })
}
