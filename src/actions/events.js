import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../type/types";

export const startNewEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            const resp = await fetchConToken("events/create", event, "POST");
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventAddNew({
                    ...body.event,
                    user: {
                        _id: body.event.user,
                        name: getState().auth.name,
                    }
                }));
                Swal.fire("Evento agregado", "", "success");
            } else {
                Swal.fire("Error", body.message, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventCleanActive = () => ({
    type: types.eventCleanActive,
});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted,
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("events/", null);
            const body = await resp.json();
            if (body.ok) {
                body.events.forEach(events => {
                    events.start = new Date(events.start)
                    events.end = new Date(events.end)
                });
                dispatch(eventLoaded(body.events));
            } else {
                Swal.fire("Error", body.message, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`events/update/${event.id}`, event, "PUT");
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventUpdated(event));
                Swal.fire("Evento actualizado", "", "success");
            } else {
                console.log(body);
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventStartDelete = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`events/delete/${event.id}`, {}, "DELETE");
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                console.log(body);
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}