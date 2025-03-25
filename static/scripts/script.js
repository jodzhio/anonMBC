document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const messageText = document.getElementById('message').value;
  const fileInput = document.getElementById('fileInput1');
  const file = fileInput.files[0];

  const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  try {
    const fileData = await readFileAsDataURL(file);

    const payload = {
      text: messageText,
      file: fileData
    };

    const response = await fetch('http://127.0.0.1:8000/lol', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      console.log('Сообщение отправлено:', result.message);
    } else {
      console.error('Ошибка сервера:', result.message, result.error || '');
    }

  } catch (error) {
    console.error('Ошибка запроса:', error);
  }
});
