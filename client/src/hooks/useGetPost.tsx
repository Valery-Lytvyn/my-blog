import { useEffect, useState } from "react";
import { ResponsePostType } from "../types";
import { DEFAULT_SERVER_URL } from "../constant";

export const useGetPost = (id: string | undefined) => {
  const [postData, setPostData] = useState<ResponsePostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${DEFAULT_SERVER_URL}/post/${id}`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          console.log("data:", data);
          setPostData({ ...data });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting post:", error);
        setLoading(false);
      }
    };

    if (id) {
      getPost();
    }
  }, [id]);

  return {
    postData,
    loading,
  };
};
