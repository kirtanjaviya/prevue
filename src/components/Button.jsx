const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  onClick,
  ...props
}) => {
  const isSlide = variant === "slide";
  const isJourney = variant === "journey";

  const baseClasses = isJourney
    ? "text-white text-center no-underline group text-xl md:text-xl font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-2xl outline-none overflow-hidden relative"
    : "relative z-0 inline-flex cursor-pointer items-center justify-center font-semibold transition-all duration-500 active:scale-95 outline-none select-none overflow-hidden group";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs rounded-lg",
    md: "px-4.5 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3.5 text-base rounded-xl",
  };

  const variantClasses = {
    primary:
      "border border-emerald-600 bg-transparent text-emerald-700 font-semibold before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-emerald-600 before:transition-transform before:duration-700 before:content-[''] hover:scale-105 hover:text-white hover:border-emerald-600 hover:before:translate-x-[0%] hover:before:translate-y-[0%]",
    secondary:
      "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-300 shadow-xs hover:scale-105 transition-all duration-300",
    text:
      "text-neutral-600 hover:text-neutral-900 transition-colors duration-200",
    slide:
      "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/80 shadow-sm hover:shadow-md",
    journey:
      "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/80 shadow-sm hover:shadow-md",
  };

  const combinedClasses = isJourney
    ? `${baseClasses} ${variantClasses[variant]}`
    : `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = isSlide ? (
    <>
      <span className="invisible block font-sans font-semibold select-none">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full font-sans font-semibold text-white">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-white font-sans font-semibold">
        {children}
      </span>
    </>
  ) : isJourney ? (
    <div className="relative overflow-hidden w-max cursor-pointer mx-auto">
      <div className="transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[120%]">
        {children} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
      <div className="absolute inset-0 translate-y-[120%] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
        {children} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </div>
  ) : (
    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
      {children}
    </span>
  );

  const renderButton = () => {
    if (href) {
      return (
        <a href={href} className={combinedClasses} onClick={onClick} {...props}>
          {content}
        </a>
      );
    }

    return (
      <button className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </button>
    );
  };

  if (isJourney) {
    return (
      <div className={`flex p-[.5px] bg-gradient-to-b from-emerald-500/50 rounded-2xl to-transparent mt-5 mb-10 sm:mb-10 ${className}`}>
        {renderButton()}
      </div>
    );
  }

  return renderButton();
};

export default Button;