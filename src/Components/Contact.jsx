import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import "./Contact.css";
import ScatterText from "./MotionEffects/ScatterText";
import { MdEmail } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export default function Contact() {
  return (
    <div className="contact-container">
      <ScatterText />
      <div className="icon-list">
        <a
          href="https://www.linkedin.com/in/iván-azagra-troya-2a7599215"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          aria-label="Linkedin de Iván Azagra Troya"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/IvanAzagraTroya"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          aria-label="Github de Iván Azagra Troya"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/BlobVod"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          aria-label="Cuenta de twitter de desarrollo de videojuegos"
        >
          <FaTwitter />
        </a>
        <TooltipProvider>
        <Tooltip key={"email"}>
          <TooltipTrigger asChild>
            <a
            href="mailto:ivanazagratroya@hotmail.com"
            target="-blank"
            className="icon-link"
            aria-label="Enviar un correo a Iván Azagra Troya"
            >
                <MdEmail />
              </a>
              </TooltipTrigger>
              <TooltipContent
                  side='bottom'
                  style={{ fontSize: "0.75rem" }}
                  // className='text-xs'
              >
                  ivanazagratroya@hotmail.com
              </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </div>
  );
}

