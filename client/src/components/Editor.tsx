import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

interface EditorProps {
  content: string;
  changeContentHandler: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, changeContentHandler }) => {
  return (
    <ReactQuill
      modules={modules}
      value={content}
      theme="snow"
      onChange={(value) => changeContentHandler(value)}
      id="quillContent"
    />
  );
};

export default Editor;
