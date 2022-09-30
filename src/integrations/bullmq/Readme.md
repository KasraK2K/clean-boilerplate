# BullMQ

BullMQ integration example:

Create queue to add a job and work on it

```typescript
/* -------------------------------------------------------------------------- */
/*                                Create Queue                                */
/* -------------------------------------------------------------------------- */
import BullMQ from "./integrations/bullmq"

const bullmq = new BullMQ("queueName")
const connection = bullmq.connection
const queue = bullmq.queue
```

&nbsp;

For create a job you can use this function

```typescript
/* -------------------------------------------------------------------------- */
/*                                 Create Job                                 */
/* -------------------------------------------------------------------------- */
import BullMQ from "./integrations/bullmq"

function createJob() {
  const bullmq = new BullMQ("queueName")
  const connection = bullmq.connection
  const queue = bullmq.queue

  bullmq.job.create("jobName", { name: "clean-boilerplate", auther: "Kasra" }, { delay: 5000, removeOnComplete: true })
}
```

&nbsp;

With this function you be able to get your job by name

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

&nbsp;

Renew is useful in cases where you need to delete a job and re create that

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

&nbsp;

Worker is another needed part you can use to what should be done

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
