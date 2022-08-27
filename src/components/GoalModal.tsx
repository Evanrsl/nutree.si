import { Modal } from "native-base"


const GoalModal = ({ isOpen, handleModal, handleGoal }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => handleModal(false)} avoidKeyboard >
        <Modal.Content rounded="2xl"> 
        <Modal.CloseButton />
          <Modal.Header>Set Goal</Modal.Header>
          <Modal.Body>
            {/* Set new goal */}
          </Modal.Body>
        </Modal.Content>
    </Modal>
  )
}

export default GoalModal