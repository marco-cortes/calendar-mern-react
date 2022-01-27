import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventCleanActive, eventStartUpdate, startNewEvent } from '../../actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initialState = {
    title: "",
    notes: "",
    start: now.toDate(),
    end: nowPlusOne.toDate(),
}

export const CalendarModal = () => {

    const [startDate, setStartDate] = useState(now.toDate());
    const [endDate, setEndDate] = useState(nowPlusOne.toDate());

    const [titleValid, setTitleValid] = useState(true);

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initialState);

    const { title, notes, start, end } = formValues;
    
    useEffect(() => {
        setFormValues(activeEvent ? activeEvent : initialState);
    }, [activeEvent]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setFormValues({
            ...formValues,
            start: e,
        })
    }

    const handleEndDateChange = (e) => {
        setEndDate(e);
        setFormValues({
            ...formValues,
            end: e,
        })
    }

    const afterOpenModal = () => {
        
    }

    const closeModal = () => {
        dispatch(uiCloseModal())
        eventCleanActive && dispatch(eventCleanActive());
        setTitleValid(true);
        setFormValues(initialState);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire("Error", "Fecha final debe ser mayor a la fecha inicial", "error");
            return;
        }

        if(title.trim().length < 2){
            return setTitleValid(false);
        }

        if(activeEvent) {
            dispatch(eventStartUpdate(formValues))
            closeModal();
        } else {
            dispatch(startNewEvent(formValues));
            closeModal();
        }
            

        
        
    }

    return (
        <Modal
            isOpen={modalOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {activeEvent ? "Editar Evento" : "Nuevo Evento"} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group mb-3">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={startDate}
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={endDate}
                        className="form-control"
                        minDate={startDate} />
                </div>

                <hr />
                <div className="form-group mb-3">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ !titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-3">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>



                <div className="d-grid gap-2">
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </div>

            </form>
        </Modal>
    )
}
