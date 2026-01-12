import { useState } from "react";
import { api } from "./config/api";
import { toast } from "react-hot-toast";

const App = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEmail = async () => {
    if (!email) return toast.error("Please enter an email to rewrite");
    try {
      setLoading(true);
      const res = await api.post("/rewrite", { emailText: email });
      setResult(res.data.rewrittenEmail);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>AI Email Rewriter</h1>

      <textarea
        rows={6}
        placeholder="Paste your email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      ></textarea>

      <button
        onClick={fetchEmail}
        disabled={loading}
        style={{ padding: "0.5rem 1rem" }}
      >
        {loading ? "Rewriting..." : "Rewrite Email"}
      </button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Rewritten Email:</h3>
          <textarea
            rows={6}
            value={result}
            readOnly
            style={{ width: "100%", padding: "0.5rem" }}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default App;
