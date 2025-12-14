import './_services.scss';

function DiscussBlock() {
  return (
    <div className="discuss-block">
      <div className="container">
        <div className="info">
          <h3>Вам нужен также такие сайты ?</h3>
          <a href="#" className="btn mt-0!">
            Давайте обсудим
            <img src="/images/link-arrow.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default DiscussBlock;
