import './PostList.css';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
  return (
    <div id="post-list-wrapper">
      <div>
        <Link to="/write">
          <button id="post-button">일기 쓰기</button>
        </Link>
      </div>

      <table id="post-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성 날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan="3">작성된 게시물이 없습니다.</td>
            </tr>
          ) : (
            [...posts]
              .sort((a, b) => b.id - a.id)
              .map((post, index) => (
                <tr key={post.id}>
                  <td>{posts.length - index}</td>
                  <td>
                    <Link to={`/post/${post.id}`} id="post-title">
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.date}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
