import React from 'react';
const PostLoader = (props) => (
  <span>
    {
      props.progress && (<div>
        loading...      </div>)
    }
    {props.completed && (<div>
      <h5>No More Post Found!</h5>
    </div>)
    }
  </span>
);

export default PostLoader;