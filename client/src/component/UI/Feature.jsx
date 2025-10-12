import { NavLink } from 'react-router-dom'
import './Feature.css'

export const Feature = () => {
  return (
    <>
      <section className="features-section">
        <h2 className="features-title">Features</h2>
        <div className="features-cards">

          {/* Card 1 */}
          <div className="feature-card">
            <h3 className="feature-card-heading">PDF Summarization</h3>
            <p className="feature-card-subheading">Instantly get concise summaries:</p>
            <ul className="feature-card-list">
              <li>Save time by reading less</li>
              <li>Understand key points instantly</li>
              <li>Easy export and share</li>
            </ul>
            <NavLink to="/chat" className="feature-try-btn">
              Try Now
            </NavLink>

          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <h3 className="feature-card-heading">Ask Questions</h3>
            <p className="feature-card-subheading">Interact with your PDF content:</p>
            <ul className="feature-card-list">
              <li>Get instant answers</li>
              <li>Clarify concepts quickly</li>
              <li>Supports multiple languages</li>
            </ul>
            <NavLink to="/chat" className="feature-try-btn">
              Try Now
            </NavLink>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <h3 className="feature-card-heading">Text-to-Speech</h3>
            <p className="feature-card-subheading">Listen to your PDFs anywhere:</p>
            <ul className="feature-card-list">
              <li>Hands-free reading</li>
              <li>Supports multiple voices</li>
              <li>Perfect for multitasking</li>
            </ul>
            <NavLink to="/chat" className="feature-try-btn">
              Try Now
            </NavLink>
          </div>

        </div>
      </section>


    </>
  )
}