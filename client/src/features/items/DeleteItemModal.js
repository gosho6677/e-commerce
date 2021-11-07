import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteItemModal = ({ deleteItemHandler, isOpen, setIsOpen }) => {

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={closeModalHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Do you really want to delete this item?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={closeModalHandler}>NO</Button>
                <Button
                    onClick={deleteItemHandler}
                    autoFocus
                    color='error'
                    variant='contained'
                >
                    YES
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteItemModal;