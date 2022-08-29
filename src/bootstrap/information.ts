if (process.env.NODE_ENV === "development") {
  import("jsonwebtoken")
    .then(({ default: jwt }) => {
      const jwt_token = jwt.sign({ user_id: 123 }, process.env.JWT_SECRET ?? "", {
        expiresIn: "365d",
      })
      const api_keys = process.env.API_KEYS?.split(",")

      console.log({
        jwt_token,
        jwt_secret: process.env.JWT_SECRET,
        api_keys,
        isServer: JSON.parse(process.env.IS_ON_SERVER || "false"),
      })
    })
    .catch((err) => console.log(`boot information error: ${err.message}`))
}
