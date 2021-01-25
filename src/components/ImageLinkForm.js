const ImageLinkForm = ({
  onInputChange,
  onModerationSubmit,
  onDetectFaceSubmit,
}) => {
  return (
    <div>
      <p className='App-intro f5 ph4'>
        {
          'This model returns probability scores on the likelihood that an image contains concepts such as gore, drugs, explicit nudity, or suggestive nudity. It also returns the probability that the image is “safe,” meaning it does not contain the aforementioned four moderation categories.'
        }
      </p>
      <div className='center'>
        <div className='pattern pa3 br3 shadow-5'>
          <button
            className='grow f5 link pv2 ph3 pv2 w-30  dib white bg-light-blue cursor'
            type='button'
            onClick={onDetectFaceSubmit}
          >
            Detect
          </button>
          <input
            className='f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
            placeholder={'Paste image url...'}
          />
          <button
            className='grow f5 link pv2 ph3 pv2 w-30 dib white bg-light-purple cursor'
            type='button'
            onClick={onModerationSubmit}
          >
            Evaluate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
