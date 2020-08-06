import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import { endpoint } from "../utils/utils";

export default function Comments({ id }) {
  useEffect(() => {
    fetchComments();
  }, []);
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [disable, setdisable] = useState(false);
  const [error, seterror] = useState(false);

  const Comments = `
      {
        comments {
          postid
          email
          name
          comment
          date
        }
      }
      `;

  async function fetchComments() {
    try {
      const res = await request(endpoint, Comments);
      const data = await res.comments;
      setcomments(data);
      setdisable(false);
    } catch (err) {
      console.log(err);
    }
  }
  const postcomments = comments.filter((comment) => comment.postid === id);

  const make_comment = `
  mutation makeComment(
    $name: String!
    $postid: String!
    $email: String!
    $comment: String!
    $date: String!
  ) {
    makeComment(
    name: $name
    postid: $postid
    email : $email
    comment: $comment
    date: $date
    ) {
     comment
     name
     date
    }
  }
  `;

  async function onsubmit(e) {
    e.preventDefault();
    //date
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", dateOptions);

    const variables = {
      name,
      postid: id,
      email,
      comment,
      date,
    };

    try {
      seterror(false);
      setdisable(true);
      await request(endpoint, make_comment, variables);
      setname("");
      setemail("");
      setcomment("");
      fetchComments();
      setdisable(false);
    } catch (err) {
      console.log(err);
      setdisable(false);
      seterror(true);
    }
  }

  return (
    <div>
      <section>
        <div
          style={{
            display: postcomments.length === 0 ? "none" : "block",
            margin: "auto",
            width: "90%",
            padding: "5px",
          }}
        >
          <h3>Comments</h3>
        </div>
        <div>
          {postcomments.map((comment, index) => (
            <ul key={index}>
              <li>{comment.name}</li>
              <li>{comment.comment}</li>
              <li>{comment.date}</li>
            </ul>
          ))}
        </div>
        <form autoComplete="on" onSubmit={onsubmit}>
          <h3>Write a comment</h3>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              required
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              required
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="comment"></label>
            <textarea
              cols="45"
              rows="5"
              name="comment"
              maxLength="400"
              placeholder="Type a Comment..."
              required
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
              style={{ padding: "15px 10px", width: "100%" }}
            ></textarea>
          </div>
          <div
            style={{ textAlign: "center", display: disable ? "block" : "none" }}
          >
            <img src="/images/spinner.png" alt="spinner" className="spinner" />
          </div>
          <div
            style={{
              textAlign: "center",
              color: "red",
              display: error ? "block" : "none",
            }}
          >
            <h3>
              An error occured, check your internet connection and try again
            </h3>
          </div>
          <button type="submit" disabled={disable}>
            submit
          </button>
        </form>
      </section>
      <style jsx>{`
        form {
          margin: auto;
          width: 70%;
          padding-top: 10px;
        }

        @media only screen and (min-width: 700px) {
          form {
            width: 60%;
          }
        }
        form div {
          margin-top: 5px;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid lightgrey;
        }
        button {
          padding: 10px 20px;
          background: rgb(62, 82, 163);
          color: white;
          border: none;
          margin-bottom: 10px;
          border-radius: 7px;
        }
        ul {
          margin: auto;
          width: 90%;
          border: 1px solid lightgrey;
          margin-bottom: 3px;
          padding: 10px;
        }
        li {
          list-style: none;
        }
        ul li:first-child {
          font-size: 13px;
          color: rgb(51, 62, 99);
        }
        ul li:last-child {
          font-size: 13px;
          text-align: right;
        }
        h3 {
          color: rgb(51, 62, 99);
        }
      `}</style>
    </div>
  );
}
