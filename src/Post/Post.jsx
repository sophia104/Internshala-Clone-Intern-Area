import React, { useState } from 'react';

function Post  ({ onNewPost, maxPosts }) {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState('');
  const [content, setContent] = useState('');
  const [postCount, setPostCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postCount < maxPosts) {
      onNewPost({ title, media, content });
      setPostCount(postCount + 1);
      setTitle('');
      setMedia('');
      setContent('');
    } else {
      alert('You have reached your posting limit for today.');
    }
  };

  return (
    <>
    <div>
      <p>This is Post</p>
    </div>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Media URL" 
        value={media} 
        onChange={(e) => setMedia(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required 
      />
      <button type="submit">Post</button>
    </form>
    </>
  );
};

export default Post;
