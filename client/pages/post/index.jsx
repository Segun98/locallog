import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js'


export default function index() {

  const convertFromJSONToHTML = (text) => {
    try{
    return { __html: stateToHTML(convertFromRaw(text))}
    } catch(exp) {
    console.log(exp)
    return { __html: 'Error' }
    }
    }
  return (
    <Layout>
        <Head>
        <title>Why You Should (not) Take Coffee Every Day  | Tadlace</title>
        </Head>
      <div style={{margin:"0 auto", width:"70%"}}>
          <br/>
          <br/>
      <h3 style={{textAlign:"center"}}>Why You Should (not) Take Coffee Every Day </h3>
      <br/>
      <br/>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam voluptatem nesciunt deleniti quidem at reprehenderit qui temporibus repellendus laborum placeat. Minus nam maxime iusto culpa aut officia nihil, esse, fugit, accusantium voluptas possimus reprehenderit sunt saepe magni nemo! Optio suscipit impedit sit laudantium sunt inventore nisi ut aliquid eum earum!</p>
      <br/>
      <br/>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo accusantium cumque corporis? Quo consectetur numquam quod? Voluptatem quod maiores, cum et autem, amet ratione ab porro aperiam dolorem obcaecati rem esse nobis! Ratione vero rem aliquam corporis autem, necessitatibus fuga, eveniet vel id earum impedit esse distinctio est nemo quod blanditiis possimus cupiditate dolore repudiandae dolorem cum aliquid. Saepe, nisi.</p>
      <br/>
      <br/>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit eius facilis fuga ipsum nam tempora optio quasi ipsa officiis blanditiis voluptate ut quae consequatur recusandae, assumenda libero ad atque quas possimus molestias perferendis eaque labore porro aut. Repellendus unde iste ducimus, quos accusantium quibusdam placeat laboriosam magnam? Autem, debitis dignissimos?</p>
      <br/>
      <br/>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse officia at molestiae corporis dolore aspernatur voluptatibus velit rerum beatae similique!</p>
      <div dangerouslySetInnerHTML={convertFromJSONToHTML(props.post.description)} > </div>
      <style jsx>
          {`
           p{
               color:black
           }
          `}
        </style>
      </div>
    </Layout>
  );
}
