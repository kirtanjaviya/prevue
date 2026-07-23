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

    // Base classes
    const baseClasses = isJourney
        ? "text-white text-center no-underline group text-xl md:text-xl font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-2xl outline-none"
        : "relative inline-flex cursor-pointer items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] outline-none select-none";

    // Sizes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs rounded-md",
        md: "px-4 py-2 text-sm rounded-md",
        lg: "px-5 py-3 text-base rounded-xl",
    };

    // Variants
    const variantClasses = {
        primary:
            "from-brand-secondary to-brand-primary bg-linear-to-b text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] hover:from-brand-secondary hover:to-brand-primary hover:shadow-[0_1px_2px_rgba(5,150,105,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
        secondary:
            "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100",
        text:
            "text-neutral-600 hover:text-neutral-900 transition-colors",
        slide:
            "overflow-hidden group bg-brand-primary text-white hover:bg-emerald-700 transition-colors duration-300 shadow-xs",
        journey:
            "bg-linear-to-b from-brand-secondary to-brand-primary [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_0px_40px_5px_rgba(5,150,105,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300",
    };

    const combinedClasses = isJourney
        ? `${baseClasses} ${variantClasses[variant]}`
        : `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    // Render children or animated sliding text structure
    const content = isSlide ? (
        <>
            <span className="invisible block font-sans font-semibold select-none">
                {children}
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-full font-sans font-semibold text-white">
                {children}
            </span>
            <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-white font-sans font-semibold">
                {children}
            </span>
        </>
    ) : isJourney ? (
        <div className="relative overflow-hidden w-max cursor-pointer mx-auto">
            <div className="transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                {children} <span>→</span>
            </div>
            <div className="absolute inset-0 translate-y-[120%] transition-transform duration-300 ease-out group-hover:translate-y-0">
                {children} <span>→</span>
            </div>
        </div>
    ) : (
        children
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
            <div className={`flex p-[.5px] bg-linear-to-b from-emerald-800/50 rounded-2xl to-transparent mt-5 mb-10 sm:mb-10 ${className}`}>
                {renderButton()}
            </div>
        );
    }

    return renderButton();
};

export default Button;