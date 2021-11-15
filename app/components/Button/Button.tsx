import React from "react";
// import buttonStyles from "./button.styles.css";

const Button = React.forwardRef<
  HTMLButtonElement,
  { children: string } & React.ComponentPropsWithRef<"button">
>(({ children, ...otherProps }, ref) => {
  return (
    <button
      className={`bg-purple-800 text-purple-50 
        py-2 px-4 rounded-md hover:bg-purple-900 
        active:focus:ring-4 active:focus:ring-purple-700`}
      ref={ref}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export default Button;
