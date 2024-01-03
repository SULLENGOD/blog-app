import './PostLoader.css';

const PostLoader = () => {
  return (
    <div className='flex flex-col justify-center gap-2 p-3 mt-5'>
        <div className="loader w-96 mb-4"></div>
        <div className="loader w-60"></div>
        <div className="loader w-72"></div>
        <div className="loader w-75"></div>
        <div className="loader w-64"></div>
        <div className="loader"></div>
        <div className="loader mt-4 w-25 ms-2"></div>
    </div>
  )
}

export default PostLoader