const Star = (props) => {
    const { value, color, limit } = props;
    const className = 
      value >= limit
        ? "fas fa-star"
        : value >= limit - 0.5
        ? "fas fa-star-half-alt"
        : "far fa-star";
    return <i style={{ color }} className={className}></i>;
  };
  
  const Rating = (props) => {
    return (
      <div className="rating">
        <span>
          {[1, 2, 3, 4, 5].map(limit => <Star key={limit} color={props.color} value={props.value} limit={limit} />)}
        </span>
        <span>{props.text && props.text}</span>
      </div>
    );
  };
  
  export default Rating;
  