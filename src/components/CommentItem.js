import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../redux/slices/commentSlice';
import { deleteCommentLike, likeComment } from '../redux/slices/likeSlice';

const CommentItem = ({comment}) => {
  const dispatch = useDispatch();

  const handleLikeClick = () => {
    dispatch(likeComment({postId: comment.post_id, commentId: comment.id}))
      .unwrap()
      .then();
  }

  const handleDislikeClick = () => {
    dispatch(deleteCommentLike({postId: comment.post_id, commentId: comment.id, likeId: comment.like.id}))
      .unwrap()
      .then();
  }
  const handleDeleteClick = () => {
    dispatch(deleteComment({postId: comment.post_id, commentId: comment.id}))
    .unwrap()
    .then();
  }
  return(
    <div>
      commentItem
      <p>{comment.id}</p>
      <p>{comment.comment}</p>

      {comment.like
      ?<button onClick={handleDislikeClick}>Dislike</button>
      :<button onClick={handleLikeClick}>Like</button>
      }
      <button onClick={handleDeleteClick}>Delete Comment</button>
    </div>
  )
}

export default CommentItem;
