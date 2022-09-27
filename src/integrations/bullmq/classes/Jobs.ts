import { BullMQ, Job, JobsOptions, JobType } from ".."

class Jobs {
  constructor(private superThis: BullMQ) {}

  create(jobName: string, data: any, opts?: JobsOptions): Promise<Job<any, any, string>> {
    return this.superThis.queue.add(jobName, data, opts)
  }

  async getJob(jobName: string, types: JobType[] | JobType = ["wait", "delayed"]) {
    const jobs = await this.superThis.queue.getJobs(types)
    const index = jobs.length && jobs.findIndex((job) => job && job.name === jobName)

    if (index !== -1) return jobs[index]
  }

  async renewJob(
    jobName: string,
    args?: { data?: Record<string, string>; types?: JobType[] | JobType; opts?: JobsOptions }
  ) {
    const { data, types, opts } = args ?? {}
    const job = await this.getJob(jobName, types)
    let jobData: Job<any, any, string>

    if (job) {
      jobData = job.data
      await job.remove()
      return this.create(jobName, data ? data : jobData, opts ? Object.assign(job.opts, opts) : job.opts)
    } else return undefined
  }
}

export default Jobs
