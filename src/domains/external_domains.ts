import axios from "axios"

/* -------------------------------------------------------------------------- */
/*                              External Domains                              */
/* -------------------------------------------------------------------------- */
// import userDomain from "./user"
const userDomain = {
  getUserList: async (): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await axios
        .post("http://localhost:3000/v1/user/list")
        .then((response) => {
          console.log(response)
          return resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  },
}

export default {
  userDomain,
}
