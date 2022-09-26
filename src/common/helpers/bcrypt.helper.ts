import bcrypt from "bcryptjs"

class Bcrypt {
  public saltGen(saltNum?: number): string {
    return bcrypt.genSaltSync(saltNum ? saltNum : 7)
  }

  public hashGen(text: string, salt?: string | number): string {
    let generatedSalt: string

    switch (typeof salt) {
      case "string":
        generatedSalt = salt
        break

      case "number":
        generatedSalt = this.saltGen(salt)
        break

      default:
        generatedSalt = this.saltGen()
    }

    return bcrypt.hashSync(text, generatedSalt)
  }

  public compareHash = (text: string, hash: string) => {
    return bcrypt.compareSync(text, hash)
  }
}

export default new Bcrypt()
