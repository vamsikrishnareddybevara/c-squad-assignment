import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import StepsProgress, { Step } from "./StepsProgress";
import Button from "./Button";
import SearchIcon from "./../assets/SearchIcon.svg";
import AssetsCompareIcon from "./../assets/AssetsCompare.svg";
import Algorand from "./../assets/crypto-icons/Algorand.svg";
import Avalanche from "./../assets/crypto-icons/Avalanche.svg";
import Cardano from "./../assets/crypto-icons/Cardano.svg";
import ChainLink from "./../assets/crypto-icons/ChainLink.svg";
import Ethereum from "./../assets/crypto-icons/Ethereum.svg";
import Tabs, { Tab } from "./Tabs";
import classNames from "classnames";

const CREATE_LOT_STEPS = [
    { id: "1", isCompleted: false, title: "Choose your asset", stepNo: 1 },
    { id: "2", isCompleted: false, title: "Choose opposing asset", stepNo: 2 },
    { id: "3", isCompleted: false, title: "Take position", stepNo: 3 },
];

const ASSET_TYPES: Tab[] = [
    { id: "crypto", name: "Crypto" },
    { id: "indexes", name: "Indexes" },
    { id: "stocks", name: "Stocks" },
    { id: "commodities", name: "Commodities" },
    { id: "forex", name: "Forex" },
];

type Asset = { id: string; name: string; icon: string };
const ASSETS: Asset[] = [
    { id: "ethereum", name: "Ethereum", icon: Ethereum },
    { id: "algorand", name: "Algorand", icon: Algorand },
    { id: "avalanche", name: "Avalanche", icon: Avalanche },
    { id: "cardano", name: "Cardano", icon: Cardano },
    { id: "chainLink", name: "ChainLink", icon: ChainLink },
];

const AssetDetails = ({
    asset,
    handleAssetSelection,
    id,
    selectedAssets,
    currentStep,
}: {
    asset: Asset;
    handleAssetSelection: (asset: Asset, assetKey: string) => void;
    id: string;
    selectedAssets: any;
    currentStep: Step;
}) => {
    const selected =
        (selectedAssets?.primaryAsset === id && currentStep.stepNo === 1) ||
        (selectedAssets?.secondaryAsset === id && currentStep.stepNo === 2);
    return (
        <div
            key={asset.id}
            className={classNames(
                "flex flex-col justify-between items-center p-3 cursor-pointer",
                {
                    "border border-gray-100": selected,
                }
            )}
            onClick={() => {
                handleAssetSelection(asset, id);
            }}
        >
            <img src={asset.icon} alt={asset.name} className="h-10 w-10" />

            <div className="text-white mt-4 text-opacity-70">{asset.name}</div>
        </div>
    );
};
const CreateLotModal = ({
    open,
    toggleModal,
}: {
    open: boolean;
    toggleModal: (open: boolean) => void;
}) => {
    const [steps, setSteps] = useState<Step[]>(CREATE_LOT_STEPS);
    const totalSteps = steps.length;
    const [currentStep, setCurrentStep] = useState<Step>(CREATE_LOT_STEPS[0]);
    const [currentTab, setCurrentTab] = useState<Tab>(ASSET_TYPES[0]);
    const [primaryAsset, setPrimaryAsset] = useState<Asset | null>(null);
    const [secondaryAsset, setSecondaryAsset] = useState<Asset | null>(null);
    const handleCurrentTab = (tab: Tab) => {
        setCurrentTab(tab);
    };
    const [selectedAssets, setSelectedAssets] = useState<any>([]);
    const handleAssetSelection = (asset: Asset, assetKey: string) => {
        const updatedStep = { ...currentStep, isCompleted: true };
        const updatedSteps = steps.map((step) => {
            if (step.id === currentStep.id) {
                return updatedStep;
            }
            return step;
        });
        setCurrentStep(updatedStep);
        setSteps(updatedSteps);

        if (currentStep.stepNo === 1) {
            setPrimaryAsset(asset);
            setSelectedAssets((value: any[]) => ({
                ...value,
                primaryAsset: assetKey,
            }));
        }
        if (currentStep.stepNo === 2) {
            setSecondaryAsset(asset);
            setSelectedAssets((value: any[]) => ({
                ...value,
                secondaryAsset: assetKey,
            }));
        }
    };

    const onCreateLot = () => {
        toggleModal(false);
        resetData();
    };

    const onBack = () => {
        const previousStepNo = currentStep.stepNo - 1;
        const previousStep = steps.find(
            (step) => step.stepNo === previousStepNo
        ) as Step;
        setCurrentStep(previousStep);
    };

    const onNext = () => {
        const nextStepNo = currentStep.stepNo + 1;
        const nextStep = steps.find(
            (step) => step.stepNo === nextStepNo
        ) as Step;
        setCurrentStep(nextStep);
    };

    const resetData = () => {
        setSteps(CREATE_LOT_STEPS);

        setCurrentStep(CREATE_LOT_STEPS[0]);
        setCurrentTab(ASSET_TYPES[0]);
        setPrimaryAsset(null);
        setSecondaryAsset(null);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    toggleModal(false);
                    resetData();
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1a1e33] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-1/3 sm:p-6">
                            <div className="text-base text-white font-medium text-opacity-90 ml-1 mb-2 py-4">
                                Multi-user Lot
                            </div>
                            <div>
                                <StepsProgress
                                    steps={steps}
                                    currentStepId={currentStep.id}
                                />
                            </div>

                            <div className="text-white text-opacity-90 leading-6 flex justify-center py-6 text-lg font-semibold">
                                {currentStep.title}
                            </div>

                            {currentStep.stepNo !== totalSteps && (
                                <>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <img
                                                className="h-4 w-4 text-gray-400"
                                                src={SearchIcon}
                                                alt="search icon"
                                            />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block bg-indigo-950 w-full rounded-full border-0 py-1.5 pl-10 text-white text-opacity-10 ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            placeholder="Search Token eg. ETH, Gold etc"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between py-6 mt-4 max-h-[400px] overflow-auto">
                                        <Tabs
                                            tabs={ASSET_TYPES}
                                            currentTab={currentTab}
                                            handleCurrentTab={handleCurrentTab}
                                        />
                                        <div className="flex flex-col px-4">
                                            {Array(5)
                                                .fill("_")
                                                .map((_a, i) => (
                                                    <div className="flex justify-between">
                                                        {" "}
                                                        {ASSETS.map(
                                                            (asset, index) => (
                                                                <AssetDetails
                                                                    key={
                                                                        asset.id
                                                                    }
                                                                    asset={
                                                                        asset
                                                                    }
                                                                    handleAssetSelection={
                                                                        handleAssetSelection
                                                                    }
                                                                    selectedAssets={
                                                                        selectedAssets
                                                                    }
                                                                    id={
                                                                        asset.id +
                                                                        i +
                                                                        index
                                                                    }
                                                                    currentStep={
                                                                        currentStep
                                                                    }
                                                                />
                                                            )
                                                        )}{" "}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {currentStep.stepNo === totalSteps && (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex justify-between items-center py-6 px-4">
                                        <div className="flex flex-col justify-between items-center space-y-3 bg-slate-900 rounded-md p-3 w-52">
                                            <div className="text-white text-opacity-70">
                                                Your Asset
                                            </div>{" "}
                                            <img
                                                src={primaryAsset?.icon}
                                                className="h-10 w-10"
                                                alt="Your asset"
                                            />{" "}
                                            <div className="text-white text-opacity-70">
                                                {primaryAsset?.name}
                                            </div>
                                        </div>
                                        <div>
                                            {" "}
                                            <img
                                                className="h-20 w-20"
                                                src={AssetsCompareIcon}
                                                alt="assets compare icon"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between items-center space-y-3 bg-slate-900 rounded-md p-3 w-52">
                                            <div className="text-white text-opacity-70">
                                                Opposing Asset
                                            </div>{" "}
                                            <img
                                                className="h-10 w-10"
                                                src={secondaryAsset?.icon}
                                                alt="Your asset"
                                            />
                                            <div className="text-white text-opacity-70">
                                                {secondaryAsset?.name}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <form
                                            onSubmit={(values) =>
                                                console.log({ values })
                                            }
                                        >
                                            <div>
                                                <label
                                                    htmlFor="fund"
                                                    className="block text-sm font-medium leading-6 text-white text-opacity-70"
                                                >
                                                    Fund your pool
                                                    {"  "}({primaryAsset?.name})
                                                </label>
                                                <input
                                                    type="number"
                                                    name="fund"
                                                    id="fund"
                                                    className="block bg-slate-950 w-full rounded-full border-0 py-1.5 pl-10 text-white text-opacity-90 ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    placeholder="Pool money"
                                                    defaultValue={100}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="lot-start-date"
                                                    className="block text-sm font-medium leading-6 text-white text-opacity-70"
                                                >
                                                    Lot Starts On
                                                </label>
                                                <input
                                                    type="date"
                                                    name="lot-start-date"
                                                    id="lot-start-data"
                                                    className="block bg-slate-950 w-full rounded-full border-0 py-1.5 pl-10 text-white text-opacity-90 ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4"
                                                    placeholder="Start date"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="lot-end-date"
                                                    className="block text-sm font-medium leading-6 text-white text-opacity-70"
                                                >
                                                    Lot Ends On
                                                </label>
                                                <input
                                                    type="date"
                                                    name="lot-end-date"
                                                    id="lot-end-data"
                                                    className="block bg-slate-950 w-full rounded-full border-0 py-1.5 pl-10 text-white text-opacity-90 ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4"
                                                    placeholder="End date"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className="mt-5 sm:mt-6 flex justify-center space-x-4 px-4">
                                {currentStep.stepNo > 1 && (
                                    <Button
                                        type="secondary"
                                        onClick={() => onBack()}
                                        className="w-1/2"
                                    >
                                        Back
                                    </Button>
                                )}
                                {currentStep.stepNo < totalSteps && (
                                    <Button
                                        type="primary"
                                        onClick={() => onNext()}
                                        className="w-1/2"
                                    >
                                        Next
                                    </Button>
                                )}

                                {currentStep.stepNo === totalSteps && (
                                    <Button
                                        type="primary"
                                        isSubmit
                                        onClick={() => {
                                            onCreateLot();
                                        }}
                                        className="w-1/2"
                                    >
                                        Create Lot
                                    </Button>
                                )}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export { CreateLotModal };
export default CreateLotModal;
