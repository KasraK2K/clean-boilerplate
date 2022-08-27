import { Message } from ".."
import Mailgun from "mailgun.js"
import formData from "form-data"
const mailgun = new Mailgun(formData)

class MailGunJS {
  private certificate: Record<string, any> = require("../certificate.json")

  public client = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || this.certificate.key,
    url: this.certificate.url,
  })

  public message = new Message(this, this.certificate)
}

export default MailGunJS
