import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DEFAULT_SERVER_URL } from "../constant";
import { formatISO9075 } from "date-fns";
import { ROUTES } from "../routing/routes";
import { CurrentUserContext } from "../contextProvider/UserContextProvider";
import { useGetPost } from "../hooks/useGetPost";
import Loader from "../components/Loader";

const SinglePostPage: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const { postData, loading } = useGetPost(id);
  if (!postData) return null;

  const { _id, title, updatedAt, author, cover, content } = postData;

  const fileName = cover.replace(/\\/g, "/");
  const date = formatISO9075(new Date(updatedAt || Date.now()));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="post-page">
      <h1 className="post-title">{title}</h1>
      <div className="post-info">
        <time className="post-date">{date}</time>
        <span className="post-author">by @{author.username}</span>
      </div>
      {author._id === currentUser.id && (
        <Link to={ROUTES.edit(_id)} className="edit-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="edit-link-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <span className="edit-link-text">Edit this post</span>
        </Link>
      )}
      <div className="post-image">
        <img src={`${DEFAULT_SERVER_URL}/${fileName}`} alt="" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default SinglePostPage;
