import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './PostDetail';

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    emotion: '',
  });
  const emotions = ['😀', '😑', '😭', '😡'];

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://192.168.219.156:8080/diaries/read/${id}`);
      const data = await res.json();
      setFormData({
        title: data.title,
        content: data.content,
        emotion: data.emotion,
      });
    };
    fetchPost();
  }, [id]);

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://192.168.219.156:8080/diaries/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('수정되었습니다.');
        navigate(`/detail/${id}`);
      } else {
        alert('수정 실패');
      }
    } catch (error) {
      console.error('수정 오류:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <form id="post-form" onSubmit={submit}>
      <input
        id="title"
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={change}
      />
      <br />

      <textarea
        id="content"
        name="content"
        placeholder="오늘 하루는 어땠나요?"
        value={formData.content}
        onChange={change}
      />
      <br />

      <div className="emotion">
        {emotions.map((emo) => (
          <button
            key={emo}
            type="button"
            className={
              formData.emotion === emo
                ? 'selectEmotion selected'
                : 'selectEmotion'
            }
            onClick={() =>
              setFormData({
                ...formData,
                emotion: emo,
              })
            }
          >
            {emo}
          </button>
        ))}
      </div>

      <div id="two-button">
        <button type="submit" className="form-button">
          저장
        </button>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default PostEdit;
