import React from "react";

interface ButtonProps {
  variant: "fill" | "outline";
  selected?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function Button({ children, icon, variant, selected }: ButtonProps) {
  const variantClasses = {
    fill: "bg-[#023B78] text-white",
    outline: "bg-white text-[#77818C] border-[1px] border-[#D8DFE6]",
  };

  return (
    <button
      className={`flex items-center gap-2 font-semibold px-4 py-1.5 rounded-[3px] hover:brightness-90 duration-300 ${
        variantClasses[variant]
      } ${selected && "!bg-[#2188FF] !text-white !border-[#2188FF]"}`}
    >
      {
        <span
          className={
            variant === "outline"
              ? selected
                ? "text-white"
                : "text-[#2188FF]"
              : ""
          }
        >
          {icon}
        </span>
      }
      {children}
    </button>
  );
}

export default Button;
