import { useEffect, useState, useRef } from "react";
import styles from "./Checkmark.module.scss";

import CheckmarkSVG from "./CheckmarkSVG";
import DragMeSVG from "./DragMeSVG";

interface CheckmarkProps {
    setSelected(selected: 0 | 1 | 2): void;
    onDrop(selected: 1 | 2): void;

    spaceRef: React.MutableRefObject<null | HTMLDivElement>;
    t1ClientRect: null | DOMRect;
    t2ClientRect: null | DOMRect;
}

const intersectionAmount = (r1: DOMRect, r2: DOMRect): number => {
    const dx = Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left);
    const dy = Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top);
    if (dx >= 0 && dy >= 0) return dx * dy;
    return 0;
};

let everDragged = false;

function Checkmark(props: CheckmarkProps) {
    const [showShake, setShowShake] = useState(false);
    useEffect(() => {
        const to = setTimeout(() => {
            if (!everDragged) setShowShake(true);
        }, 3000);

        return () => {
            clearTimeout(to);
        }
    }, [])

    const { setSelected, t1ClientRect, t2ClientRect, onDrop } = props;

    const checkmarkRef = useRef<SVGSVGElement | null>(null);

    const [pos, setPos] = useState({ left: 0.5, top: 0.5 });
    const [dragging, setDragging] = useState<boolean>(false);
    const offsetRef = useRef({ left: 0, top: 0 });

    const selectedRef = useRef<0 | 1 | 2>(0);

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

                if (t1I === 0 && t2I === 0) {
                    selectedRef.current = 0;
                    setSelected(0);
                } else if (t1I > t2I) {
                    selectedRef.current = 1;
                    setSelected(1);
                } else {
                    selectedRef.current = 2;
                    setSelected(2);
                }
            }

            if (!everDragged) {
                everDragged = true;
                setShowShake(false);
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

                setDragging(true);
                offsetRef.current.left = e.offsetX - realCheckmarkBox.width / 2;
                offsetRef.current.top = e.offsetY - realCheckmarkBox.height / 2;
                onMouseMove(e);
            }
        };

        const onMouseUp = (e: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMove);
            setDragging(false);
            if (selectedRef.current !== 0) onDrop(selectedRef.current);
            selectedRef.current = 0;
            setSelected(0);
        };

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, [setSelected, t1ClientRect, t2ClientRect, onDrop]);

    if (!props.spaceRef.current) return null;

    let left: number = 0,
        top: number = 0;
    const spaceBox = props.spaceRef.current.getBoundingClientRect();
    const sbLeft = (spaceBox.left + spaceBox.width / 2) / window.innerWidth;
    const sbTop = (spaceBox.top + spaceBox.height / 2) / window.innerHeight;
    if (dragging) {
        left = pos.left;
        top = pos.top;
    } else {
        left = sbLeft;
        top = sbTop;
    }

    return (
        <>
            <CheckmarkSVG
                className={
                    styles.checkmark + (dragging ? "" : " " + styles.goingHome)
                }
                style={{
                    left: `${left * 100}%`,
                    top: `${top * 100}%`,
                }}
                ref={checkmarkRef}
            />
            <DragMeSVG
                className={styles.dragme}
                style={{
                    opacity: showShake ? 1 : 0,
                    left: `${sbLeft * 100}%`,
                    top: `${sbTop * 100}%`,
                }}
            />
        </>
    );
}

export default Checkmark;
