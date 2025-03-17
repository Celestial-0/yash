import * as React from "react"
import { SVGProps } from "react"
const FletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1.5em"
    height="1.5em"
    fillRule="evenodd"
    clipRule="evenodd"
    imageRendering="optimizeQuality"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 285 285"
    {...props}
  >
    <rect width={285} height={285} fill="none" rx={9.03} ry={8.12} />
    <path
      fill="#EE3167"
      d="M39.28 144.74c-.85-1.52-.66-2.61.1-4.13 31.41-58.36 78.81-94.15 138.53-119.75 2.03-.86 5.04 1.52 4.31 3.65-8.9 25.91-15.18 51.13-18.82 78.23-3.32 24.97-4.24 50.79-.87 77.77 3.56 30.59 10.88 55.99 19.68 83.36.98 3.05-2.14 4.43-4.51 3.26-62.19-30.61-109.33-70.65-138.42-122.39z"
    />
    <path
      fill="#0098DA"
      fillOpacity={0.639}
      d="M224.53 198.59c-34.39-10.79-65.15-29.06-92.4-53.2-1.82-1.62-1.61-3.87.03-5.44 27.07-25.88 57.79-46.19 91.74-60.56 2.99-1.27 5.45 1.2 4.56 4.62-9.62 36.91-11.74 73.39.13 109.95.98 3.05-1.47 5.44-4.06 4.63z"
    />
    <path
      fill="#5ABAE7"
      d="M224.53 198.59c-22.64-7.1-43.71-17.45-63.24-30.58-1.35-20.9-1.47-30.2.73-53.26a300.286 300.286 0 0 1 61.88-35.36c2.99-1.27 5.45 1.2 4.56 4.62-9.62 36.91-11.74 73.39.13 109.95.98 3.05-1.47 5.44-4.06 4.63z"
    />
  </svg>
)
export default FletIcon;
