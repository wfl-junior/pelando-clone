import React from "react";

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      viewBox="0 0 120 32"
      role="img"
      aria-label="Logo do Pelando"
      {...props}
    >
      <defs>
        <linearGradient
          x1="34.734%"
          y1="13.959%"
          x2="91.954%"
          y2="127.968%"
          id="pelando_svg__a"
        >
          <stop stopColor="#FFA02F" offset="0%"></stop>
          <stop stopColor="#E00034" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="69.347%"
          y1="93.279%"
          x2="20.389%"
          y2="-44.264%"
          id="pelando_svg__b"
        >
          <stop stopColor="#FFA02F" offset="0%"></stop>
          <stop stopColor="#E00034" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            d="M12.213 2.23c0-.417.086-.812.214-1.187-1.852 1.098-5.7 3.888-5.7 8.137 0 6.978 5.414 7.435 5.414 11.496 0 1.715-1.245 2.653-2.888 2.653-2.705 0-5.965-4.107-3.97-9.374.001 0-4.692 2.146-4.692 6.808 0 5.91 5.13 10.17 11.46 10.17 6.33 0 11.462-4.79 11.462-10.7 0-9.033-8.525-12.742-10.575-15.824a3.667 3.667 0 01-.725-2.179z"
            fill="url(#pelando_svg__a)"
          ></path>
          <path
            d="M1.162 24.1c2.088 4.634 8.43 6.023 11.532 3.022 2.546-2.463.964-6.11-1.482-9.103.556.758.936 1.581.936 2.656 0 1.72-1.248 2.662-2.894 2.662-2.71 0-5.977-4.12-3.979-9.406 0 0-3.668 1.683-4.523 5.302-.042.567-.098 1.274-.165 2.059.052.991.252 1.93.575 2.808z"
            fill="url(#pelando_svg__b)"
          ></path>
        </g>
        <text
          fontFamily="inherit"
          fontSize="24"
          fontWeight="700"
          fill="currentColor"
        >
          <tspan x="28" y="24">
            Pelando
          </tspan>
        </text>
      </g>
    </svg>
  );
};
