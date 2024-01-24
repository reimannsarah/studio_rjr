import { BlobServiceClient, AnonymousCredential } from "@azure/storage-blob";

const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME as string;
if (!accountName) throw Error("VITE_AZURE_STORAGE_ACCOUNT_NAME is not set");

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new AnonymousCredential()
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
    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}`;
    const response = await fetch(blobUrl);
    const blobData = await response.blob();
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64data = reader.result;
      sessionStorage.setItem(blob.name, base64data as string);
      blobInfos.push({ name: blob.name });
    }
    reader.readAsDataURL(blobData);
  }

  return blobInfos;
}

main()
  .then(() => console.log("Done"))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error("An error occurred:", err.message);
    }
  });

  export default main;