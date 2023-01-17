import { useDispatch, useSelector } from "react-redux"
import { onOpenModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isModalOpen} = useSelector(state => state.ui)

    const openModal = () => {
        dispatch( onOpenModal());
    }


    return {
        isModalOpen,

        //medotos 
        openModal
    }
}