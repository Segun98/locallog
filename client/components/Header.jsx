import { useState } from "react";
import Link from 'next/link'

export default function Header(){
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
              <button><Link href='/post/newpost'><a style={{color:'white'}}>Write a post</a></Link></button>
            </div>
            <div className="header-menu">
              <img src="/images/menu.svg" alt="menu" onClick={displayMenu} />
              <div
                className="menu-wrap"
                style={{ display: menu ? "block" : "none" }}
                onMouseLeave={() => setmenu(false)}
              >
                <ul>
                  <li><Link href='/profile'><a>Profile</a></Link></li>
                  <li><Link href='/post/newpost'><a>Write a post</a></Link></li>
                  <li><Link href='/login'><a>Login/SignUp</a></Link></li>
                  <li><Link href='/about'><a>About</a></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="slider">
        <div className="slide"><Link href="/"><a>Home</a></Link></div>
        <div className="slide"><Link href="/category/tech?category=ent" as ="/category/tech/ent"><a>Entertainment</a></Link></div>
        <div className="slide">Politics</div>
        <div className="slide"><Link href="/category/tech"><a>Tech</a></Link></div>
        <div className="slide">Lifestyle</div>
        <div className="slide">Personal</div>
        <div className="slide">Health & Wellness</div>
        <div className="slide">Food</div>
      </div>
    </div>
  );
}
