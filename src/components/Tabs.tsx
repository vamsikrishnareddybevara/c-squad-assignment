import classNames from "classnames";

export type Tab = { id: string; name: string };
const Tabs = ({
    tabs = [],
    currentTab,
    handleCurrentTab,
}: {
    tabs: Tab[];
    currentTab: Tab;
    handleCurrentTab: (tab: Tab) => void;
}) => {
    return (
        <div>
            <div className="hidden sm:block">
                <nav
                    className="flex w-full justify-between px-4"
                    aria-label="Tabs"
                >
                    {tabs.map((tab) => (
                        <div
                            key={tab.name}
                            className={classNames(
                                "rounded-md px-3 py-2 text-sm font-medium cursor-pointer",
                                {
                                    "bg-[#9E44FF] bg-opacity-10 text-white border border-indigo-500":
                                        currentTab.id === tab.id,

                                    "text-gray-500 hover:text-gray-700":
                                        currentTab.id !== tab.id,
                                }
                            )}
                            aria-current={
                                currentTab.id === tab.id ? "page" : undefined
                            }
                            onClick={() => handleCurrentTab(tab)}
                        >
                            {tab.name}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export { Tabs };
export default Tabs;
