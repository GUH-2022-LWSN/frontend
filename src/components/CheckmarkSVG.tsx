import { forwardRef } from "react";

const CheckmarkSVG = forwardRef<
    SVGSVGElement,
    React.HTMLAttributes<SVGSVGElement>
>((props, ref) => (
    <svg
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
    >
        <path
            d="m 22.25,12 c 0,-1.43 -0.88,-2.67 -2.19,-3.34 0.46,-1.39 0.2,-2.9 -0.81,-3.91 C 18.24,3.74 16.73,3.48 15.34,3.94 14.68,2.63 13.43,1.75 12,1.75 10.57,1.75 9.33,2.63 8.67,3.94 7.27,3.48 5.76,3.74 4.75,4.75 3.74,5.76 3.49,7.27 3.95,8.66 2.64,9.33 1.75,10.57 1.75,12 c 0,1.43 0.89,2.67 2.2,3.34 -0.46,1.39 -0.21,2.9 0.8,3.91 1.01,1.01 2.52,1.26 3.91,0.81 0.67,1.31 1.91,2.19 3.34,2.19 1.43,0 2.68,-0.88 3.34,-2.19 1.39,0.45 2.9,0.2 3.91,-0.81 1.01,-1.01 1.27,-2.52 0.81,-3.91 1.31,-0.67 2.19,-1.91 2.19,-3.34 z m -11.71,4.2 -3.74,-3.74 1.41,-1.42 2.26,2.26 4.8,-5.23 1.47,1.36 z"
            fill="#1da1f2"
            stroke="#fff"
            paintOrder="markers stroke fill"
            strokeWidth={3.5}
        />
        <path
            fill="#fff"
            d="m 8.21,11.04 -1.41,1.42 3.74,3.74 6.2,-6.77 -1.47,-1.36 -4.8,5.23 z"
        />
    </svg>
));
export default CheckmarkSVG;
