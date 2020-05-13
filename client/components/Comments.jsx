import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import ErrorMessage from "./ErrorMessage";

export default function Comments({ id }) {
  useEffect(() => {
    fetchComments();
  }, []);
  const [comments, setcomments] = useState([]);
  const [disable, setdisable] = useState(false);
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
    const localendpoint = "http://localhost:8080/graphql";
    // const prodendpoint = "https://backlog.now.sh/graphql"
    const res = await request(localendpoint, Comments);
    const data = await res.comments;
    setcomments(data);
  }

  if (comments.length === 0) {
    const message = "Loading Comments...";
    return <ErrorMessage message={message} />;
  } else if (posts.length > 0) {
    var comments = comments.filter((comment) => comment.postid !== id);
  }

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
    setdisable(true);

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
      const localendpoint = "http://localhost:8080/graphql";
      // const prodendpoint = "https://backlog.now.sh/graphql";
      await request(localendpoint, make_comment, variables);
      setname("");
      setemail("");
      setcomment("");
      fetchComments();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <section>
        <div>
          {comments.map((comment) => (
            <ul>
              <li key={comment.postid}>{comment.comment}</li>
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

          <button disabled={disable} type="submit">
            submit
          </button>
        </form>
      </section>
      <style jsx>{``}</style>
    </div>
  );
}
