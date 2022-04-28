import React from 'react';
import EditPostForm from './EditPostForm';
import { useDispatch } from 'react-redux';
import { deletePost } from '../redux/slices/post';
import PostDetail from './PostDetail';

const PostItem = ({post}) => {
  const {caption, created_date, id, like_count, updated_date, user, user_id, visual_media_urls} = post;
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    console.log('ini delete buttonnya');
    console.log(id);
    dispatch(deletePost(id))
      .unwrap()
      .then(); 
  };
  return (
    <div>
      Post
      <p>{caption}</p>
      <EditPostForm postId={id}/>
      <button onClick={handleClickDelete}>Delete</button>
      <PostDetail post={post}/>
    </div>
  )
};

export default PostItem;
