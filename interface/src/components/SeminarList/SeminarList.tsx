import { useState } from "react";
import type { Seminar } from "../../../types/seminar";
import SeminarCard from "../SeminarCard/SeminarCard";
import Modal from "../Modal/Modal";
import EditForm from "../EditForm/EditForm";
import "./SeminarList.style.scss";

interface SeminarListProps {
  seminars: Seminar[]
  onDelete: (id: number) => void
  onUpdate: (id: number, seminar: Partial<Seminar>) => void
}

// Принимает объект типа Seminar, функцию onDelete и onUpdate, для удаления и изменения объектов Seminar
function SeminarList({ seminars, onDelete, onUpdate }: SeminarListProps) {
  // Состояние для выбранного семинара
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  // Состояние для отображения модального окна для удаления семинара
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Состояние для отображения модального окна для изменения семинара
  const [showEditModal, setShowEditModal] = useState(false);

  // Хендлер для удаления
  const handleDeleteClick = (seminar: Seminar) => {
    setSelectedSeminar(seminar)
    setShowDeleteModal(true)
  }

  // Хендлер для изменения
  const handleEditClick = (seminar: Seminar) => {
    setSelectedSeminar(seminar)
    setShowEditModal(true)
  }

  // Хендлер для подтверждения удаления
  const handleConfirmDelete = async () => {
    if (selectedSeminar) {
      // Await, т.к. удаление - это обращение к серверу
      await onDelete(selectedSeminar.id)
      setShowDeleteModal(false)
      setSelectedSeminar(null)
    }
  }

  return (
    <>
      {/* Отрисовка семинаров */}
      <div className="seminar-list">
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.id}
            seminar={seminar}
            onDeleteClick={() => handleDeleteClick(seminar)}
            onEditClick={() => handleEditClick(seminar)}
          />
        ))}
      </div>

      {/* Отрисовка модального окна, если (showDeleteModal -> true) */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Подтверждение удаления">
        <div className="delete-confirmation">
          <p>Вы уверены, что хотите удалить этот семинар?</p>
          <div className="delete-actions">
            <button className="button button--secondary" onClick={() => setShowDeleteModal(false)}>
              Отмена
            </button>
            <button className="button button--danger" onClick={handleConfirmDelete}>
              Удалить
            </button>
          </div>
        </div>
      </Modal>

      {/* Отрисовка модального окна, если (showEditModal -> true) */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Редактирование семинара">
        {selectedSeminar && (
          <EditForm
            seminar={selectedSeminar}
            // Асинхронная функция, для обновления данных семинара
            onSubmit={async (updatedSeminar) => {
              await onUpdate(selectedSeminar.id, updatedSeminar)
              setShowEditModal(false)
            }}
            onCancel={() => setShowEditModal(false)}
          />
        )}
      </Modal>
    </>
  )
}

export default SeminarList