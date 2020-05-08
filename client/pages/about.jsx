import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Footer from "../components/Footer";

export default function About() {
  
  return (
    <Layout>
      <Head>
        <title>About | Tadlace</title>
        <meta
          name="Description"
          content=" Tadlace is an online publishing platform built for people to express
            themselves"
        />
        <meta name="keywords" content="Publishing, Platform , Tadlace" />
        <meta name="author" content="Segun Olanitori" />
        <meta
          property="og:description"
          content=" Tadlace is an online publishing platform built for people to express
            themselves"
        />
        <meta name="twitter:title" content="Tadlace" />
        <meta
          name="twitter:description"
          content=" Tadlace is an online publishing platform built for people to express
            themselves"
        />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Tadlace" />
        <meta property="og:site_name" content="Tadlace" />
        <meta property="article:publisher" content="Segun Olanitori" />
        <meta property="article:author" content="Segun Olanitori" />
      </Head>
      <div className="about-page">
        <h3 style={{ margin: "20px 0", textAlign: "center" }}>About Tadlace</h3>
        <div className="about-page-body">
          <h5>
            Tadlace is an online publishing platform built for people to share
            their thoughts, read other people's thoughts and express themselves
          </h5>
          <br />
          <h5>
            This website was developed by Segun Olanitori, a Front End Developer
            who loves to build useful solutions on the web
          </h5>
          <br />
          <h5>
            This website is a work in progress, I was too excited so I released
            it early.
          </h5>
          <br />
          <h5>
            I need a volunteer Fullstack developer to assist in completing this
            project, It was built with Nextjs, GraphQL, ExpressJs and MongoDB.{" "}
            <a
              href="https://github.com/Segun98/Blog-Nextjs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              GitHub
            </a>
          </h5>
          <br />
          <h5>Updates Coming</h5>
          <ul>
            <li>Authentication(Login/signUp)</li>
            <li>Author Profile</li>
            <li>Comments</li>
          </ul>
          <br />
          <div id="contact">
            Contact Me{" "}
            <a
              href="https://segunos.tk/contact"
              style={{ textDecoration: "underline" }}
            >
              {" "}
              Here
            </a>
          </div>
          <br />
        </div>

        <Footer />
        <style jsx>
          {`
            .about-page-body {
              margin: auto;
              width: 90%;
              text-align: justify;
            }

            ul li {
              list-style: circle;
            }

            @media only screen and (min-width: 600px) {
              .about-page-body {
                width: 60%;
              }
            }

            @media only screen and (min-width: 1300px) {
              .about-page-body {
                width: 50%;
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}

