import { Post } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";
import TextIcon from '../../assets/align-box-left-bottom-filled.svg';
import StockImage from '../../assets/stock-image.png';
import './styles/PostCard.css'

interface Porps {
  info: {
    post: Post;
    isLoading: boolean;
  };
}

const PostCard = ({ info }: Porps) => {
  const { post } = info;

  const { title, createdAt, content } = post;
  
  const dateObj = new Date(createdAt);

  const date = dateObj.toLocaleString('es-MX', {
    month: '2-digit',
    year: 'numeric'
  });

  const truncatedContent = content.length > 75 ? content.slice(0, 75) + '...' : content;

  return (
    <div className="rounded">
      {!post ? (
        <PostLoader />
      ) : (
        <article className="m-1a">
          <div className="card shadow">
          <img src={StockImage} alt="stock" className="card-image"/>
            <div className="card-body">
              <h5 className="card-title text-card">{title}</h5>
              <time dateTime={createdAt.toString()} className="text-muted text-date">{date}</time>
              <p className="text-card text-content">{truncatedContent}</p>
            </div>
            <div className="d-flex flex-row-reverse">
              <span className="p-1"><img src={TextIcon} alt="Text" /></span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostCard;
