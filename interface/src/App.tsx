import { useEffect, useState } from "react"
import SeminarList from "./components/SeminarList/SeminarList";
import type { Seminar } from "../types/seminar"
import "./App.scss";

function App() {
  // Состояние для семинаров, чтобы обеспечить реактивность отрисовки
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  // Состояние для отрисовки загрузки
  const [loading, setLoading] = useState(true);
  // Состояние для отрисовки ошибок http запросов 
  const [error, setError] = useState("");

  // Единоразово загружаем все семинары
  useEffect(() => {
    fetchSeminars()
  }, []);

  // Получение семинаров с сервера
  const fetchSeminars = async () => {
    try {
      // Получаем данные с сервера
      const response = await fetch("http://localhost:3000/seminars");
      // Преобразуем в json
      const data = await response.json();
      // Устанавливаем состояние для семинаров
      setSeminars(data);
      // При ошибки в запросе отлавливаем её конструкцией catch
    } catch (err) {
      // Устанавливаем состояние для ошибки
      setError("Ошибка при загрузке семинаров " + err)
    } finally {
      // В любом случае отключаем загрузку
      setLoading(false)
    }
  }

  // Хендлер для удаления записи с сервера
  const handleDelete = async (id: number) => {
    try {
      // Ждём удаления конкретного семинара по id
      await fetch(`http://localhost:3000/seminars/${id}`, {
        method: "DELETE",
      });
      // Обновляем данные о семинарах для пользователя без обращения к серверу, для ускорения работы
      setSeminars(seminars.filter((seminar) => seminar.id !== id));
    } catch (err) {
      // Устанавливаем состояние ошибки при отлове 
      setError("Ошибка при удалении семинара " + err);
    }
  }

  // Хендлер для изменения записи на сервере
  const handleUpdate = async (id: number, updatedSeminar: Partial<Seminar>) => {
    try {
      // Указываем на конкретный id семинара и передаём обновленные данные
      const response = await fetch(`http://localhost:3000/seminars/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSeminar),
      });
      // Обновляем семинары
      const data = await response.json();
      setSeminars(seminars.map((seminar) => (seminar.id === id ? { ...seminar, ...data } : seminar)));
    } catch (err) {
      // Устанавливаем ошибку при отливе
      setError("Ошибка при обновлении семинара " + err);
    }
  }

  // Если происходит загрузка
  if (loading) return <div className="loading">Загрузка...</div>
  // Если произошла ошибка
  if (error) return <div className="error">{error}</div>

  return (
    <div className="app">
      <header className="header">
        <h1>Семинары Kosmoteros</h1>
      </header>
      <main className="main">
        <SeminarList seminars={seminars} onDelete={handleDelete} onUpdate={handleUpdate} />
      </main>
    </div>
  )
}

export default App