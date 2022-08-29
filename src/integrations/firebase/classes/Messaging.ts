import { Firebase, MessagingOptions, MessagingPayload, toChunk } from ".."

class Messaging {
  constructor(private superThis: Firebase) { }

  public sendToDevice(
    registrationTokenOrTokens: string | string[],
    payload: MessagingPayload,
    options: MessagingOptions
  ) {
    return new Promise(async (resolve, reject) => {
      // ─── Send in multiple chunks ─────────────────────────────────────
      if (
        typeof registrationTokenOrTokens === "object" &&
        Array.isArray(registrationTokenOrTokens) &&
        registrationTokenOrTokens.length > 200
      ) {
        const chunks = toChunk<string>(registrationTokenOrTokens, 200)
        for (const chunk of chunks)
          await this.superThis.firebaseApp.messaging()
            .sendToDevice(chunk, payload, options)
            .then((response) => resolve(response))
            .catch((err) => reject(err))
      }
      // ─── Send In Single Chunk ────────────────────────────────────────
      else
        await this.superThis.firebaseApp.messaging()
          .sendToDevice(registrationTokenOrTokens, payload, options)
          .then((response) => resolve(response))
          .catch((err) => reject(err))
    })
  }
}

export default Messaging
