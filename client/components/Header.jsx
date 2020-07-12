import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [menu, setmenu] = useState(false);
  const [search, setsearch] = useState("");

  function displayMenu() {
    setmenu((prevMenu) => !prevMenu);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search !== "") {
      router.push(`/search?author=${search}`);
    }
  }

  return (
    <div>
      <aside
        style={{
          display: router.pathname === "/post/new" ? "none" : "block",
        }}
      >
        <h5>
          Write A Post On Locallog Today, No SignUp Required!{" "}
          <Link href="/post/new">
            <a>CLICK HERE</a>
          </Link>
        </h5>
      </aside>
      <header>
        <div className="header-wrap">
          <div className="logo">
            <Link href="/">
              <a>Locallog</a>
            </Link>
          </div>
          <div className="nav">
            <form onSubmit={handleSearch}>
              <button
                type="submit"
                style={{ background: "none", border: "none" }}
              >
                <img src="/images/search.svg" alt="search" />
              </button>
              <div>
                <label htmlFor="search"></label>
                <input
                  className="search-input"
                  name="search"
                  type="text"
                  value={search}
                  placeholder="Find author or post..."
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
              </div>
            </form>
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
                  <li>
                    <Link href="/post/new">
                      <a>Write a post</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#contact">
                      <a>Contact</a>
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
          <Link href="/category?category=covid-19">
            <a>Covid-19</a>
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

          aside {
            text-align: center;
            padding: 12px;
            background: #805ad5;
            color: white;
            font-size: 14px;
          }

          @media only screen and (min-width: 700px) {
            font-size: 0.9rem;
          }
          aside a {
            color: lightgreen;
            text-decoration: underline;
          }

          header {
            padding: 5px 0;
          }

          .header-wrap {
            margin: auto;
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo a {
            font-size: 25px;
            color: rgb(51, 62, 99);
          }

          .nav {
            display: flex;
            align-items: center;
          }

          .search-input {
            border: 1px solid black;
            padding: 5px 5px;
            width: 130px;
            border-radius: 5px;
            margin-left: 5px;
          }
          form {
            display: flex;
            align-items: center;
          }
          form img {
            width: 15px;
            height: 15px;
          }
          form input:focus {
            outline: none;
          }

          .write-a-post {
            margin: 0 15px;
            display: none;
          }

          .write-a-post button {
            background: rgb(62, 82, 163);
            border: 1px solid rgb(62, 82, 163);
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
            width: 130px;
          }

          .menu-wrap ul li {
            margin-bottom: 10px;
            cursor: pointer;
            border-bottom: 1px solid black;
            display: block;
            text-align: center;
            padding: 3px 10px;
            list-style: none;
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
            .logo a {
              font-size: 28px;
            }
            .header-wrap {
              width: 90%;
            }

            form .search-input {
              width: 300px;
            }

            .slider {
              margin-top: 5px;
            }

            .write-a-post {
              display: block;
            }

            .menu-wrap ul li:nth-child(1) {
              display: none;
            }
          }

          /* IPAD PRO | SMALL LAPTOP  */

          @media only screen and (min-width: 1000px) {
            form .search-input {
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
