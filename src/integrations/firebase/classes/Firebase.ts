import admin from "firebase-admin"
import { Messaging } from ".."

class Firebase {
  private certificate = require("../certificate.json")

  public firebaseApp: admin.app.App = admin.initializeApp({
    credential: admin.credential.cert(this.certificate),
  })

  public messaging = new Messaging(this)
}

export default Firebase
