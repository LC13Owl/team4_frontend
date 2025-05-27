import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          '192.168.219.156:8080/diaries/read/${id}',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error('HTTP error! status: ${res.status}');
        }

        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('상세조회 실패:', error);
      }
    };

    fetchPost();
  }, [id]);

  const Delete = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        'https://localhost:포트번호/diaries/delete/${id}',
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        alert('삭제되었습니다.');
        navigate('/');
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('오류가 발생했습니다.');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="post-detail">
      <h2 className="post-detail-title">{post.title}</h2>
      <p className="post-detail-date">{post.createdAt?.slice(0, 10)}</p>
      <p className="post-detail-emotion">{post.emotion}</p>
      <p className="post-detail-content">{post.content}</p>
      <button className="detail-button" onClick={() => navigate(-1)}>
        목록 보기
      </button>
      <button className="detail-button" onClick={() => navigate(`/edit/${id}`)}>
        수정
      </button>
      <button className="detail-button" onClick={Delete}>
        삭제
      </button>
    </div>
  );
}

export default PostDetail;
