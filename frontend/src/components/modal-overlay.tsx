import styles from './modal-overlay.module.css';

type ModalProps = {
    onClick: () => void;
}

const ModalOverlay = (props: ModalProps) => {
    return (
        <div onClick={props.onClick} className={styles.popup}></div>
    )
}

export default ModalOverlay;