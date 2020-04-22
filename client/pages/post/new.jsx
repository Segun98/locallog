import { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Layout from "../../components/Layout";
import Head from "next/head";

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());

  const [uploadedImages, setuploadedImages] = useState([]);

  const uploadCallback = (file) => {
    // Make sure you have a uploadImages: [] as your default state
    //  let uploadedImages = uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);

    setuploadedImages(uploadedImages);

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
    // const formData = new FormData();
    // formData.append("file", file);
    // return new Promise((resolve, reject) => {
    //   fetch("http://localhost:5000/uploadImage", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((res) => res.json())
    //     .then((resData) => {
    //       console.log(resData);
    //       resolve({ data: { link: resData } });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       reject(error.toString());
    //     });
    // });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      description: convertToRaw(description.getCurrentContent()),
    };
    console.log("POST: ", newPost);
    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle("");
        setDescription(EditorState.createEmpty());
        history.goBack();
      })
      .catch((err) => console.log("ERROR:", err));
  };

  return (
    <Layout>
      <Head>
        <title>New Post | Tadlace </title>
      </Head>

      <div>
        <form onSubmit={onSubmit}>
          <Editor
            editorState={description}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(editorState) => setDescription(editorState)}
            toolbar={{
              image: {
                uploadCallback,
                previewImage: true,
                alt: { present: true, mandatory: false },
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              },
            }}
            wrapperStyle={{ border: "2px solid green", marginBottom: "20px" }}
            editorStyle={{ height: "400px", padding: "10px" }}
          />
          <button onClick={onSubmit} type="submit">
            submit
          </button>
        </form>

        <style jsx>
          {`
            .wrapperClassName {
              width: 300px;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
