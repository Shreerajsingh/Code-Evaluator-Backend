import evaluationQueue from "../queues/evaluationQueue";

async function evaluationProducer(payload: Record<string, unknown>) {
    await evaluationQueue.add("EvaluationJob", payload);
    console.log("Successfully added a new evaluation job", `: ${JSON.stringify(payload)}`);
}

export default evaluationProducer;