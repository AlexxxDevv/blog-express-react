type ModalProps = {
    onClick: () => void;
}

const ModalOverlay = (props: ModalProps) => {
    return (
        <div onClick={props.onClick} className='fixed inset-0 bg-[#1c1c21] opacity-40 flex items-center w-screen h-screen transition-opacity duration-500'></div>
    )
}

export default ModalOverlay;