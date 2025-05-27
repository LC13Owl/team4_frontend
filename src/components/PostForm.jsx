import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('');

  const navigate = useNavigate();
  const emotions = ['😀', '😑', '😭', '😡'];

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newPost = {
      title,
      content,
      emotion,
    };

    try {
      const response = await fetch(
        `http://192.168.0.7:8080/diaries/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) throw new Error('서버 응답 오류');
      const result = await response.text();
      onSubmit(result);
      console.log('응답:', result);
      alert(result);

      setTitle('');
      setContent('');
      setEmotion('');

      navigate('/');
    } catch (error) {
      console.error('에러 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <form id="post-form" onSubmit={submit}>
      <input
        id="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <textarea
        id="content"
        placeholder="오늘 하루는 어땠나요?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />

      <div className="emotion">
        {emotions.map((emo) => (
          <button
            className={
              emotion === emo ? 'selectEmotion selected' : 'selectEmotion'
            }
            type="button"
            key={emo}
            onClick={() => setEmotion(emo)}
          >
            {emo}
          </button>
        ))}
      </div>

      <div className="two-button">
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(-1)}
        >
          목록 보기
        </button>
        <button type="submit" className="form-button">
          게시하기
        </button>
      </div>
    </form>
  );
}

export default PostForm;
