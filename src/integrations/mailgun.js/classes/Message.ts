import { IMailGunData, MailGunJS, MessagesSendResult } from ".."

class Message {
  constructor(private superThis: MailGunJS, private certificate: Record<string, any>) {}

  public createMessage(data: IMailGunData): Promise<MessagesSendResult> {
    return new Promise(async (resolve, reject) => {
      if (!("from" in data)) Object.assign(data, { from: this.certificate.from })

      await this.superThis.client.messages
        .create(this.certificate.domain, data)
        .then((response: MessagesSendResult) => resolve(response))
        .catch((err) => reject(err))
    })
  }
}

export default Message
