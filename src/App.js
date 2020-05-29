import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); /* 데이터 배열을 해당페이지의첫번째포스트번호(마지막포스트번호-페이지당포스트수)부터
                                                                                       해당페이지의마지막포스트번호(현재페이지*페이지당포스트수)까지 slice함*/

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber); // 현재 페이지를 저장하는 함수

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts}/> {/*전체 데이터에서 잘라진 포스트의 배열들을 posts props로 넘겨줌*/}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length} 
        paginate={paginate}
      /> {/*페이지당 보여지는 포스트 수*/ /*전체 데이터 배열의 길이*/}
    </div>
  );
};

export default App;
