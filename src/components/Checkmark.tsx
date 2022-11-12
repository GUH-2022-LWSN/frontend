import { useEffect, useRef, useState } from "react";
import styles from "./Checkmark.module.scss";

function Checkmark() {
    const imageRef = useRef<any>(null);
    
    const [imagePos, setImagePos] = useState<{ left: number; top: number }>({
        left: 0,
        top: 0,
    });
    
    useEffect(() => {
        let offsetX = 0;
        let offsetY = 0;

        const onMouseMove = (e: MouseEvent) => {
            setImagePos({
                left: (e.clientX + window.scrollX) - offsetX,
                top: (e.clientY + window.scrollY) - offsetY,
            });
        };
        
        const onMouseDown = (e: MouseEvent) => {
            if (imageRef.current && imageRef.current.contains(e.target)) {
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

    // useEffect(() => {
    //     const onMouseMove = (e: MouseEvent) => {
    //         setImagePos({
    //             left: e.clientX,
    //             top: e.clientY,
    //         });
    //     };

    //     if (tracking) {
    //         document.addEventListener("mousemove", onMouseMove);
    //     }

    //     return () => {
    //         document.removeEventListener("mousemove", onMouseMove);
    //     };
    // }, [tracking]);

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
            ref={imageRef}
        />
    );
}

export default Checkmark;
