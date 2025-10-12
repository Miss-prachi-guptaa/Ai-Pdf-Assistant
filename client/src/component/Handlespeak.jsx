import React, { useState, useRef, useEffect } from "react";
import './Handlespeak.css';

export const HandleSpeak = () => {
  const [pdf, setPdf] = useState(null);
  const [text, setText] = useState(""); // PDF text or typed
  const [chat, setChat] = useState([]); // { type: 'user' | 'assistant', text: string }
  const [pdfText, setPdfText] = useState(""); // stores full PDF content
  const [speakingBubble, setSpeakingBubble] = useState(null);
  const audioRef = useRef(null);

  const wsRef = useRef(null);
  const chatContainerRef = useRef(null);

  // WebSocket setup and teardown

  const [wsOpen, setWsOpen] = useState(false);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket server");
      setWsOpen(true);
    };

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket server");
      setWsOpen(true);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.warn("🔴 WebSocket closed");
      setWsOpen(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Message from server:", data);

      if (data.type === "summary") {
        setChat((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text += data.chunk;
          return updated;
        });
      } else if (data.type === "done") {
        console.log("✅ Summary complete");
      } else if (data.type === "error") {
        console.error("❌ Error:", data.message);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  // Scroll chat to bottom when updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  // Upload PDF and parse text
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return alert("Upload a PDF!");
    setPdf(file);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://localhost:5000/pdf/upload", { method: "POST", body: formData });
      const data = await res.json();
      setText(data.text);    // show in textarea initially
      setPdfText(data.text); // save full PDF content
      setChat([]);
    } catch (err) {
      console.error(err);
    }
  };

  // Summarize: send text over WebSocket
  const handleSummarize = () => {
    if (!text.trim()) return;
    const userText = text;
    setChat((prev) => [
      ...prev,
      { type: "user", text: userText },
      { type: "assistant", text: "" }, // prep an empty assistant bubble
    ]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text: userText }));
    } else {
      console.warn("WebSocket not ready yet!");
    }
    setText("");
  };

  // Ask question, standard POST (not streaming)
  const handleAsk = async () => {
    if (!text.trim()) return alert("Enter a question!");
    setChat((prev) => [...prev, { type: "user", text }]);
    try {
      const res = await fetch("http://localhost:5000/pdf/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: pdfText, question: text }),
      });
      const data = await res.json();
      setChat((prev) => [...prev, { type: "assistant", text: data.answer }]);
      setText(""); // clear textarea
    } catch (err) {
      console.error(err);
    }
  };

  // Remove PDF
  const handleRemovePdf = () => {
    setPdf(null);
    setText("");
    setChat([]);
  };

  // Speak text feature for bubbles
  const handleSpeak = async (bubbleText, idx) => {
    if (!bubbleText) return;
    setSpeakingBubble(idx); // mark bubble as speaking
    try {
      const res = await fetch("http://localhost:5000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: bubbleText }),
      });
      const data = await res.json();
      const audio = new Audio(data.audioUrl);
      audio.play();
      audio.onended = () => setSpeakingBubble(null);
    } catch (err) {
      console.error(err);
      setSpeakingBubble(null);
    }
  };

  return (
    <div className="handle-speak-wrapper">

      <div className="app-container">
        <h1 className="app-title">🧠 AI PDF Assistant</h1>

        {/* Chat Area */}
        <div className="chat-container" ref={chatContainerRef}>
          {chat.map((c, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${c.type === "user" ? "user" : "assistant"}`}
            >
              <p>{c.text}</p>
              <div className="bubble-actions">
                <button onClick={() => handleSpeak(c.text, idx)}>
                  {speakingBubble === idx ? (
                    <span className="speaking-text">Speaking...</span>
                  ) : (
                    "🔊"
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="input-wrapper">
          {pdf && (
            <div className="pdf-chip">
              <span>📄 {pdf.name}</span>
              <button onClick={handleRemovePdf}>✖</button>
            </div>
          )}

          <textarea
            placeholder="Type text to summarize or ask a question..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
          />

          <div className="input-actions">
            <label htmlFor="pdf-upload" className="upload-btn">📎 Upload PDF</label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              style={{ display: "none" }}
            />

            {text && <button onClick={handleSummarize} className="summarize-btn">Summarize</button>}
            {text && <button onClick={() => handleSpeak(text, -1)} className="speak-btn">Speak</button>}
            {chat.some(c => c.type === "assistant") && text && <button onClick={handleAsk} className="ask-btn">Ask</button>}
          </div>
        </div>
        <audio ref={audioRef} hidden />
      </div>
    </div>
  );
}
