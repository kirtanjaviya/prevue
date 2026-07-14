const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  onClick,
  ...props
}) => {
  // Base classes from the user's code
  const baseClasses = "relative inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] outline-none select-none";

  // Sizes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-5 py-3 text-base rounded-xl",
  };

  // Variants from user HTML
  const variantClasses = {
    primary:
      "from-brand-secondary to-brand-primary bg-linear-to-b text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] hover:from-brand-secondary hover:to-brand-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_3px_5px_rgba(30,144,255,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
    secondary:
      "border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800",
    text:
      "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
