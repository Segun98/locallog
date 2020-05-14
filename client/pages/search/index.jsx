// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Layout from "../../components/Layout";
// import Head from "next/head";
// import CategoryList from "../../components/CategoryList";
// import { request } from "graphql-request";
// import { truncateTitle, truncateAlt, endpoint } from "../../utils/utils";

// const SEARCH_QUERY = `
//   {
//     search {
//       titleurl
//       title
//       author
//       date
//       url
//     }
//   }
// `;

// export async function getServerSideProps() {
//   const res = await request(endpoint, SEARCH_QUERY);
//   const posts = await res.posts;

//   return {
//     props: {
//       posts,
//     },
//   };
// }

// export default function Search({ posts }) {
//   const router = useRouter();

//   const { query } = router;


//   const capitalize = (s) => {
//     try {
//       if (typeof s !== "string") return "";
//       return s.charAt(0).toUpperCase() + s.slice(1);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Layout>
//       <Head>
//         <title> Search Locallog </title>
//       </Head>
//       </div>
//     </Layout>
//   );
// }
