const ImageModeration = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='container mt2'>
        <img
          id='image'
          src={imageUrl || `https://via.placeholder.com/400`}
          width='400px'
          height='auto'
          alt='Added by user'
        />

        {box && (
          <div
            className='bounding-box'
            style={{ top: box.y, right: box.w, bottom: box.h, left: box.x }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ImageModeration;
