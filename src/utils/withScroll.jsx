import React, { forwardRef, useRef } from 'react';
import { useScroll } from '@use-gesture/react';
import PropTypes from 'prop-types';
import './withScroll.scss';

const outerElementType = forwardRef(({ onScroll, children }, ref) => {
  const containerRef = useRef(null);
  useScroll(
    () => {
      if (!(onScroll instanceof Function)) {
        return;
      }
      const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollHeight, scrollWidth } =
        document.documentElement;
      onScroll({
        currentTarget: {
          clientHeight,
          clientWidth,
          scrollLeft,
          scrollTop:
            scrollTop -
            (containerRef.current
              ? containerRef.current.getBoundingClientRect().top + scrollTop
              : 0),
          scrollHeight,
          scrollWidth,
        },
      });
    },
    { target: window }
  );
  ref.current = document.documentElement;
  return (
    <div className="withScroll" ref={containerRef}>
      {children}
    </div>
  );
});

outerElementType.displayName = 'outerElementType';

outerElementType.propTypes = {
  onScroll: PropTypes.func,
  children: PropTypes.node,
};

export default outerElementType;
