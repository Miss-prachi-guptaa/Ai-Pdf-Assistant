import './Footer.css'

export const Footer = () => {
  return (
    <>
      <footer className="footer">

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} AI PDF Assistant. All rights reserved.
        </div>
      </footer>

    </>
  )
}