import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import crudApi from '../../api/crudApi';

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

export const CrudModal = ({isOpen, setIsOpen, formValues, setFormValues}) => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

    }, [formValues.title, formSubmitted]);
    

    const onInputChanged = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onCloseModal = () => {
        setIsOpen(false);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        if(formValues.title.length <= 0 || formValues.notes.length <= 0) return;

        try {
            await crudApi.post('/events', { title: formValues.title, notes: formValues.notes });
            setIsOpen(false);

            formValues.title = '';
            formValues.notes = '';
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
        <h1> Nuevo evento </h1>
        <hr />
        <form 
            className="container"
            onSubmit={onSubmit}
        >    
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChanged}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChanged}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Todos los campos son necesarios</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
        </Modal>
    )
}
