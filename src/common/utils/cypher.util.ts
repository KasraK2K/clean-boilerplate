import CryptoJS from "crypto-js"

class Cypher {
  public textToCypher(text: string): string {
    return CryptoJS.AES.encrypt(text, String(process.env.ENCRYPTION_SECRET)).toString()
  }

  public cypherToText(cypher: string) {
    return CryptoJS.AES.decrypt(cypher, String(process.env.ENCRYPTION_SECRET)).toString(CryptoJS.enc.Utf8)
  }
}

export default new Cypher()
