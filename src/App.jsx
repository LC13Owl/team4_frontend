import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostForm from './components/PostForm.jsx';
import PostList from './components/PostList.jsx';
import PostDetail from './components/PostDetail.jsx';
import PostEdit from './components/PostEdit.jsx';

function App() {
  return (
    <>
      <div id="nav">
        <h1>오늘의 일기</h1>
        <h4>Team4 게시판</h4>
      </div>

      <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/write" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<PostEdit />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
