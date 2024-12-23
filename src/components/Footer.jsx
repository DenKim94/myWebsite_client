import './../styles/Footer.css'
import * as globalConstants from './../globalConstants.js';

function Footer() {
  console.log(globalConstants.SOCIAL_MEDIA_LOGO_PATHS)

  globalConstants.SOCIAL_MEDIA_LOGO_PATHS.map((logoPath, index) => (
    console.log(logoPath, index)
  ))

    return (
      <footer>
        <a id='impressum' href="src/assets/impressum.html" target="_blank">Impressum</a>
        <div className='social-media-icons'>
          { globalConstants.SOCIAL_MEDIA_ITEMS.map((item, index) => (
          <a href={item.url} target="_blank" rel="noopener noreferrer" key={index}>
            <img
              src={item.logoPath}
              className="social-icon"
              alt={`Social media logo ${index + 1}`}
            />
          </a>
          ))}
        </div>
      </footer>
    );
  }
  
  export default Footer;