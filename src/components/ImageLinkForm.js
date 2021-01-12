const ImageLinkForm = ({ onInputChange }) => {
  return (
    <div>
      <p className='App-intro f3'>
        {
          'This model returns probability scores on the likelihood that an image contains concepts such as gore, drugs, explicit nudity, or suggestive nudity. It also returns the probability that the image is “safe,” meaning it does not contain the aforementioned four moderation categories.'
        }
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='pattern pa4 br3 shadow-5'>
          <input
            className=' f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
          />
          <button className='grow f4 link pv2 ph3 pv2 w-30  dib white bg-light-purple cursor'>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
