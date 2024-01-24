import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME as string;
if (!accountName) throw Error("AZURE_STORAGE_ACCOUNT_NAME is not set");

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new DefaultAzureCredential()
);

interface BlobInfo {
  name: string;
  metadata?: Record<string, string>;
}

async function main(): Promise<BlobInfo[]> {
  const containerName = "images";


  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobInfos: BlobInfo[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const blobClient = containerClient.getBlobClient(blob.name);
    const properties = await blobClient.getProperties();
    blobInfos.push({ name: blob.name, metadata: properties.metadata });
  }

  return blobInfos;
}

main()
  .then(() => console.log("Done"))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error("Error running sample:", err.message);
    }
  });
