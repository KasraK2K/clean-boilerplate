import { Sms } from ".."

class Twilio {
  private certificate = require("../certificate.json")
  private twilio = require("twilio")

  public client = new this.twilio(this.certificate.accountSid, this.certificate.authToken)

  public sms = new Sms(this, this.certificate)
}

export default Twilio
