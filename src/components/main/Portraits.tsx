import { useState, useEffect } from 'react'
import main, { BlobInfo } from '../../services/blobServiceClient';

const Portraits = () => {
  const [heroBlobs, setHeroBlobs] = useState<BlobInfo[]>([]);

  useEffect(() => {
    main()
      .then((blobInfos) => {
        const heroBlobs = blobInfos.filter((blobInfo) => blobInfo.metadata && blobInfo.metadata.subject === 'portrait');
        setHeroBlobs(heroBlobs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {heroBlobs.map((blobInfo, index) => (
        <img key={index} src={sessionStorage.getItem(blobInfo.name) || ""} alt={blobInfo.name} />
      ))}
    </div>
  );
}

export default Portraits