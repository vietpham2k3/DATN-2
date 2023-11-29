import React from 'react';
import Banner from '../trangchu/Banner';
import Content from '../trangchu/Content';
import Footer from '../trangchu/Footer';
import Header from '../trangchu/Header';

function TrangChu() {
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
export default TrangChu;
