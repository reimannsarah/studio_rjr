import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
      <div className="fixed right-0 h-16 w-50 p-5 gap-5 flex flex-row z-600 text-primary">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/mixed">
          <p>Mixed Media</p>
        </NavLink>
        <NavLink to="/abstract">
          <p>Abstract Paintings</p>
        </NavLink>
        <NavLink to="/portrait">
          <p>Portraits</p>
        </NavLink>
        <NavLink to="/charcoal">
          <p>Charcoal Drawings</p>
        </NavLink>
      </div>
  );
};

export default NavBar;
