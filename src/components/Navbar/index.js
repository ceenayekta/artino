import Appbar from "./Appbar";
import Menu from "./Menu";

import React from "react";

const Navbar = ({ newAdd, setNewAdd }) => {
  return (
    <div>
      <Appbar newAdd={newAdd} setNewAdd={setNewAdd} />
      <Menu />
    </div>
  );
};

export default Navbar;
