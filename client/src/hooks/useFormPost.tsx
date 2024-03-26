import { useCallback, useEffect, useState } from "react";
import { PostType } from "../types";

const usePostForm = (defaultFormData: PostType) => {
  const [formData, setFormData] = useState<PostType>(defaultFormData);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (!formData.file || typeof formData.file === "string") {
      setPreviewImg(null);
      return;
    } else {
      objectUrl = URL.createObjectURL(formData.file as File);
      setPreviewImg(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [formData.file]);

  const changeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    },
    [setFormData],
  );

  const changeFileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFormData((prev) => ({ ...prev, file: selectedFile as File }));
    }
  };

  const changeContentHandler = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  return {
    formData,
    setFormData,
    changeInputHandler,
    changeFileInputHandler,
    changeContentHandler,
    previewImg,
  };
};

export default usePostForm;
