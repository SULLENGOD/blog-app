import './PostLoader.css';

const PostLoader = () => {
  return (
    <div className='d-flex flex-column gap-2 p-3 mt-5'>
        <div className="loader w-50 mb-4 ms-2"></div>
        <div className="loader w-auto"></div>
        <div className="loader w-75"></div>
        <div className="loader w-75"></div>
        <div className="loader w-auto"></div>
        <div className="loader"></div>
        <div className="loader mt-4 w-25 ms-2"></div>
    </div>
  )
}

export default PostLoader