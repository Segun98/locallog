// import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { NetworkStatus } from "apollo-client";
// import gql from "graphql-tag";

// export const ALL_POSTS_QUERY = gql`
//   {
//     posts {
//       id
//       author
//     }
//   }
// `;

// export default function Post() {
//   const [graphdata, setgraphdata] = useState([]);
//   const { data } = useQuery(ALL_POSTS_QUERY, {
//     // Setting this value to true will make the component rerender when
//     // the "networkStatus" changes, so we are able to know if it is fetching
//     // more data
//     notifyOnNetworkStatusChange: true,
//   });
//   useEffect(() => {
//     setgraphdata(data.posts);
//   }, []);
//   console.log(graphdata);

//   return <div>{graphdata.map((dat,index)=> (
//       <div key={index}>{dat.author}</div>
//   ))}</div>;
// }
