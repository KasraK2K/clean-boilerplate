import axios from "axios"

/* -------------------------------------------------------------------------- */
/*                              External Domains                              */
/* -------------------------------------------------------------------------- */
// import userDomain from "./user"
const userDomain = {
  getUserList: async (): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.USER_DOMAIN}/list`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  },
}

export default {
  userDomain,
}
