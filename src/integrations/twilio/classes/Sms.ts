import { ISmsBody, ISmsError, ISmsResponse } from ".."
import Twilio from "./Twilio"

class Sms {
  constructor(private superThis: Twilio, private certificate: Record<string, any>) {}

  public message(body: ISmsBody) {
    return new Promise(async (resolve, reject) => {
      if (!("from" in body)) Object.assign(body, { from: this.certificate.from })

      this.superThis.client.messages
        .create(body)
        .then((message: ISmsResponse) => resolve(message))
        .catch((err: ISmsError) => reject(err))
    })
  }
}

export default Sms
