import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";
import main, { BlobInfo } from "../../services/blobServiceClient";

const ArtData = () => {
  const { route } = useParams<{ route: string }>();
  const [blobs, setBlobs] = useState<BlobInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState(Math.random());
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return oldProgress + 10;
        });
      }, 200);
      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  console.log(progress);
  useEffect(() => {
    main()
      .then((blobInfos) => {
        const filteredBlobs = blobInfos.filter(
          (blobInfo) =>
            blobInfo.metadata &&
            blobInfo.metadata[route as keyof typeof blobInfo.metadata] ===
              "true"
        );
        setBlobs(filteredBlobs);
        setIsLoading(false);
        setKey(Math.random());
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [route]);

  if (isLoading) {
    return (
      <div className="w-[600px] h-[30px] rounded-lg border-4 border-black mt-[400px] mx-auto">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-sm bg-white transition-width duration-500 ease-out"
        ></div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex  flex-col lg:flex-row flex-wrap gap-5 p-3 lg:gap-10 items-center lg:justify-evenly my-[200px]"
      key={key}
    >
      {blobs.map((blobInfo, index) => (
        <motion.div
          variants={fadeIn(index * 0.2)}
          initial="hidden"
          animate="visible"
          key={index}
        >
          <img
            className="object-contain"
            src={sessionStorage.getItem(blobInfo.name) || ""}
            alt={blobInfo.name}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArtData;
