import "./PostLoader.css";

const PostLoader = () => {
  return (
    <div className="flex m-3 p-3">
      <div className="loader p-0 me-1 h-auto"></div>
      <div className="flex flex-col justify-center gap-2">
        <div className="loader w-full mb-4"></div>
        <div className="loader w-64"></div>
        <div className="loader"></div>
        <div className="loader mt-4 w-25"></div>
      </div>
    </div>
  );
};

export default PostLoader;
