from quart import Quart, render_template, request, jsonify, Request
from utils import parse_file, BOT_TOKEN, CHAT_ID

from aiogram import types, Bot

app = Quart(__name__)

if not BOT_TOKEN or not CHAT_ID:
    raise ValueError("Неверный токен бота или чата")

bot = Bot(token=BOT_TOKEN)

@app.route("/")
async def index():
    return await render_template('index.html', title='anonMB')

@app.route("/lol", methods=['POST'])
async def make_post():
    data = await request.get_json()

    if not data:
        return jsonify({"ok": False, "message": "Нет данных в запросе"}), 400

    text = data.get("text", "")
    file_data = data.get("file")

    try:
        if file_data:
            mime_type, parsed_file = parse_file(file_data)

            if not mime_type:
                return jsonify({"ok": False, "message": "Неверный формат файла"}), 400

            file = types.BufferedInputFile(parsed_file, filename="file")

            if mime_type.startswith("image/"):
                msg = await bot.send_photo(CHAT_ID, file, caption=text)

            elif mime_type.startswith("video/"):
                msg = await bot.send_video(CHAT_ID, file, caption=text)

            elif mime_type.startswith("audio/"):
                msg = await bot.send_audio(CHAT_ID, file, caption=text)

        else:
            msg = await bot.send_message(CHAT_ID, text)
            new_text = f"номер поста - {msg.message_id}\n{text}"
            await bot.edit_message_text(chat_id=CHAT_ID, message_id=msg.message_id, text=new_text)

        return jsonify({"ok": True, "message_id": msg.message_id,}), 200

    except Exception as e:
        return jsonify({"ok": False, "message": "Ошибка сервера", "error": str(e)}), 500

@app.after_serving
async def after_serving():
    await bot.session.close()

if __name__ == "__main__":
    app.run(debug=True, port=8000)