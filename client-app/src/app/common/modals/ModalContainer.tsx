import { Box, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

function ModalContainer() {

    const { modalStore } = useStore();

    return (
        <>
        <Modal
            open={modalStore.modal.open}
            onClose={modalStore.closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box>
                {modalStore.modal.body}
            </Box>
        </Modal>
        </>
    );
}

export default observer(ModalContainer);