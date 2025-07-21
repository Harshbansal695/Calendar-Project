const EventModal = ({ event, onClose, onDelete, onEdit }) => {
  return (
    <div className="modal-overlay">
      <div className="event-modal">
        <h2>{event.title}</h2>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {event.time}
        </p>
        {event.description && (
          <p>
            <strong>Description:</strong> {event.description}
          </p>
        )}

        <div className="modal-actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={() => onDelete(event.id)}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
