import AWS from "aws-sdk";
import { Queue } from "sst/node/queue";

const sqs = new AWS.SQS();

export async function sendMessage<TData>(message: TData) {
  return await sqs
    .sendMessage({
      QueueUrl: Queue.Queue.queueUrl,
      MessageBody: JSON.stringify(message),
    })
    .promise();
}
