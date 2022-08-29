import nodemon from "nodemon"

nodemon({ script: "src/server.ts" })
  .on("start", console.clear)
  .on("restart", console.clear)
  .on("crash", () => console.error("\nApplication has crashed!\n"))
  .on("quit", () => {
    console.log("\nApp has quit\n")
    process.kill(process.pid, "SIGKILL")
    process.exit()
  })
