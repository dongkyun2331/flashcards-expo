import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 로컬 저장소에 저장된 데이터를 불러오기
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  // 문제와 정답을 저장할 상태
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState(storedNotes);
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 노트의 인덱스

  // useEffect를 사용하여 notes가 변경될 때마다 로컬 저장소에 저장
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // 문제와 정답을 입력하는 폼을 제출할 때 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // 수정 중인 노트의 경우
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = { question, answer };
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      // 새로운 오답 노트를 추가하는 경우
      setNotes([...notes, { question, answer }]);
    }
    // 입력 필드 초기화
    setQuestion("");
    setAnswer("");
  };

  // 오답 노트 삭제 함수
  const deleteNote = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const newNotes = [...notes];
      newNotes.splice(index, 1);
      setNotes(newNotes);
    }
  };

  // 오답 노트 수정 함수
  const editNote = (index) => {
    const noteToEdit = notes[index];
    setQuestion(noteToEdit.question);
    setAnswer(noteToEdit.answer);
    setEditingIndex(index);
  };

  return (
    <div className="App">
      <h1>오답 노트</h1>
      <form onSubmit={handleSubmit}>
        <label>
          문제:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <label>
          정답:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
        <button type="submit">{editingIndex !== null ? "수정" : "저장"}</button>
      </form>
      <h2>오답 목록</h2>
      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            <p>
              <strong>문제:</strong> {note.question}
            </p>
            <p>
              <strong>정답:</strong> {note.answer}
            </p>
            <button onClick={() => deleteNote(index)}>삭제</button>
            <button onClick={() => editNote(index)}>수정</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
