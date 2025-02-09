import { useEffect, type ReactNode } from "react"
import "./Modal.style.scss";

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Модальное окно. Принимает isOpen (открыто или нет), onClose -> на закрытие, title - заголовок, children - контент внутри
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Срабатывает только если открыто
  useEffect(() => {
    // Устанавливаем keyboardEvent на Escape (чтобы закрыть модальное окно)
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    // Если isOpen -> false отработает return и уберёт из стека хендлер
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Если isOpen -> false окно не отрисовывается
  if (!isOpen) return null

  return (
    // При нажатии на overlay, т.е. бэкграунд -> модальное окно закроется
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation -> для того, чтобы нажимать кнопки внутри окна и оно не закрывалось */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{title}</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  )
}

export default Modal