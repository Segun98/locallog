import React, { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Footer from "../components/Footer";
import axios from "axios";

export default function About() {
  const [disable, setdisable] = useState(false);
  const [error, seterror] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setbody] = useState("");
  const [subject, setsubject] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlebody(e) {
    setbody(e.target.value);
  }

  function handlesubject(e) {
    setsubject(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      email,
      subject,
      body: `${body}


      From: ${name}
      `,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setdisable(true);
      seterror(false);
      await axios.post("/api/contact", payload, config);
      setEmail("");
      setName("");
      setbody("");
      setsubject("");
      setdisable(false);
      alert("Message Sent!");
    } catch (err) {
      console.log(err.response);
      setdisable(false);
      seterror(true);
    }
  }

  return (
    <Layout>
      <Head>
        <title>About | Locallog</title>
        <meta
          name="Description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="keywords" content="Publishing, Platform , Locallog" />
        <meta name="author" content="Segun Olanitori" />
        <meta
          property="og:description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="twitter:title" content="Locallog" />
        <meta
          name="twitter:description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Locallog" />
        <meta property="og:site_name" content="Locallog" />
        <meta property="article:publisher" content="Segun Olanitori" />
        <meta property="article:author" content="Segun Olanitori" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dowrygm9b/image/upload/v1596675066/tadlog/20200517_232032_0000_xvpy87.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dowrygm9b/image/upload/v1596675066/tadlog/20200517_232032_0000_xvpy87.png"
        />
      </Head>
      <div className="about-page">
        <h3 style={{ margin: "15px 0", textAlign: "center" }}>
          About Locallog
        </h3>
        <div className="about-page-body">
          <p>
            Locallog is an online publishing platform created for people to
            share their stories, inform and impact the rest of the world, one
            article at a time.
          </p>
          <h4 style={{ textAlign: "center", margin: "5px 0" }}>
            What You Get on Locallog
          </h4>
          <ul>
            <li>Publish articles easily without having to log in or sign up</li>
            <li>
              Full control - Your articles are published exactly how you write
              them; no ads in between, all stylings are the same.
            </li>
            <li>
              Rich Text-Editor (Jodit) - Use keyboard shortcuts on texts. You
              get a fully responsive interface for easy writing even on your
              mobile phone
            </li>
            <li>
              Aggregate your articles in a shareable page, search by your name
              in the search box.
            </li>
            <li>Edit your post</li>
            <li>Read Comments under your post</li>
            <li>Search Engine Optimization</li>
            <li>Add an author Profile</li>
          </ul>
          <br />
          <section className="privacy" id="privacy">
            <h3 style={{ textAlign: "center" }}>Privacy Policy</h3>
            <p>
              Locallog collects basic information as you visit and write on the
              website. They Include:
            </p>
            <ul>
              <li>Email</li>
              <li>
                Information you submit, such as comments and contact messages
                sent to us
              </li>
            </ul>
            <br />
            <p>
              We do not share or sell user personal information with third
              parties
            </p>
            <br />
            <p>
              We run adverts in strategic spaces on the website, ensuring they
              do not collide with a writer's content
            </p>
            <br />
            <p>
              We currently provide an Edit Post feature available in a writer's
              Email as they publish a post
            </p>
            <br />
            <p>
              You can request for the deletion of all your information, Posts
              and Comments, by <a href="/about#contact">contacting us</a>
            </p>
            <br />
            <p>
              We reserve the right to update this policy at any time, the time
              of revision will be clearly stated on this page
            </p>
          </section>
          <br />
          <section className="conduct" id="conduct">
            <h3 style={{ textAlign: "center" }}>Code of Conduct</h3>
            <p>Unacceptable Behaviour</p>
            <ul>
              <li>Trolling, insulting comments </li>
              <li>Personal and Political attacks</li>
              <li>
                Publishing others' data, information or work without explicit
                permission or credit
              </li>
            </ul>
            <p>
              Report any form of abuse <a href="/about#contact">below</a>{" "}
            </p>
          </section>
          <br />
          <section className="terms" id="terms">
            <h3 style={{ textAlign: "center" }}>Terms of Use</h3>
            <p>
              By accessing this website, you are agreeing to be bound by our
              terms of use, privacy policy and code of conduct
            </p>
            <p>
              Violaton of any of these can lead to us taking down your comments
              or posts
            </p>
          </section>
          <br />
          <div id="contact">
            <h4 style={{ textAlign: "center" }}>
              For further assistance, Contact US
            </h4>

            <form autoComplete="on" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Name">Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name..."
                  required
                  value={name}
                  onChange={handleName}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="example@email.com"
                  autoComplete="on"
                  value={email}
                  onChange={handleEmail}
                />
              </div>

              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  placeholder="subject..."
                  value={subject}
                  onChange={handlesubject}
                />
              </div>
              <div>
                <label htmlFor="info">Body</label>
                <br />
                <textarea
                  cols="45"
                  rows="12"
                  value={body}
                  onChange={handlebody}
                  placeholder="Start typing..."
                  required
                  style={{ padding: "15px 10px", width: "100%" }}
                ></textarea>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    textAlign: "center",
                    display: disable ? "block" : "none",
                  }}
                >
                  <img
                    src="/images/spinner.png"
                    alt="spinner"
                    className="spinner"
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                    display: error ? "block" : "none",
                  }}
                >
                  <h3>
                    An error occured, check your internet connection and try
                    again
                  </h3>
                </div>
                <button disabled={disable} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <br />
        <Footer />
        <style jsx>
          {`
            .about-page-body {
              margin: auto;
              width: 90%;
              text-align: justify;
            }
            p,
            li,
            h3,
            h4,
            label {
              color: rgb(51, 62, 99);
            }

            ul li {
              list-style: square;
              line-height: 1.5;
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
            @media only screen and (min-width: 600px) {
              .about-page-body {
                width: 60%;
              }
            }

            @media only screen and (min-width: 1200px) {
              .about-page-body {
                width: 50%;
              }
              #contact {
                margin: auto;
                width: 70%;
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
