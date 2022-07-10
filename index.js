import Queue from 'bull';

const valueBeforeProcess = "payment@pending";
console.log(valueBeforeProcess);

// create new queue
const queue = new Queue("payments");

queue.on("error", console.log);

queue.on("failed", console.log);

queue.on("completed", async (job) => {
	const processedValue = await job.returnvalue;
	console.log(processedValue);
	process.exit(0);
});

// process payment from pending to done
const processPayment = (job) => job.data.replace("@pending", "@done");

// add payment on queue
queue.add("payments", valueBeforeProcess);

// get total of jobs
const jobs = await queue.getJobCounts();
console.log({ jobs });

// process queue
await queue.process("payments", processPayment);
