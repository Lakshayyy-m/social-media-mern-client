import { motion } from "framer-motion";

import { MouseEventHandler, ReactNode } from "react";

const Button = ({
  children,
  className,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit";
}) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1 }}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default Button;
