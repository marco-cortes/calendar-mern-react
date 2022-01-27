import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment";
import "moment/locale/es";

import { NavBar } from "../ui/NavBar";

import { messages } from "../../helpers/calendar-messages-es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles.css";
import { CalendarEvent } from "./CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventCleanActive, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectedEvent = (e) => {
        dispatch( eventSetActive(e) );
    }
    
    const onViewChange = (e) => {
        localStorage.setItem("lastView", e);
        setLastView(e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? "#367CF7" : "#465660",
            borderRadius: "0px",
            opacity: 0.8,
            display: "block",
            color: "white"
        }

        return {
            style
        }
    }

    const onSelectedSlot = (e) => {
        dispatch( eventCleanActive() );
    }

    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectedEvent }
                onView={ onViewChange }
                view={lastView}
                onSelectSlot={onSelectedSlot}
                selectable={true}
            />

            {
                activeEvent && <DeleteEventFab />
            }
            <AddNewFab />

            <CalendarModal />
        </div>
    )
}
