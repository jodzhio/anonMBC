import { serializer } from "./utlis";

function sendingMessage(event) {
  event.preventDefault();

  const data = serializer(message);

  const hasData = data.some(item => item.value.trim() !== '');
  if (!hasData) {
    console.log("Нет данных для отправки");
    return;
  }

  fetch('http://test.ru/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Не удалось отправить');
      }
      return response.json();
    })
    .then(result => {
      console.log('Сообщение успешно отправлено:', result);
    })
    .catch(error => {
      console.error('Ошибка при отправке сообщения:', error);
    });
}

const message = document.getElementById('contactForm');
message.addEventListener('submit', sendingMessage);
