
import { NavLink } from 'react-router-dom'
import './About.css'
export const About = () => {
  return (
    <>
      <section className="about-section" id="about">
        <div className="about-container">

          <div className="about-left">
            <img src="/icons/about.png" alt="AI Assistant working" />
          </div>

          <div className="about-right">
            <h2 className="about-title">About Our AI PDF Assistant</h2>
            <p className="about-subtitle">
              Our tool helps you <span>understand PDFs smarter</span> — no more endless scrolling or confusion.
              Upload, summarize, ask questions, and get instant insights powered by AI.
            </p>
            <ul className="about-points">
              <li>⚡ Instant Summaries</li>
              <li>💬 Ask Questions from PDF</li>
              <li>🔊 Listen to Content (TTS)</li>
            </ul>

            <NavLink to="/chat" className="about-btn">Try Now</NavLink>
          </div>

        </div>
      </section>

    </>
  )
}