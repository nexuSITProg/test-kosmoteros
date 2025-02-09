import { useState } from "react"
import type { Seminar } from "../../../types/seminar";
import "./EditForm.style.scss";

interface EditFormProps {
  seminar: Seminar
  onSubmit: (updatedSeminar: Partial<Seminar>) => Promise<void>
  onCancel: () => void
}

// Форма для редактирования семинара. Принимает сам семинар, логику отправки и закрытия окна
function EditForm({ seminar, onSubmit, onCancel }: EditFormProps) {
  // Устанавливаем данные формы
  const [formData, setFormData] = useState(seminar)
  // Состояние для отрисовки загрузки 
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Хендлер для отправки
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Пока не отправится будет отрисовываться загрузка
    await onSubmit(formData)
    setIsSubmitting(false)
  }

  return (
    // Все onChange переписывают данные
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Название</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Дата</label>
          <input
            id="date"
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Время</label>
          <input
            id="time"
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="button button--secondary" onClick={onCancel} disabled={isSubmitting}>
          Отмена
        </button>
        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  )
}

export default EditForm