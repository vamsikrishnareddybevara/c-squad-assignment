import classNames from "classnames";

export type Step = {
    id: string;
    isCompleted: boolean;
    title: string;
    stepNo: number;
};
const StepsProgress = ({
    steps,
    currentStepId,
}: {
    steps: Step[];
    currentStepId: string;
}) => {
    return (
        <div className="flex flex-col bg-white bg-opacity-20 h-2 w-full text-opacity-90 relative ">
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={classNames(
                            "h-8 w-8 rounded-full text-white flex items-center justify-center -mt-3 ",
                            {
                                "bg-slate-900": !step.isCompleted,
                                "bg-gradient-to-b from-[#9E44FF] to-[#543EFF]":
                                    step.id === currentStepId,
                                "bg-green-600": step.isCompleted,
                            }
                        )}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { StepsProgress };
export default StepsProgress;
