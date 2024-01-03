import { Post } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";
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

  const { title, createdAt, featuredImage, tags } = post;

  const dateObj = new Date(createdAt);

  const date = dateObj.toLocaleString("es-MX", {
    month: "2-digit",
    year: "numeric",
  });

  console.log(featuredImage);

  return (
    <div className="p-5 border-[#807b76] border flex flex-col justify-between">
      {!post ? (
        <PostLoader />
      ) : (
        <article className="m-1 article">
          <div className="card">
            <img
              src={featuredImage == undefined ? StockImage : featuredImage}
              alt="Stock"
              className=""
            />
            <div className="flex flex-col justify-between text-balance">
              <time
                dateTime={createdAt.toString()}
                className="text-[#807b76] text-vs"
              >
                {date}
              </time>
              <h5 className="text-white-paper mb-3 text-xs">{title}</h5>
            </div>
          </div>
        </article>
      )}
      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <span className="p-1 text-white-paper text-vs" key={index}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
