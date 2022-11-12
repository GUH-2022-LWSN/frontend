import { useEffect, useState, useRef } from "react";
import styles from "./Checkmark.module.scss";

import CheckmarkSVG from "./CheckmarkSVG";

interface CheckmarkProps {
    setSelected(selected: 0 | 1 | 2): void;

    t1ClientRect: null | DOMRect;
    t2ClientRect: null | DOMRect;
}

const intersectionAmount = (r1: DOMRect, r2: DOMRect): number => {
    const dx = Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left);
    const dy = Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top);
    if (dx >= 0 && dy >= 0) return dx * dy;
    return 0;
};

function Checkmark(props: CheckmarkProps) {
    const { setSelected, t1ClientRect, t2ClientRect } = props;

    const checkmarkRef = useRef<SVGSVGElement | null>(null);

    const [pos, setPos] = useState({ left: 0.5, top: 0.5 });
    const offsetRef = useRef({ left: 0, top: 0 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            const left = e.clientX - offsetRef.current.left;
            const top = e.clientY - offsetRef.current.top;

            if (checkmarkRef.current && t1ClientRect && t2ClientRect) {
                const realCheckmarkBox =
                    checkmarkRef.current.getBoundingClientRect();
                const checkmarkBox = new DOMRect(
                    left - realCheckmarkBox.width / 2,
                    top - realCheckmarkBox.height / 2,
                    realCheckmarkBox.width,
                    realCheckmarkBox.height
                );

                const t1I = intersectionAmount(t1ClientRect, checkmarkBox);
                const t2I = intersectionAmount(t2ClientRect, checkmarkBox);

                if (t1I === 0 && t2I === 0) setSelected(0);
                else if (t1I > t2I) setSelected(1);
                else setSelected(2);
            }

            setPos({
                left: left / window.innerWidth,
                top: top / window.innerHeight,
            });
        };

        const onMouseDown = (e: MouseEvent) => {
            if (
                checkmarkRef.current &&
                e.target &&
                checkmarkRef.current.contains(e.target as Node)
            ) {
                document.addEventListener("mousemove", onMouseMove);
                const realCheckmarkBox =
                    checkmarkRef.current.getBoundingClientRect();

                offsetRef.current.left = e.offsetX - realCheckmarkBox.width / 2;
                offsetRef.current.top = e.offsetY - realCheckmarkBox.height / 2;
            }
        };

        const onMouseUp = (e: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMove);
        };

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, [setSelected, t1ClientRect, t2ClientRect]);

    return (
        <CheckmarkSVG
            className={styles.checkmark}
            style={{
                left: `${pos.left * 100}%`,
                top: `${pos.top * 100}%`,
            }}
            ref={checkmarkRef}
        />
    );
}

export default Checkmark;
