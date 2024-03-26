import React, { useState } from "react";
import CreatePostInput from "../components/ui/CreatePostInput";
import SubmitButton from "../components/ui/SubmitButton";
import { DEFAULT_SERVER_URL } from "../constant";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routing/routes";
import Editor from "../components/Editor";
import usePostForm from "../hooks/useFormPost";

const defaultFormData = {
  title: "",
  summary: "",
  content: "",
  file: null,
};

const CreatePostPage: React.FC = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const {
    formData,
    changeInputHandler,
    changeFileInputHandler,
    changeContentHandler,
    previewImg,
  } = usePostForm(defaultFormData);

  const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("summary", formData.summary);
      formDataToSend.append("file", formData.file || "");
      formDataToSend.append("content", formData.content);

      const response = await fetch(`${DEFAULT_SERVER_URL}/post`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        setIsRedirect(true);
      } else {
        throw new Error("Failed to create new post");
      }
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.index} />;
  }

  return (
    <form className="crete-post-form" onSubmit={createNewPost}>
      <CreatePostInput
        id="title"
        type="text"
        placeholder="title"
        value={formData.title}
        changeInputHandler={changeInputHandler}
      />
      <CreatePostInput
        id="summary"
        type="text"
        placeholder="summary"
        value={formData.summary}
        changeInputHandler={changeInputHandler}
      />
      {formData.file && previewImg && (
        <div className="post-image">
          <img src={previewImg} alt={formData.title} />
        </div>
      )}
      <CreatePostInput
        id="file"
        type="file"
        changeInputHandler={changeFileInputHandler}
      />
      <Editor
        content={formData.content}
        changeContentHandler={changeContentHandler}
      />
      <SubmitButton title="Create Post" />
    </form>
  );
};

export default CreatePostPage;
