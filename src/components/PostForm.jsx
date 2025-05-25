import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [emotion, setEmotion] = useState('');
  // const [tags, setTags] = useState('');
  // const [question, setQuestion] = useState('');
  // const [photoUrl, setPhotoUrl] = useState('');
  // const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newPost = {
      title,
      content,
      // nickname,
      // emotion,
      // tags,
      // question,
      // photoUrl,
      // isPublic,
    };

    try {
      const response = await fetch('http://localhost:/diaries/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error('서버 응답 오류');
      const result = await response.json();
      onSubmit(result);
      console.log('응답:', result);
      alert('일기 저장 완료');

      setTitle('');
      setContent('');
      // setNickname('');
      // setEmotion('');
      // setTags('');
      // setPhotoUrl('');
      // setQuestion('');
      // setIsPublic(true);

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

      {/* <input
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      /><br /> */}

      {/* <input
        placeholder="감정"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
      /><br /> */}

      {/* <input
        placeholder="태그"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      /><br /> */}

      {/* <input
        placeholder="사진 URL"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      /><br /> */}

      {/* <input
        placeholder="질문"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      /><br /> */}

      {/* <label>
        공개 여부: 
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        공개
      </label>
      <br /><br /> */}

      <div id="two-button">
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
