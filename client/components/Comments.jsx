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
    } catch (err) {
      err.response.message
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
      await request(endpoint, make_comment, variables);
      setname("");
      setemail("");
      setcomment("");
      fetchComments();
    } catch (err) {
      console.log(err.response.message);
    }
  }

  return (
    <div>
      <section>
        <div>
          {postcomments.map((comment, index) => (
            <ul key={index}>
              <li>{comment.comment}</li>
            </ul>
          ))}
        </div>
        <form autoComplete="on" onSubmit={onsubmit}>
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

          <button type="submit">
            submit
          </button>
        </form>
      </section>
      <style jsx>{``}</style>
    </div>
  );
}
