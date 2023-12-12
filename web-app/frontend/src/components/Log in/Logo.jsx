// Logo.js

import React from "react";
import logoImg from "../pics/logo.png";

const Logo = () => {
  return (
    <div style={styles.logo}>
      {/* Include your logo image or any other logo content here */}
      <img
        src={logoImg}
        alt="Logo"
        style={{ width: "300px", height: "auto" }}
      />
    </div>
  );
};

const styles = {
  logo: {
    position: "absolute",
    top: "0px",
    left: "30px",
  },
};

export default Logo;
