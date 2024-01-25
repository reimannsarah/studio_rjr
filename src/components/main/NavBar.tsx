import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { slideInFromTop } from "../../../utils/motion";

const NavBar = () => {
  const location = useLocation();

  return (
    <motion.div
      variants={slideInFromTop(5)}
      initial="hidden"
      animate="visible"
      className="absolute right-10 h-16 w-50 p-5 gap-5 flex flex-row z-600 text-primary mt-[50px]"
    >
      <NavLink
        to="/"
        className={location.pathname === "/" ? "text-white" : "text-primary"}
      >
        <p className="hover:line-through">Home</p>
      </NavLink>
      <NavLink
        to="/mixed"
        className={location.pathname === "/mixed" ? "text-white" : "text-primary"}
      >
        <p className="hover:line-through">Mixed Media</p>
      </NavLink>
      <NavLink
        to="/abstract"
        className={location.pathname === "/abstract" ? "text-white" : "text-primary"}
      >
        <p className="hover:line-through">Abstract Paintings</p>
      </NavLink>
      <NavLink
        to="/portrait"
        className={location.pathname === "/portrait" ? "text-white" : "text-primary"}
      >
        <p className="hover:line-through">Portraits</p>
      </NavLink>
      <NavLink
        to="/charcoal"
        className={location.pathname === "/charcoal" ? "text-white" : "text-primary"}
      >
        <p className="hover:line-through">Charcoal Drawings</p>
      </NavLink>
    </motion.div>
  );
};

export default NavBar;
