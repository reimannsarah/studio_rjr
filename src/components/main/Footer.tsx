import { pageStrings } from "../../assets/text/pageStrings";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";

export const Footer = () => {
  return (
    <motion.footer
      variants={fadeIn(6)}
      initial="hidden"
      animate="visible"
      className="text-primary fixed bottom-0 left-0 h-16 w-16"
    >
      <p className="transform -rotate-90">{pageStrings.copyright}</p>
    </motion.footer>
  );
};
