import React from "react";
 const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    location,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className="photo">
      <img className="main-photo" src={regular} alt={alt_description}></img>
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes}</p>
          <span>{location}</span>
        </div>
        <a href={portfolio_url} rel="noreferrer" target="_blank" alt={name}>
          {<img src={medium} alt={name}></img>}
        </a>
      </div>
    </article>
  );
};

export default Photo;
