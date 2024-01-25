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
      <div className="w-full h-[30px] rounded-lg border-4 border-black mt-[400px]">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-sm bg-[#21ACAB] transition-width duration-500 ease-out"
        ></div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-row flex-wrap gap-10 justify-center my-[100px]"
      key={key}
    >
      {blobs.map((blobInfo, index) => (
        <motion.div
          variants={fadeIn(0.5)}
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
