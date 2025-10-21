from flask import Flask, request, jsonify, send_from_directory
import discord
import asyncio
import threading
import os

app = Flask(__name__)

TOKEN = "ضع_توكن_البوت_هنا"  # ⚠️ غيّر هذا لتوكن بوتك الفعلي

intents = discord.Intents.default()
intents.members = True
client = discord.Client(intents=intents)

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/generator.html")
def generator():
    return send_from_directory(".", "generator.html")

@app.route("/send_dm", methods=["POST"])
def send_dm():
    data = request.json
    user_id = int(data["id"])
    users_list = data["users"]

    async def send_message():
        try:
            user = await client.fetch_user(user_id)
            await user.send(f"ها هي اليوزرات اللي طلبتها:\n{users_list}")
            print(f"تم الإرسال إلى {user_id}")
        except Exception as e:
            print(f"خطأ أثناء الإرسال: {e}")

    asyncio.run_coroutine_threadsafe(send_message(), client.loop)
    return jsonify({"message": "تم إرسال اليوزرات في الخاص ✅"})

def run_discord_bot():
    client.run(TOKEN)

def run_flask():
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

threading.Thread(target=run_discord_bot).start()
run_flask()