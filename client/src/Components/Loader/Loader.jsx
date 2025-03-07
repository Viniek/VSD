import React from "react";
import {
  Oval,
  ThreeDots,
  Rings,
  TailSpin,
  Puff,
  Bars,
  MutatingDots
} from "react-loader-spinner";
import "./Loader.css"; // Optional: Custom styling

const Loader = ({ loading, type = "Oval", color = "green", size = 20}) => {
  if (!loading) return null; // Don't render anything if not loading

  const loaders = {
    Oval: <Oval height={size} width={size} color={color} />,
    ThreeDots: <ThreeDots height={size} width={size} color={color} />,
    Rings: <Rings height={size} width={size} color={color} />,
    TailSpin: <TailSpin height={size} width={size} color={color} />,
    Puff: <Puff height={size} width={size} color={color} />,
    Bars: <Bars height={size} width={size} color={color} />,
    MutatingDots: <MutatingDots height={size} width={size} color={color} />
  };

  return loaders[type] || <Oval height={size} width={size} color={color} />;
};

export default Loader;
