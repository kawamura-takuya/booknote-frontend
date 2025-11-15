import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home: React.FC = () => {
  return (
    <div className="site-layout">
      <Header />

      <main className="home-main">
        <div className="site-container">
          <div className="home-main__container">
            <h2 className="home-main__title">BookNoteを始めましょう</h2>
            <p className="home-main__text">読んだ本を記録して、ふりかえりをサポートします</p>
            <Link to="/" className="home-main__sign-up-btn">新規登録</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
