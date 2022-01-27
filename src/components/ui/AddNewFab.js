import { useDispatch, useSelector } from "react-redux";
import { eventCleanActive } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {

    const dispatch = useDispatch();
    const {activeEvent} = useSelector(state => state.calendar);

    const onClick = () => {
        if(activeEvent) {
            dispatch(eventCleanActive());
        }
        dispatch( uiOpenModal() );

    }

    return (
        <button 
            className="btn btn-primary fab"
            onClick={onClick}>
            <i className="fas fa-plus"></i>
            
        </button>
    )
}
