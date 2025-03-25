import base64
import re
import os

def parse_file(data_url):
    match = re.match(r"data:(.*?);base64,(.*)", data_url)
    if not match:
        return None, None
    mime_type, b64data = match.groups()
    return mime_type, base64.b64decode(b64data)

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")