document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const messageText = document.getElementById('message').value;
  const file1 = document.getElementById('fileInput1').files[0];
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  try {
    const [file1Data, file2Data] = await Promise.all([
      readFileAsDataURL(file1)
    ]);
    const payload = {
      text: messageText,
      file: file1Data
    };
    const response = await fetch('http://127.0.0.1:8000/lol', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    console.log('Успех:', result);
  } catch (error) {
    console.error('Ошибка:', error);
  }
});
