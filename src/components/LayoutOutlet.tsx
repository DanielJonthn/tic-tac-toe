import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const LayoutOutlet = () => {
  return (
    <div className="outlet">
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutOutlet;
