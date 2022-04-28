import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import CreatePostForm from '../components/CreatePostForm';
import { getPosts } from '../redux/slices/post';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);
  return(
    <Layout>
      <CreatePostForm/>
      <p>Ini adalah homepage</p>
    </Layout>
  );
};

export default HomePage;
