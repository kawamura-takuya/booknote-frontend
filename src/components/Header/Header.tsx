import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__inner">
          <h1><Link to="/" className="site-header__title">BookNote</Link></h1>
          <nav className="site-header__nav">
            <Link to="/" className="site-header__nav-link">トップ</Link>
            <Link to="/" className="site-header__nav-link">ログイン</Link>
            <Link to="/" className="site-header__nav-link">Googleでログイン</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;
