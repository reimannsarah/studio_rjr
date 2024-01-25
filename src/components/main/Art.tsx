import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import main, { BlobInfo } from '../../services/blobServiceClient'; 

const Art = () => {
  const { route } = useParams<{ route: string }>();
  const [blobs, setBlobs] = useState<BlobInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    main()
      .then((blobInfos) => {
        const filteredBlobs = blobInfos.filter((blobInfo) => blobInfo.metadata && blobInfo.metadata[route as keyof typeof blobInfo.metadata] === 'true');
        setBlobs(filteredBlobs);
        setIsLoading(false);
        console.log(route)
        console.log(filteredBlobs)
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [route]);

  if (isLoading) {
    return <div>Loading...</div>; // Replace this with your loading graphic
  }

  return (
    <div className='flex flex-row flex-wrap gap-10 justify-center my-[100px]'>
      {blobs.map((blobInfo, index) => (
        <img className="object-contain" key={index} src={sessionStorage.getItem(blobInfo.name) || ""} alt={blobInfo.name} />
      ))}
    </div>
  );
}

export default Art;