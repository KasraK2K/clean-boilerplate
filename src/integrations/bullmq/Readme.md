# BullMQ

BullMQ integration example:

```typescript
/* -------------------------------------------------------------------------- */
/*                                Create Queue                                */
/* -------------------------------------------------------------------------- */
import BullMQ from "./integrations/bullmq"

const bullmq = new BullMQ("queueName")
const connection = bullmq.connection
const queue = bullmq.queue
```

```typescript
/* -------------------------------------------------------------------------- */
/*                                 Create Job                                 */
/* -------------------------------------------------------------------------- */
import BullMQ from "./integrations/bullmq"

async function createJob() {
  const bullmq = new BullMQ("queueName")
  const connection = bullmq.connection
  const queue = bullmq.queue

  bullmq.job.create(
    "jobName",
    { name: "clean-boilerplate", auther: "Kasra" },
    { delay: 5000, removeOnComplete: true }
  )
}
```

```typescript
/* -------------------------------------------------------------------------- */
/*                                   Get Job                                  */
/* -------------------------------------------------------------------------- */
import BullMQ from "./integrations/bullmq"

async function getJob() {
  const bullmq = new BullMQ("queueName")
  const connection = bullmq.connection
  const queue = bullmq.queue

  const job = await bullmq.job.getJob("job-order-10")
  console.log(job)
}
```

```typescript
/* -------------------------------------------------------------------------- */
/*                                  Renew Job                                 */
/* -------------------------------------------------------------------------- */
import BullMQ from "./integrations/bullmq"

async function renewJob() {
  const bullmq = new BullMQ("queueName")
  const connection = bullmq.connection
  const queue = bullmq.queue

  await bullmq.job.renewJob("job-order-4", { opts: { delay: 0 } })
}
```

```typescript
/* -------------------------------------------------------------------------- */
/*                                Create Worker                               */
/* -------------------------------------------------------------------------- */
import BullMQ, { Job, Worker } from "./integrations/bullmq"

async function createWorker() {
  const bullmq = new BullMQ("queueName")
  const connection = bullmq.connection
  const queue = bullmq.queue

  onst worker = new Worker("queueName", async (job: Job) => console.log(job.data), { connection })
  worker.on("completed", (job) => console.log(`${job.id} has completed!`))
  worker.on("failed", (job, err) => console.log(`${job.id} has failed with ${err.message}`))
}
```

&nbsp;

This integration covered this methods:

## messaging

- [createJob]()
- [getJob]()
- [renewJob]()
- [createWorker]()
