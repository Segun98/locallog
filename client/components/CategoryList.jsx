import React from "react";
import Link from "next/link";

export default function CategoryList({
  key,
  href,
  src,
  alt,
  title,
  author,
  date,
}) {
  return (
      <div>
        <Link href={href}>
          <a>
            <div className="category-item">
              <img src={src} alt={alt} />
              <div className="category-item-content">
                <h4>{title}</h4>
                <p style={{ margin: "5px 0" }}>{author}</p>
                <h6>{date}</h6>
              </div>
            </div>
          </a>
        </Link>
      </div>
  );
}
