import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'
import { FaPlus } from "react-icons/fa"
import { getTicket, closeTicket, reset } from "../features/tickets/ticketSlice"
import { addNote, getNotes, reset as noteReset } from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem.jsx'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { ticket, isLoading, isUpdated, isError, message }
        = useSelector((state) => state.ticket)

    const { notes, isLoading: isLoadingNote, isError: isErrorNote, message: messageNote }
        = useSelector((state) => state.note)

    const { ticketId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, ticketId, dispatch])

    useEffect(() => {
        if (isUpdated) {
            toast.success('Ticket is updated')
            dispatch(reset())
            navigate('/tickets')
        }
    }, [ticket.status])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
    }

    // Open/Close Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)
    // On Create Note Submit
    const onNoteSubmit = (e) => {
        e.preventDefault()

        dispatch(addNote({ ticketId, text: noteText }))
        setNoteText('')

        closeModal()
    }

    if (isLoading || isLoadingNote) {
        return <Spinner></Spinner>
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>
    }

    return <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/tickets'></BackButton>
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>Data Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
        </header>

        {ticket.status !== 'closed' && (
            <button className="btn" onClick={openModal}>
                <FaPlus></FaPlus> Add Note
            </button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
            style={customStyles} contentLabel="Add Note">
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea name="noteText" id="noteText" className="form-control"
                        placeholder="Note Text" value={noteText} onChange={(e) => setNoteText(e.target.value)}
                        required></textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </Modal>

        {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        ))}

        {ticket.status !== 'closed' && (
            <button className="btn btn-block btn-danger" onClick={onTicketClose}>
                Close Ticket
            </button>
        )}
    </div>
}

export default Ticket
