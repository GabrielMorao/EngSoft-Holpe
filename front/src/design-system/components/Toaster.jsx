import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../stylesheets/toaster.css";

export function showToaster({
  type = "info",
  autoClose = false,
  onClose = null,
  message,
}) {
  const config = {
    className: `toaster-${type}`,
    autoClose: autoClose,
    onClose: onClose,
    position: "bottom-right",
    role: type,
    toastId: "1",
  };
  toast.dismiss("1");
  return toast[type](message, config);
}
