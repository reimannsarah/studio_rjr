import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed top-0 right-0 space-y-4 p-4">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/mixed-media">
          <p>Mixed Media</p>
        </NavLink>
        <NavLink to="/abstract-paintings">
          <p>Abstract Paintings</p>
        </NavLink>
        <NavLink to="/portraits">
          <p>Portraits</p>
        </NavLink>
        <NavLink to="/charcoal-drawings">
          <p>Charcoal Drawings</p>
        </NavLink>
      </div>
  );
};

export default NavBar;
