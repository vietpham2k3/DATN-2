import React from 'react';
import Content from 'views/trang-chu/cua-hang/Content';
import Banner from 'views/trang-chu/trangchu/Banner';
import Footer from 'views/trang-chu/trangchu/Footer';
import Header from 'views/trang-chu/trangchu/Header';

function CuaHang() {
  return (
    <div>
      <Header />
      <div className="content-container">
        <Banner />
      </div>
      <Content />
      <p></p>
      <Footer />
    </div>
  );
}
export default CuaHang;
