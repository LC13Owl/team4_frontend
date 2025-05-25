import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id.toString() === id);

  return (
    <div id="post-detail">
      <h2 id="post-detail-title">{post.title}</h2>
      <p id="post-detail-date">{post.date}</p>
      <p id="post-detail-content">{post.content}</p>
      <button className="detail-button" onClick={() => navigate(-1)}>
        목록 보기
      </button>
      <button className="detail-button">수정</button>
      <button className="detail-button">삭제</button>
    </div>
  );
}

export default PostDetail;
