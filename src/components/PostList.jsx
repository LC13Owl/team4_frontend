import './PostList.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [emotionFilter, setEmotionFilter] = useState('');

  const emotions = ['😀', '😑', '😭', '😡'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://localhost:포트번호/diaries/read', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text(); // 오류 메시지 확인용
          console.error('응답 본문:', text);
          throw new Error('서버 응답이 JSON 형식이 아닙니다.');
        }

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    emotionFilter === ''
      ? posts
      : posts.filter((post) => post.emotion === emotionFilter);

  return (
    <div className="post-list">
      <div>
        <Link to="/write">
          <button className="post-button">일기 쓰기</button>
        </Link>
      </div>

      <div className="allFilter">
        <button
          className={
            emotionFilter === '' ? 'emotion-filter selected' : 'emotion-filter'
          }
          onClick={() => setEmotionFilter('')}
        >
          전체
        </button>
        {emotions.map((emo) => (
          <button
            key={emo}
            className={
              emotionFilter === emo
                ? 'emotion-filter selected'
                : 'emotion-filter'
            }
            onClick={() => setEmotionFilter(emo)}
          >
            {emo}
          </button>
        ))}
      </div>

      <table className="post-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성 날짜</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length === 0 ? (
            <tr>
              <td colSpan="3">작성된 게시물이 없습니다.</td>
            </tr>
          ) : (
            [...filteredPosts]
              .sort((a, b) => b.id - a.id)
              .map((post, index) => (
                <tr key={post.id}>
                  <td>{filteredPosts.length - index}</td>
                  <td>
                    <Link to={`/posts/${post.id}`} className="post-title">
                      {post.title}
                    </Link>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
