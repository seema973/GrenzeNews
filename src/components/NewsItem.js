import React from "react";

const NewsItem = (props) => {
    // Destructuring in JS - means this.props is an object and title and descriptions anre pulled from this.props and make available
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card" >
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
         }}>
          <span className=" badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
            {source}
          </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://images.news18.com/ibnlive/uploads/2022/07/fxp8szxusaizrtn-165806451216x9.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target="_blank" rel="noopener" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
 }

export default NewsItem;
