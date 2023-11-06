const Card = ({ param1, param2, param3 , image , btntextparam}) => {
  return (
    <div className="card-container-container">
    <div className="card_aqsa mt-4">
      <img src={image} alt="..." />
      <div className="card-body_aqsa">
        <div className="text-section_aqsa">
          <h5 className="card-title_aqsa">{param1}</h5>
          <p className="card-text_aqsa">{param2}</p>
          <p className="card-text_aqsa">{param3}</p>
          
        </div>
        <div className="cta-section_aqsa">
          
          <div className="showmore_aq">
            <button >Read More</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;
