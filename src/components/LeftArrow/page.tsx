import { motion } from 'motion/react'

export const LeftArrow = ({ inView }: { inView: boolean }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="350"
        height="350"
        viewBox="220 -70 26 296"
        className="transform rotate-210"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <g
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="rotate(90 128 128)"
        >
          <path
            d="M 9.763 16.109 c 0.049 -0.007 0.095 -0.029 0.145 -0.029 c 0.029 0 0.055 0.014 0.084 0.017 c 0.038 0.001 0.073 -0.012 0.111 -0.006 c 0.064 0.009 0.117 0.042 0.176 0.063 c 0.007 0.003 0.013 0.004 0.019 0.007 c 0.21 0.078 0.383 0.211 0.498 0.393 l 8.733 8.734 c 0.391 0.391 0.391 1.023 0 1.414 s -1.023 0.391 -1.414 0 l -7.41 -7.411 c -1.64 15.449 4.181 28.442 16.193 35.847 c 0.471 0.29 0.617 0.906 0.327 1.376 s -0.906 0.616 -1.376 0.326 C 14.547 49.875 8.41 38.28 8.41 24.364 c 0 -1.505 0.08 -3.04 0.225 -4.596 l -6.934 6.934 c -0.391 0.391 -1.023 0.391 -1.414 0 c -0.195 -0.195 -0.293 -0.451 -0.293 -0.707 s 0.098 -0.512 0.293 -0.707 l 8.914 -8.914 c 0.131 -0.131 0.298 -0.204 0.475 -0.247 C 9.704 16.118 9.733 16.115 9.763 16.109 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 1,
            }}
          />
          <path
            d="M 57.834 73.088 c -10.517 -2.136 -19.862 -8.403 -23.81 -15.969 c -0.929 -1.793 -1.383 -3.915 -1.383 -6.185 c 0 -3.564 1.12 -7.493 3.284 -11.086 c 2.334 -3.879 5.582 -6.906 9.145 -8.525 c 3.689 -1.676 7.284 -1.658 10.124 0.052 c 5.733 3.451 6.419 12.871 1.529 20.994 c -0.003 0.006 -0.01 0.009 -0.013 0.014 c -2.095 3.475 -4.99 6.324 -8.152 8.022 c -0.486 0.261 -1.093 0.079 -1.354 -0.408 c -0.081 -0.15 -0.119 -0.313 -0.119 -0.472 c 0 -0.356 0.191 -0.702 0.527 -0.882 c 2.855 -1.534 5.481 -4.129 7.395 -7.308 c 0.003 -0.004 0.007 -0.006 0.01 -0.01 c 4.314 -7.178 3.933 -15.354 -0.853 -18.238 c -2.258 -1.359 -5.193 -1.339 -8.265 0.057 c -3.197 1.453 -6.131 4.2 -8.259 7.735 c -3.191 5.299 -3.913 11.312 -1.84 15.317 c 3.679 7.05 12.484 12.911 22.434 14.931 c 11.04 2.242 21.739 -0.328 30.125 -7.238 c 0.426 -0.351 1.056 -0.29 1.408 0.136 c 0.351 0.426 0.291 1.056 -0.136 1.408 C 80.769 72.734 69.477 75.453 57.834 73.088 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 1,
            }}
          />
        </g>
      </motion.svg>
    </div>
  );
};