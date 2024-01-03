import { Post } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";
import TextIcon from "../../assets/align-box-left-bottom-filled.svg";
import StockImage from "../../assets/stock-image.png";
import "./styles/PostCard.css";

interface Porps {
  info: {
    post: Post;
    isLoading: boolean;
  };
}

const PostCard = ({ info }: Porps) => {
  const { post } = info;

  const { title, createdAt, content, featuredImage, tags } = post;

  const dateObj = new Date(createdAt);

  const date = dateObj.toLocaleString("es-MX", {
    month: "2-digit",
    year: "numeric",
  });

  const truncatedContent =
    content.length > 75 ? content.slice(0, 75) + "..." : content;

  console.log(featuredImage);

  return (
    <div className="rounded">
      {!post ? (
        <PostLoader />
      ) : (
        <article className="m-1 article">
          <div className="card shadow">
            <img
              src={featuredImage == undefined ? StockImage : featuredImage}
              alt="Stock"
              className="card-image"
            />
            <div className="card-body">
              <h5 className="card-title text-card">{title}</h5>
              <time
                dateTime={createdAt.toString()}
                className="text-muted text-date"
              >
                {date}
              </time>
              <p className="text-card text-content">{truncatedContent}</p>
            </div>
            <div className="d-flex flex-row-reverse justify-content-between">
              <span className="p-1">
                <img src={TextIcon} alt="Text" />
              </span>
              <div>
                {tags.map((tag, index) => (
                  <span
                    className="p-1 m-2 text-tags"
                    key={index}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostCard;
