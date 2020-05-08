import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menu, setmenu] = useState(false);
  const [search, setsearch] = useState(true);

  function displayMenu() {
    setmenu((prevMenu) => !prevMenu);
  }

  return (
    <div>
      <header>
        <div className="header-wrap">
          <div className="logo">Locallog</div>
          <div className="nav">
            <div className="search">
              <img
                src="/images/search.svg"
                alt="search"
                onClick={() => setsearch((prevsearch) => !prevsearch)}
              />
              <form>
                <input
                  className={
                    search ? "search-input" : "search-input search-close"
                  }
                  type="text"
                  placeholder="Search for a post"
                />
              </form>
            </div>
            <div className="write-a-post">
              <button>
                <Link href="/post/new">
                  <a style={{ color: "white" }}>Write a post</a>
                </Link>
              </button>
            </div>
            <div className="header-menu">
              <img src="/images/menu.svg" alt="menu" onClick={displayMenu} />
              <div
                className="menu-wrap"
                style={{ display: menu ? "block" : "none" }}
                onMouseLeave={() => setmenu(false)}
              >
                <ul>
                  <li>Profile</li>
                  <li>
                    <Link href="/post/new">
                      <a>Write a post</a>
                    </Link>
                  </li>
                  <li>Login/SignUp</li>
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="slider">
        <div className="slide">
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=business">
            <a>Business</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=entertainment">
            <a>Entertainment</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=politics">
            <a>Politics</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=technology">
            <a>Technology</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=lifestyle">
            <a>Lifestyle</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=personal">
            <a>Personal</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=health">
            <a>Health & Wellness</a>
          </Link>
        </div>
        <div className="slide">
          <Link href="/category?category=food">
            <a>Food</a>
          </Link>
        </div>
      </div>

      <style jsx>
        {`
          /* HEADER STYLES */

          header {
            padding: 5px 0;
          }

          .header-wrap {
            margin: auto;
            width: 85%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 35px;
          }

          .nav {
            display: flex;
            align-items: center;
          }

          .search {
            display: flex;
          }

          .search img {
            margin-right: 5px;
            cursor: pointer;
          }

          .search .search-input {
            border: 1px solid black;
            padding: 8px 5px;
            width: 100px;
            display: none;
            border-radius: 5px;
          }

          .search-input.search-close {
            display: block;
          }

          .search input:focus {
            outline: none;
          }

          .write-a-post {
            margin: 0 15px;
            display: none;
          }

          .write-a-post button {
            background: black;
            border: 1px solid black;
            padding: 10px 10px;
            cursor: pointer;
            color: white;
            border-radius: 5px;
          }

          .header-menu {
            position: relative;
          }

          .header-menu img {
            width: 25px;
            cursor: pointer;
            margin-left: 10px;
          }

          .header-menu .menu-wrap {
            position: absolute;
            right: 5px;
            top: 40px;
            z-index: 99999;
          }

          .menu-wrap ul {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            border-radius: 5px;
            background: white;
          }

          .menu-wrap ul li {
            margin-bottom: 10px;
            cursor: pointer;
            border-bottom: 1px solid black;
            display: block;
            text-align: center;
            padding: 3px 7px;
          }

          .menu-wrap ul li:first-child {
            margin-top: 10px;
          }

          .slider {
            display: flex;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 auto;
            margin-top: -2px;
            width: 80%;
            justify-content: space-between;
          }

          .slide {
            flex-shrink: 0;
            margin: 0 5px;
            padding-bottom: 8px;
            font-size: 0.9rem;
          }

          /* TABLET SCREEN  */

          @media only screen and (min-width: 600px) {
            .header-wrap {
              width: 90%;
            }

            .search .search-input {
              width: 300px;
            }

            .slider {
              margin-top: 5px;
            }

            .write-a-post {
              display: block;
            }

            .menu-wrap ul li:nth-child(2) {
              display: none;
            }
          }

          /* IPAD PRO | SMALL LAPTOP  */

          @media only screen and (min-width: 1000px) {
            .search .search-input {
              display: block;
              width: 400px;
            }
          }

          /* LAPTOP  */

          @media only screen and (min-width: 1400px) {
            .header-wrap {
              width: 80%;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2500px) {
            .header-wrap {
              width: 60%;
            }

            .slider {
              width: 60%;
            }
          }
        `}
      </style>
    </div>
  );
}
