import classNames from "classnames";
type ButtonType = "primary" | "secondary" | "teritiary";
type ButtonChildren = string | JSX.Element;
const Button = ({
    type,
    children,
    onClick,
    className,
    isSubmit,
}: {
    type?: ButtonType;
    children: ButtonChildren;
    onClick?: () => void;
    className?: string;
    isSubmit?: boolean;
}) => {
    return (
        <button
            type={isSubmit ? "submit" : "button"}
            className={classNames(
                `rounded-full w-full  px-2 py-1 text-base font-medium text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`,
                {
                    "bg-gradient-to-b from-[#9E44FF] to-[#543EFF] hover:bg-indigo-500":
                        type === "primary",
                    "bg-slate-900 border border-white": type === "secondary",
                }
            )}
            onClick={onClick ? onClick : undefined}
        >
            {children}
        </button>
    );
};

export { Button };
export default Button;
