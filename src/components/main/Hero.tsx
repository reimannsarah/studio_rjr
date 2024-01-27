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
        <h1 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-bold overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 animate-typing">Welcome to the studio...</h1>
      </div>
    );

  return (
    <div className="flex flex-col my-[200px] items-center lg:flex-row gap-3 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-10 lg:justify-evenly">
      {heroBlobs.map((blobInfo, index) => (
        <motion.div
          variants={slideInFromRight(index * 0.6)}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-center"
          key={index}
        >
          <img
            className="w-3/5 sm:w-2/3 md:w-3/4 lg:w-full object-contain sm:m-2"
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
