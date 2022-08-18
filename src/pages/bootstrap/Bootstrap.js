import React from "react";
import "./Bootstrap.scss";
import ProductSection from "../../features/product/ProductSection";
import NavbarBootStcrap from "../../features/navbarBootstrap/NavbarBootStcrap";
import Slider from "../../features/slider/Slider";

export default function Bootstrap() {
  return (
    <div>
      <header className="text-white">
        <NavbarBootStcrap/>
      </header>
      <main>
        <Slider/>
        <div id="productSection" className="my-5">
          <h1 className="text-center pb-3">My Products</h1>
          <div className="container">
            <div className="row">
              <ProductSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
