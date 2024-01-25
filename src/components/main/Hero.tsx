import { useEffect, useState } from "react";
import main, { BlobInfo } from "../../services/blobServiceClient";
import { motion } from "framer-motion";
import { slideInFromRight } from "../../../utils/motion";

const Hero = () => {
  const [heroBlobs, setHeroBlobs] = useState<BlobInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  main()
    .then((blobInfos) => {
      const heroBlobs = blobInfos.filter(
        (blobInfo) => blobInfo.metadata && blobInfo.metadata.hero === "true"
      );
      setHeroBlobs(heroBlobs);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
}, []);

  if (isLoading)
    return (
      <div className="mt-[400px] w-max my-0 mx-auto">
        <h1 className="text-white text-[100px] text-header animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl font-bold">Welcome to the studio...</h1>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-evenly my-[200px] w-full">
      {heroBlobs.map((blobInfo, index) => (
        <motion.div
          variants={slideInFromRight(index * 0.6)}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-center"
          key={index}
        >
          <img
            className="object-contain"
            key={index}
            src={sessionStorage.getItem(blobInfo.name) || ""}
            alt={blobInfo.name}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Hero;
