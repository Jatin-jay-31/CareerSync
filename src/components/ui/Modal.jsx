import React, { useEffect } from "react"
import {Button} from "../index"

function Modal({ children, onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        animate-fadeIn
      "
      onClick={onClose}
    >
      {/* MODAL CARD */}
      <div
        className="
          w-full max-w-lg
          bg-white
          rounded-2xl
          shadow-2xl
          p-6
          relative
          transform transition-all duration-300
          animate-scaleIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <Button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-slate-400 hover:text-slate-700
            text-xl flex justify-center
          "
        >
          ✕
        </Button>

        {children}
      </div>
    </div>
  )
}

export default Modal