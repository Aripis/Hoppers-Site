import firebaseAdmin from '../firebaseAdmin'
import * as admin from 'firebase-admin'

firebaseAdmin()

export const verifyIdToken = token => {
    return admin
      .auth()
      .verifyIdToken(token)
      .catch(error => {
        throw error
      })
  }