import { BlobServiceClient } from "@azure/storage-blob";

const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME as string;
if (!accountName) throw Error("VITE_AZURE_STORAGE_ACCOUNT_NAME is not set");

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`
);

interface BlobInfo {
  name: string;
  metadata?: Record<string, string>;
}

async function main(): Promise<BlobInfo[]> {
  const containerName = "art";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const promises: Promise<BlobInfo>[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}`;
    const response = await fetch(blobUrl);
    const blobData = await response.blob();

    const promise = new Promise<BlobInfo>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async function() {
        try {
          const base64data = reader.result;
          sessionStorage.setItem(blob.name, base64data as string);

          const blobClient = containerClient.getBlobClient(blob.name);
          const properties = await blobClient.getProperties();
          const blobInfo = { name: blob.name, metadata: properties.metadata };

          // Save the blob metadata to sessionStorage
          sessionStorage.setItem(blob.name + "_metadata", JSON.stringify(properties.metadata));

          resolve(blobInfo);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsDataURL(blobData);
    });

    promises.push(promise);
  }

  const blobInfos = await Promise.all(promises);
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