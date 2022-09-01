import { MessagesSendResult } from "mailgun.js/interfaces/Messages"
import MailGunJS from "./classes/MailGunJS"
import Message from "./classes/Message"

export { MailGunJS }
export { Message }
export { MessagesSendResult }

export * from "./libs/interface"

export default new MailGunJS()
