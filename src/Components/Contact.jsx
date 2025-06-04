import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import "./Contact.css";
import ScatterText from "../MotionEffects/ScatterText";

export default function Contact() {
  return (
    <div className="contact-container">
      <ScatterText />
      <div className="icon-list">
        <a
          href="www.linkedin.com/in/iván-azagra-troya-2a7599215"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/IvanAzagraTroya"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/BlobVod"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaTwitter />
        </a>
      </div>
    </div>
  );
}

