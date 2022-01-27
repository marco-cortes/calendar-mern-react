import { types } from "../type/types";

/*
{
            title: "Cumpleaños del jefe",
            start: moment().toDate(),
            end: moment().add(1, "hours").toDate(),
            bgcolor: "#fafafa",
            notes: "Comprar el pastel",
            id: new Date().getTime(),
            user: {
                id: 1,
                name: "Marco"
            }
        },
*/
const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, {
                    ...action.payload,
                    bgcolor: "#fafafa",
                }],
            }
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: {
                    ...action.payload
                }
            }
        case types.eventCleanActive:
            return {
                ...state,
                activeEvent: null,
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event =>
                    event.id === action.payload.id
                        ? action.payload : event),
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => e.id !== state.activeEvent.id
                ),
                activeEvent: null,
            }
        case types.eventLoaded:
            return {
                ...state,
                events: action.payload,
            }
        case types.eventClear:
            return initialState;
        default:
            return state;
    }
}