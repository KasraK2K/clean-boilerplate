import bcrypt from "bcryptjs";

export const saltGen = (saltNum?: number): string => {
  return bcrypt.genSaltSync(saltNum ? saltNum : 7);
};

export const hashGen = (text: string, salt?: string | number): string => {
  let generatedSalt: string;

  switch (typeof salt) {
    case "string":
      generatedSalt = salt;
      break;

    case "number":
      generatedSalt = saltGen(salt);
      break;

    default:
      generatedSalt = saltGen();
  }

  return bcrypt.hashSync(text, generatedSalt);
};

export const compareHash = (text: string, hash: string) => {
  return bcrypt.compareSync(text, hash);
};

export default { saltGen, hashGen, compareHash };
