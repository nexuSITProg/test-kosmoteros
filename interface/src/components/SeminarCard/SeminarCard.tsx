import type { Seminar } from "../../../types/seminar";
import "./SeminarCard.style.scss";

interface SeminarCardProps {
  seminar: Seminar
  onDeleteClick: () => void
  onEditClick: () => void
}

// Карточка семинара. Принимает объект Seminar и два хендлера (на удаление и изменение)
function SeminarCard({ seminar, onDeleteClick, onEditClick }: SeminarCardProps) {
  return (
    <div className="seminar-card">
      <div className="seminar-card__image">
        {/* Placeholder - если не загружается фото */}
        <img src={seminar.photo || "/placeholder.svg"} alt={seminar.title} />
      </div>
      <div className="seminar-card__content">
        <h2 className="seminar-card__title">{seminar.title}</h2>
        <p className="seminar-card__description">{seminar.description}</p>
        <div className="seminar-card__datetime">
          <span>{seminar.date}</span>
          <span>{seminar.time}</span>
        </div>
        <div className="seminar-card__actions">
          <button className="button button--secondary" onClick={onEditClick}>
            Редактировать
          </button>
          <button className="button button--danger" onClick={onDeleteClick}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeminarCard