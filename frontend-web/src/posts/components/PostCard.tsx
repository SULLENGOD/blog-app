import { Post } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";
import StockImage from "../../assets/stock-image.png";
import "./styles/PostCard.css";
import { Link } from "react-router-dom";

interface Porps {
  info: {
    post: Post;
    isLoading: boolean;
  };
}

const PostCard = ({ info }: Porps) => {
  const { post } = info;

  const { title, createdAt, featuredImage, tags, _id } = post;

  const dateObj = new Date(createdAt);

  const date = dateObj.toLocaleString("es-MX", {
    month: "2-digit",
    year: "numeric",
  });

  return (
      <Link to={`/posts/${_id}`} >
        <div className="p-5 flex flex-col justify-between hover:bg-black-paper-90  border-black-paper border-b bg-white-paper-20 group transition-all max-h-[240px]">
          {!info ? (
            <PostLoader />
          ) : (
            <article className="m-1">
              <div className="card">
                <img
                  src={featuredImage == undefined ? StockImage : featuredImage}
                  alt="Stock"
                  className="max-h-36 min-w-52"
                />
                <div className="flex flex-col justify-between text-balance">
                  <time
                    dateTime={createdAt.toString()}
                    className="text-black-paper-50 text-vs"
                  >
                    {date}
                  </time>
                  <h5 className="text-black-paper mb-3 text-xs group-hover:text-white-paper">
                    {title}
                  </h5>
                </div>
              </div>
            </article>
          )}
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <span
                className="p-1 text-black-paper text-vs group-hover:text-white-paper"
                key={index}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
  );
};

export default PostCard;
