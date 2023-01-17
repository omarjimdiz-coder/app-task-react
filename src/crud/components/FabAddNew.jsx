
export const FabAddNew = ({setIsOpen}) => {

    const onClickOpen = () => {
        setIsOpen(true);
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={onClickOpen}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
