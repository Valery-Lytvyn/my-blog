import React, { useEffect, useState } from "react";
import usePostForm from "../hooks/useFormPost";
import CreatePostInput from "../components/ui/CreatePostInput";
import Editor from "../components/Editor";
import SubmitButton from "../components/ui/SubmitButton";
import { Navigate, useParams } from "react-router-dom";
import { useGetPost } from "../hooks/useGetPost";
import { DEFAULT_SERVER_URL } from "../constant";
import { ROUTES } from "../routing/routes";

const defaultData = {
  title: "",
  summary: "",
  content: "",
  file: null,
};

const EditPostPage = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const { id } = useParams();
  const { postData } = useGetPost(id);

  const {
    formData,
    setFormData,
    changeInputHandler,
    changeFileInputHandler,
    changeContentHandler,
    previewImg,
  } = usePostForm(defaultData);

  useEffect(() => {
    if (postData) {
      setFormData((prev) => ({
        ...prev,
        title: postData.title,
        summary: postData.summary,
        file: postData.cover,
        content: postData.content,
      }));
    }
  }, [postData, setFormData]);

  const editPost = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (id) {
        formDataToSend.append("id", id);
      }
      formDataToSend.append("title", formData.title);
      formDataToSend.append("summary", formData.summary);
      formDataToSend.append("file", formData.file || "");
      formDataToSend.append("content", formData.content);

      const response = await fetch(`${DEFAULT_SERVER_URL}/post`, {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        setIsRedirect(true);
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.post(id || "")} />;
  }
  const filename = formData.file?.toString().replace(/\\/g, "/");

  return (
    <form className="crete-post-form" onSubmit={editPost}>
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
      {(formData.file || previewImg) && (
        <div className="post-image">
          <img
            src={previewImg ? previewImg : `${DEFAULT_SERVER_URL}/${filename}`}
            alt={formData.title}
          />
        </div>
      )}

      <CreatePostInput
        id="imageFile"
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

export default EditPostPage;
