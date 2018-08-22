import React from "react";

const Thumbnail = props => {
  const { title, thumbnail } = props;
  return (
    <li>
      <h4>{title}</h4>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} />
    </li>
  );
};

export default Thumbnail;
