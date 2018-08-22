import React from "react";
import Thumbnail from "./Thumbnail";

const Grid = props => {
  const { content, loading, title } = props;

  if (loading) return <h1>loading</h1>;

  if (content.length === 0) return <h1>No {title} found</h1>;

  return (
    <ul style={{ display: "flex" }}>
      {content.map(function(item) {
        return (
          <Thumbnail
            key={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
          />
        );
      })}
    </ul>
  );
};

export default Grid;
