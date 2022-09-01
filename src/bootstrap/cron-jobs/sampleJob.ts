import { CronJob } from "cron"
import { IJobsConfig } from "./../../../config/config.interface"
import config from "config"

const jobConfig: IJobsConfig = config.get("job")

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

if (jobConfig.cronJobs) sampleJob.start()
else sampleJob.stop()

export default sampleJob
