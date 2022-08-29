import { CronJob } from "cron"

let cycle = 1
const maxCycles = 3

const sampleJob = new CronJob(
  "* * * 1-31 * *",
  function () {
    console.log(`Job ${cycle}/${maxCycles} Done.`)
    if (cycle++ === maxCycles) sampleJob.stop()
  },
  null,
  true,
  "Europe/London"
)
sampleJob.start()

export default sampleJob
