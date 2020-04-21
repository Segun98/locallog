import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About | Tadlace</title>
      </Head>
      <div className="about-page">
        <h3 style={{ margin: "30px 0", textAlign: "center" }}>About Tadlace</h3>
        <div
          className="about-page-body"
        >
          <h5>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
            optio voluptas suscipit laudantium non? Ab dolores praesentium dolor
            saepe soluta architecto minus deleniti inventore illo. Quidem
            inventore quibusdam nulla modi?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum dicta voluptate, quasi alias corrupti cum! Quaerat eos accusantium sed ipsum ducimus nisi, quos doloremque.
          </h5>
          <br />
          <br />
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            quidem distinctio iusto laudantium blanditiis dolore vitae nobis
            libero nemo quos, deserunt maiores eos rem recusandae rerum
            voluptatum ea magnam voluptas odit, facilis voluptates vero unde
            quasi laboriosam. Earum, sunt quasi?
          </h5>
          <br />
          <br />
          <h5>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perferendis amet repudiandae ad ducimus repellendus quaerat.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, possimus. Iste corrupti nihil iure voluptas officiis temporibus, sapiente odio minus exercitationem harum laboriosam ex quibusdam quos molestiae ratione optio deleniti eum ea alias. A, numquam?
          </h5>
          <br />
          <br />
          <h5>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
            eius doloribus velit doloremque blanditiis ab quidem officia ratione
            modi aspernatur, accusamus debitis molestiae vel voluptatibus cumque
            alias numquam maxime voluptatum accusantium officiis repellat!
            Impedit, necessitatibus.
          </h5>
        </div>

        <style jsx>{`
        .about-page-body{
          margin:auto;
          width:90%;
          text-align:justify
        }

        @media only screen and (min-width:600px){
          .about-page-body{
          width:60%;
        }
        }

        @media only screen and (min-width:1300px){
          .about-page-body{
          width:50%;
        }
        }
        
        `}
        </style>
      </div>
    </Layout>
  );
}
