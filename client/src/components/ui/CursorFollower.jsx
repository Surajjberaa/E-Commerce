
import { useRef, useEffect, use, useState } from "react";
import gsap from "gsap";
import "./styles/styles.css"; // Import the CSS file

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false); // Track touch device status

  useEffect(() => {
    // Ensure this only runs on the client
    setIsTouchDevice(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  console.log(isTouchDevice)

  useEffect(() => {
    if (isTouchDevice || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const onMouseMove = (e) => {
      const { target, x, y } = e;
      const isTargetLinkOrBtn = target?.closest("a") || target?.closest("button") || target?.closest("img") || target?.closest("label");

      gsap.to(cursor, {
        x: x + 1,
        y: y + 1,
        duration: 0.7,
        ease: "power4",
        opacity: isTargetLinkOrBtn ? 0.3 : 1,
        scale: isTargetLinkOrBtn ? 3.5 : 1,
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { duration: 0.7, opacity: 0 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <div ref={cursorRef} className="cursor "/>;
}
