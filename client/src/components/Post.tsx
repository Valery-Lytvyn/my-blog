import React from "react";
import { ResponsePostType } from "../types";
import { DEFAULT_SERVER_URL } from "../constant";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { ROUTES } from "../routing/routes";

const Post: React.FC<ResponsePostType> = ({
  _id,
  title,
  summary,
  cover,
  updatedAt,
  author,
}) => {
  const fileName = cover.replace(/\\/g, "/");
  const date = formatISO9075(new Date(updatedAt || Date.now()));

  return (
    <div className="post">
      <div className="  post-image">
        <Link to={ROUTES.post(_id)}>
          <img src={`${DEFAULT_SERVER_URL}/${fileName}`} alt={title} />
        </Link>
      </div>
      <div className="post-text">
        <h2 className="post-title">
          <Link to={ROUTES.post(_id)}>{title}</Link>
        </h2>
        <p className="post-info">
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="author"
          >
            {author?.username}
          </a>
          <span className="time">{date} </span>
        </p>
        <p className="post-description">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
