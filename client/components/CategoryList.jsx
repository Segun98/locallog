import React from "react";
import Link from "next/link";

export default function CategoryList({ href, src, alt, title, author, date }) {
  return (
    <div>
      <Link href={href} as={href}>
        <a>
          <div className="category-item">
            <img src={src} alt={alt} loading="lazy" />
            <div className="category-item-content">
              <h6>{title}</h6>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>{author}</p>
              <h6>{date}</h6>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        h5,
        h6 {
          color: rgb(51, 62, 99);
        }

        h6 {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
