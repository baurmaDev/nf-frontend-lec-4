import React from 'react';
import { useQuery } from 'react-query';
import { axiosInstance, axiosQueryInstance } from '../../../api/apiClient';
import { getAllPosts } from '../../../api/services/postsService';

const fetchPosts = async () => {
  const { data } = await axiosQueryInstance.get('products/');
  return data;
};

const Posts = () => {
  const { data, error, isLoading, isError } = useQuery('posts', getAllPosts, {
    retry: 3
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
