import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { ROUTES } from "../routing/routes";
import { Link } from "react-router-dom";
import { DEFAULT_SERVER_URL } from "../constant";
import { ResponsePostType } from "../types";

const IndexPage: React.FC = () => {
  const [postsData, setPostsData] = useState<ResponsePostType[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${DEFAULT_SERVER_URL}/posts`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const posts = await res.json();

        if (posts.length) {
          setPostsData([...posts]);
        }
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="index-page">
      <Link to={ROUTES.create} className="create-post-link">
        <h3>Create new Post</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="add-logo"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Link>
      {postsData &&
        postsData.length > 0 &&
        postsData.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default IndexPage;
