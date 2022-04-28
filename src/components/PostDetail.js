import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { deletePostLike, likePost } from '../redux/slices/likeSlice';
import { getPostComments } from '../redux/slices/commentSlice';
import CreateCommentForm from './CreateCommentForm';
import CommentItem from './CommentItem';
import EditCommentForm from './EditCommentForm';

const PostDetail = ({post}) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(getPostComments(post.id))
      .unwrap()
      .then((response) => {
        setComments(response.comments);
      });
  }, [dispatch, post.id]);

  const handleLikeClick = () => {
    dispatch(likePost(post.id))
      .unwrap()
      .then();
  }

  const handleDislikeClick = () => {
    dispatch(deletePostLike({postId: post.id, likeId: post.like.id}))
      .unwrap()
      .then();
  }
  return (
    <div>
      Post Detail
      <p>{post.id}</p>
      <p>{post.caption}</p>
      {
        post.like
        ?<button onClick={handleDislikeClick}>Dislike</button>
        :<button onClick={handleLikeClick}>Like</button>
      }
      {comments && comments.map((comment)=> 
        <>
          <CommentItem comment={comment}/>
          <EditCommentForm postId={comment.post_id} commentId={comment.id}/>
        </>
      )}
      <CreateCommentForm postId={post.id}/>
    </div>
  )
};

export default PostDetail;
