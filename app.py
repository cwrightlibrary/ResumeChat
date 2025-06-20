from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

HF_TOKEN = os.getenv("HF_TOKEN") or "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"
API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

def query_model(prompt: str):
    payload = {
        "inputs": prompt,
        "parameters": {
            "temperature": 0.7,
            "max_new_tokens": 250,
            "return_full_text": False
        }
    }
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    response.raise_for_status()

    data = response.json()
    generated_texts = [item.get("generated_text", "") for item in data]
    with open("generated_text.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(generated_texts))

    return response.json()[0]["generated_text"]

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    error = None

    if request.method == "POST":
        
        job_title = request.form.get("job_title")
        experience = request.form.get("years_experience")
        skills = request.form.get("skills")

        if not all([job_title, experience, skills]):
            error = "Please fill in all fields."
        else:
            prompt = (
                f"Write a professional and concise resume summary for a {job_title} "
                f"with {experience} years of experience. Include specific achievements and "
                f"highlight the following skills: {skills}. "
                f"The tone should be confident and suitable for the top of a resume."
            )
            try:
                result = query_model(prompt)
            except Exception as e:
                error = str(e)
    
    return render_template("index.html", result=result, error=error)

if __name__ == "__main__":
    app.run(debug=True)