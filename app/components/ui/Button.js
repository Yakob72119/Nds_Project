import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ children, onClick, className, size = "md", ...props }) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(
        "rounded-md font-semibold transition-all",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
    );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;