import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/slices/user';
import { getUserPosts } from '../redux/slices/post';
import PostItem from '../components/PostItem';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    dispatch(getProfile({userId}))
    dispatch(getUserPosts())
      .unwrap()
      .then((response) => {
        setMyPosts(response.posts);
      })
  }, [dispatch, userId]);
  return (
    <div>
      Profile Page
      <Link to='/profile/edit'>Edit Profile</Link>
      {myPosts.map((myPost) => <PostItem post={myPost}/>)}
    </div>
  )
};

export default ProfilePage;
