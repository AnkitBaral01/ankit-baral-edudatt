import { toast } from "react-toastify";

export const showError = (title, options) => {
    return toast.error(title, options);
}

export const showSuccess = (title, options) => {
    return toast.success(title, options);
}

export const showInfo = (title, options) => {
    return toast.info(title, options);
}