import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const Model = ({onClose,isOpen,children}) => {
    return createPortal(
        <>
            {isOpen &&(
                <> 
                <div className="relative z-50 m-auto min-h-[300px] max-w-[400px] bg-white p-4">
                <div className="flex justify-end">
                <IoMdClose onClick={onClose} className="self-end text-3xl cursor-pointer"/>  
                </div>
                {children}
                </div>
                <div onClick={onClose} className="absolute top-0 z-4 h-screen w-screen backdrop:blur">

                </div>
                </>)}
        </>,
        document.getElementById("model-root")
    )
}
export default Model;