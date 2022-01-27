import { useDispatch, useSelector } from "react-redux";
import { eventStartDelete } from "../../actions/events";

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const {activeEvent} = useSelector(state => state.calendar);

    const onClick = () => {
        activeEvent && dispatch( eventStartDelete(activeEvent) );
    }

    return (
        <button 
            className="btn btn-danger fab-danger"
            onClick={onClick}>
            <i className="fas fa-trash"></i>
            
        </button>
    )
}
