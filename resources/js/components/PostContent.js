import React from 'react';

const PostContent = (props)=>(
    <p>
        {props.post.id}
        
        {props.post.body}
    </p>
)
export default PostContent;