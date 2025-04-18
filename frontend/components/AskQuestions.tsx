// components/AskQuestion.tsx
import { useState } from "react";

const AskQuestion = ({ documentId }: { documentId: number }) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/document/${documentId}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Erro ao enviar a pergunta:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Pergunte sobre o documento:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Perguntar"}
        </button>
      </form>

      {answer && (
        <div>
          <h2>Resposta:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskQuestion;
