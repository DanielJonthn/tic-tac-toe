import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = () => {
    const threshold = 5;
    const bottomOfPage =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - threshold;
    setIsAtBottom(bottomOfPage);
  };

  useEffect(() => {
    const handleResizeAndScroll = () => {
      checkScrollPosition();
    };

    window.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", handleResizeAndScroll);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", handleResizeAndScroll);
    };
  }, []);

  return (
    <footer className={isAtBottom ? "footer" : "footer-hide"}>
      <div className="flex-grow 1" />
      <div className="copyright-text">
        © 2025 Daniel Jonathan & Michael Angelo. All Rights Reserved.
      </div>
      <div>
        <a href="https://github.com/DanielJonthn/tic-tac-toe" target="_blank">
          <image className="icon-style">
            <FaGithub />
          </image>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
