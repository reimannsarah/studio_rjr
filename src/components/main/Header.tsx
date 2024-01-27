import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <motion.div
      variants={fadeIn(4)}
      initial="hidden"
      animate="visible"
      className="absolute h-16 w-16 left-0 lg:w-16 z-600  ml-8 z-600 sm:text-center"
    >
      <NavLink to="/">
        <h1 className="text-primary text-[50px] sm:text-[80px] md:text[100px] lg:text-[120px] xl:text[140px] font-header">StudioRJR</h1>
      </NavLink>
    </motion.div>
  );
};
