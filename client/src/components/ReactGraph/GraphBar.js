import React from "react";
import { useSpring, animated, config } from "react-spring";

function GraphBar({ value = 1, description }) {
  const spring = useSpring({
    config: config.molasses,
    // config: {
    //   mass: 10,
    //   tension: 200,
    //   friction: 26
    // },
    from: {
      width: "0%",
      backgroundColor: "red",
      height: "0%",
      o: 0,
      marginLeft: "50%"
    },
    o: value,
    width: "100%",
    height: `${value}%`,
    backgroundColor: `rgb(${Math.floor(
      ((125 - value * 0.75) / 100) * 255
    )},${Math.floor(((value * 1.5) / 100) * 255)},0)`,
    marginLeft: "0%"
  });

  const animatedValue = useSpring({
    config: config.molasses,
    from: {
      o: 0
    },
    o: value
  });

  return (
    <div className="graph-bar">
      <div className="graph-bar-container">
        <span className="graph-bar-text">
          <p>{description}</p>
        </span>

        <animated.div className="graph-animation" style={spring}>
          <animated.span style={animatedValue}>
            {spring.o.interpolate(n => {
              return Math.round(n) + "%";
            })}
          </animated.span>
        </animated.div>
      </div>
    </div>
  );
}

// {spring.o.interpolate(n => {
//   // return <span>{n.value}</span>;
//   return Math.round(n) + "%";
// })}

export default GraphBar;
