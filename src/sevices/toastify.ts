import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(msg: string) {
    toast.success(msg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export function errorMsg(msg: string) {
    toast.error(msg, {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        hideProgressBar: true,
    });
}
