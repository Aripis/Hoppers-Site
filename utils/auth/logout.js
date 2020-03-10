import firebase from 'firebase/app'
import 'firebase/auth'

export default async () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      if (typeof window !== 'undefined') {
        // Remove the server-side rendered user data element. See:
        try {
          const elem = window.document.getElementById('__MY_AUTH_USER_INFO')
          elem.parentNode.removeChild(elem)
        } catch (e) {
        }
      }
      return true
    })
    .catch(e => {
      console.error(e)
      return false
    })
}
