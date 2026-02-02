import { useEffect, useRef } from "react";
import type { FocusField } from "./auth.types";

interface Props {
  focus: FocusField;
}

export default function MichiAvatar({ focus }: Props) {
  const michiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const michi = michiRef.current;
    if (!michi) return;

    const pupils = michi.querySelectorAll(".pupil");
    const earLeft = michi.querySelector(".ear.left") as HTMLElement | null;
    const earRight = michi.querySelector(".ear.right") as HTMLElement | null;

    function moveEyes(x: number, y: number) {
      if (!michi || michi.classList.contains("hiding")) return;

      pupils.forEach(pupil => {
        const eye = pupil.parentElement as HTMLElement | null;
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const angle = Math.atan2(y - cy, x - cx);
        const distance = 5;

        (pupil as HTMLElement).style.transform = `
          translate(${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px)
        `;
      });

      if (!earLeft || !earRight) return;

      const rect = michi.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const offset = (x - center) / rect.width;
      const tilt = offset * 8;

      earLeft.style.transform = `rotate(${ -15 + tilt }deg)`;
      earRight.style.transform = `rotate(${ 15 + tilt }deg)`;
    }

    const onMouseMove = (e: MouseEvent) => {
      moveEyes(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const michi = michiRef.current;
    if (!michi) return;

    const pupils = michi.querySelectorAll(".pupil");

    if (focus === "password") {
      michi.classList.add("hiding");
    } else {
      michi.classList.remove("hiding");
      pupils.forEach(pupil => {
        (pupil as HTMLElement).style.transform = "translate(0, 0)";
      });
    }
  }, [focus]);

  return (
    <div className="cat-container">
      <div className="cat" ref={michiRef}>
        <div className="ear left" />
        <div className="ear right" />
        <div className="face">
          <div className="eye-row">
            <div className="eye left"><div className="pupil" /></div>
            <div className="eye right"><div className="pupil" /></div>
          </div>
          <div className="nose" />
        </div>
        <div className="paw-left" />
        <div className="paw-right" />
      </div>
    </div>
  );
}
