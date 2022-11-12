import { useEffect, useState } from "react";
import styles from "./Checkmark.module.scss";

interface CheckmarkProps {
    checkmarkRef: React.MutableRefObject<any>;
    imagePos: { left: number; top: number; };
    setImagePos(imagePos: {left: number; top: number;}): void;
}

function Checkmark(props: CheckmarkProps) {
    const { checkmarkRef, imagePos, setImagePos } = props;
    
    useEffect(() => {
        let offsetX = 0;
        let offsetY = 0;

        const onMouseMove = (e: MouseEvent) => {
            setImagePos({
                left: e.clientX - offsetX,
                top: e.clientY - offsetY,
            });
        };
        
        const onMouseDown = (e: MouseEvent) => {
            if (checkmarkRef.current && checkmarkRef.current.contains(e.target)) {
                document.addEventListener("mousemove", onMouseMove);
                offsetX = e.offsetX;
                offsetY = e.offsetY;
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
    }, []);

    return (
        <img
            alt="Twitter verified checkmark"
            className={styles.checkmark}
            src="/checkmark.png"
            style={{
                left: imagePos.left,
                top: imagePos.top,
            }}
            draggable={false}
            ref={checkmarkRef}
        />
    );
}

export default Checkmark;
