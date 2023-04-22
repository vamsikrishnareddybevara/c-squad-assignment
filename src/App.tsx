import { useState } from "react";
import "./App.css";
import CreateLotCard from "./components/CreateLotCard";
import CreateLotModal from "./components/CreateLotModal";

function App() {
    const [open, setOpen] = useState(false);

    const toggleModal = (value: boolean) => {
        setOpen(value);
    };

    return (
        <div className="App">
            <CreateLotCard toggleModal={toggleModal} />
            {open && <CreateLotModal open={open} toggleModal={toggleModal} />}
        </div>
    );
}

export default App;
