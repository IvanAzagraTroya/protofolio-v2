import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import "./Contact.css";
import ScatterText from "../MotionEffects/ScatterText";
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
        <TooltipProvider>
        <Tooltip key={"email"}>
          <TooltipTrigger asChild>
            <a
            href="mailto:ivanazagratroya@hotmail.com"
            target="-blank"
            className="icon-link"
            >
                <MdEmail />
              </a>
              </TooltipTrigger>
              <TooltipContent
                  side='bottom'
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

