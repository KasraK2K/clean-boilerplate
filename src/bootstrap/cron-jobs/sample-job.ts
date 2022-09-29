import { CronJob } from "cron"
import config from "config"
import path from "path"
import { IJobsConfig } from "../../../config/config.interface"

const jobConfig: IJobsConfig = config.get("job")
const filename = path.parse(__filename).name

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

if (jobConfig.activeCronJobs.includes(filename)) sampleJob.start()
else sampleJob.stop()

export default sampleJob
