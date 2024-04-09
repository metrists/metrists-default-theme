import crypto from "crypto";
import { PassThrough } from "stream";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import { Bucket } from "sst/node/bucket";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const uploadStream = ({ key }: { key?: string }) => {
  const s3 = new S3Client({});

  const pass = new PassThrough();

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: Bucket.public.bucketName,
      Key: key ?? crypto.randomUUID(),
      Body: pass,
    },
  });

  return { writeStream: pass, promise: upload.done.bind(upload) };
};

export async function uploadStreamToS3({
  name,
  data,
  filename,
}: {
  name: string;
  data: AsyncIterable<Uint8Array>;
  filename?: string;
}) {
  const stream = uploadStream({
    key: filename,
  });

  await writeAsyncIterableToWritable(data, stream.writeStream);
  const file = await stream.promise();

  return file.Location;
}
