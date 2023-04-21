import ArrowsIcons from "./../assets/ArrowsIcon.svg";
import UsersIcons from "./../assets/UsersIcon.svg";
import Button from "./Button";
const CreateLotCard = ({
    toggleModal,
}: {
    toggleModal: (value: boolean) => void;
}) => {
    return (
        <div className="flex flex-col w-[600px] bg-[#1a1e33] border border-white border-opacity-5 p-6 text-opacity-90">
            <div className="flex justify-start text-base">Most played</div>
            <div className="flex justify-between my-10">
                <img src={UsersIcons} alt="user icon" />
                <img src={ArrowsIcons} alt="user icon" />
                <img src={UsersIcons} alt="user icon" />
            </div>

            <div className="flex flex-col items-start my-8 ">
                <div className="text-lg font-semibold text-opacity-90 ml-1 mb-2">
                    Multi-user Lot
                </div>
                <div className="text-base text-white text-opacity-70">
                    In this lot multiple people will bet against you. The
                    condition for the lot to start is both sides should have
                    equal funds.
                </div>
            </div>

            <Button onClick={() => toggleModal(true)}>Create lot</Button>
        </div>
    );
};

export { CreateLotCard };
export default CreateLotCard;
