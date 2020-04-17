import { useState } from "react";

export default function Header(): JSX.Element {
  const [menu, setmenu] = useState(false);
  const [search, setsearch] = useState(true);

  function displayMenu() {
    setmenu((prevMenu) => !prevMenu);
  }

  return (
    <div>
      <header>
        <div className="header-wrap">
          <div className="logo">Tadlace</div>
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
              <button>Write a post</button>
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
                  <li>Write a post</li>
                  <li>Login/SignUp</li>
                  <li>Settings</li>
                  <li>About</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="slider">
        <div className="slide">Home</div>
        <div className="slide">Entertainment</div>
        <div className="slide">Politics</div>
        <div className="slide">Tech</div>
        <div className="slide">Lifestyle</div>
        <div className="slide">Personal</div>
        <div className="slide">Health & Wellness</div>
        <div className="slide">Food</div>
      </div>
    </div>
  );
}
