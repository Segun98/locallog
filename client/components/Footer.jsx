import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <hr />
      <footer>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/post/new">
              <a>Write a Post</a>
            </Link>
          </li>
          <li>
            <Link href="/about#privacy">
              <a>Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/about#terms">
              <a>Terms of Use</a>
            </Link>
          </li>
          <li>
            <Link href="/about#contact">
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <Link href="/about#conduct">
              <a>Code of Conduct</a>
            </Link>
          </li>
        </ul>
        <h4 style={{ textAlign: "center", padding:"5px 0" }}>&copy;Locallog 2020</h4>
      </footer>

      <style jsx>{`
        footer {
          padding: 15px 0 0 0;
        }
        li{
            list-style:none
          }
        ul {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        ul li {
          margin: 5px 0;
        }
        @media only screen and (min-width: 600px) {
          footer {
            margin: auto;
            width: 80%;
            padding: 30px 0 0 0;
          }
          ul {
            flex-direction: row;
            justify-content: space-between;
          }
          
          footer h4 {
            margin: 10px 0;
          }
        }
      `}</style>
    </div>
  );
}
