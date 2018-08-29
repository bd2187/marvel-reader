import React from "react";
import Thumbnail from "./Thumbnail";
import styles from "./Grid.module.css";

const Grid = props => {
  const { content, loading, title } = props;

  if (loading) return <h1>loading</h1>;

  if (content.length === 0) return <h1>No {title} found</h1>;

  return (
    <div className={styles.wrap}>
      <ul className={styles["thumbnail-ul"]}>
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
    </div>
  );
};

export default Grid;
