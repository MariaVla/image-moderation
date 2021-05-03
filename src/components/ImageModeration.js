const ImageModeration = ({ imageUrl, boxes, moderationResult }) => {
  return (
    <div className='center ma'>
      <div className='container mt2 image'>
        <img
          id='image'
          src={imageUrl || `https://via.placeholder.com/250`}
          width='250px'
          height='auto'
          alt='Added by user'
        />

        {boxes &&
          boxes.map((box, i) => {
            return (
              <div
                key={i}
                className='bounding-box'
                style={{ top: box.y, right: box.w, bottom: box.h, left: box.x }}
              ></div>
            );
          })}
        {moderationResult && (
          <div className='moderation-result' style={{ top: 0, left: 300 }}>
            The image is... <span>{moderationResult.name}</span> with{' '}
            <span>{`${moderationResult.value * 100}%`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModeration;
