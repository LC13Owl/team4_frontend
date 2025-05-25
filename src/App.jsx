import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PostForm from './components/PostForm.jsx';
import PostList from './components/PostList.jsx';
import PostDetail from './components/PostDetail.jsx';

function App() {
  const [posts, setPosts] = useState([
    {
      // 테스트 데이터
      id: 1,
      title: '첫 번째 일기',
      content: '맛있는 거 많이 먹어서 행복한 날이었다!',
      date: '2025-05-24',
    },
    {
      id: 2,
      title: '두 번째 일기',
      content: '드라마 보면서 너무 많이 울었다...',
      date: '2025-05-25',
    },
  ]);

  // useEffect(() => {
  //   fetch("/diaries/read")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("서버 응답 오류");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPosts(data);
  //     })
  //     .catch((err) => {
  //       console.error("불러오기 실패:", err);
  //     });
  // }, []);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Router>
      <div id="nav">
        <h1>DIARY</h1>
        <h4>TEAM4 게시판</h4>
      </div>

      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route path="/write" element={<PostForm onSubmit={addPost} />} />
        <Route path="/post/:id" element={<PostDetail posts={posts} />} />
      </Routes>
    </Router>
  );
}

export default App;
