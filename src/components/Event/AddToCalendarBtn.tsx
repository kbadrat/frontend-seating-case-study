import { FC } from "react";
import { Button } from "../ui/button";

const AddToCalendarBtn: FC = () => {
    return (
        <Button variant="secondary" disabled>
            Add to calendar
        </Button>
    );
};

export default AddToCalendarBtn;
