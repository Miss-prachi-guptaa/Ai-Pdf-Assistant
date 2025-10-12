import './Hero.css'
export const Hero = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-container">

          {/* Left Column: Text Card */}
          <div className="hero-left-card">
            <h1 className="hero-title">AI PDF Assistant – Understand Your Documents Instantly</h1>
            <p className="hero-subtitle">
              Upload any PDF and let our AI summarize, answer questions, and help you understand content faster.
            </p>
            <a href="/chat" className="hero-btn-small">Try Now</a>
          </div>

          {/* Right Column: Video */}
          <div className="hero-right">
            <div className="video-frame">
              <video
                src="\vedios\summaryvedio.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}