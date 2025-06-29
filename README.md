
markdown
Copy
Edit
# 🚀 CvAlign: AI-Powered Resume Analyzer

CvAlign is an AI-driven recruitment platform that automates CV evaluation using a Retrieval-Augmented Generation (RAG) pipeline. Designed for recruiters, job seekers, and HR professionals, it processes 100+ CVs per second with 98% parsing accuracy and 85% alignment to human assessments.

## ✨ Features

- **Automated CV Parsing** – Extracts text from PDF/DOCX files with 98% accuracy.
- **RAG-Powered Evaluation** – Uses MiniLM embeddings + LangChain for semantic scoring.
- **Role-Based Workflows** – Dashboards for recruiters, job seekers, and admins.
- **Scalable Architecture** – FastAPI backend, React frontend, Cloudinary storage.
- **Secure Authentication** – OAuth2 with JWT & bcrypt for 99.9% security compliance.

## 🛠️ Tech Stack

- **Backend:** FastAPI, PyPDF2, python-docx, LangChain, HuggingFace, Pydantic, Passlib, PyJWT  
- **Frontend:** React, Axios, react-router-dom  
- **Storage:** Cloudinary (secure CV uploads)  
- **ML Model:** `sentence-transformers/all-MiniLM-L6-v2`  
- **Tools:** Python 3.8+, Node.js 16+, Git  

## ⚙️ Installation

### ✅ Prerequisites

- Python 3.8+
- Node.js 16+
- Git
- Cloudinary Account
- (Optional) HuggingFace API Token

### 🧩 Clone the Repository

```bash
git clone https://github.com/your-username/cv-align.git
cd cv-align
🔧 Backend Setup
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file in backend/:

ini
Copy
Edit
CLOUDINARY_URL=your_cloudinary_url
JWT_SECRET_KEY=your_secret_key
HUGGINGFACE_TOKEN=your_hf_token
💻 Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
▶️ Run the Application
Start Backend:

bash
Copy
Edit
cd backend
uvicorn main:app --reload
Start Frontend:

bash
Copy
Edit
cd ../frontend
npm start
Open in your browser: http://localhost:3000

👥 Usage
Job Seekers
Register and browse job listings

Upload CVs (PDF/DOCX)

Recruiters
Post jobs with skill and experience requirements

View CVs ranked with scores and feedback

Admins
Manage jobs, users, and CVs through a unified dashboard

📊 Evaluation Workflow
Parse CV content

Generate sentence embeddings

Compare with job description using cosine similarity

Return relevance score + actionable feedback (in < 1 second)

🤝 Contributing
Contributions are welcome! 🚀

bash
Copy
Edit
# Fork the repo and clone your fork
git checkout -b feature/your-feature
# Make your changes
git commit -m "Add your feature"
git push origin feature/your-feature
Then, open a Pull Request with a description of your changes.

📄 License
This project is licensed under the MIT License.

📬 Contact
Email: krish12252005@gmail.com

yaml
Copy
Edit

---

Let me know if you'd like me to generate a `.md` file you can directly add to your repo!







You said:
give me single file to copy paste


ChatGPT said:
Sure! Here's your complete README.md content in a single block—just copy and paste it directly into your file:

markdown
Copy
Edit
# 🚀 CvAlign: AI-Powered Resume Analyzer

CvAlign is an AI-driven recruitment platform that automates CV evaluation using a Retrieval-Augmented Generation (RAG) pipeline. Designed for recruiters, job seekers, and HR professionals, it processes 100+ CVs per second with 98% parsing accuracy and 85% alignment to human assessments.

## ✨ Features

- **Automated CV Parsing** – Extracts text from PDF/DOCX files with 98% accuracy.
- **RAG-Powered Evaluation** – Uses MiniLM embeddings + LangChain for semantic scoring.
- **Role-Based Workflows** – Dashboards for recruiters, job seekers, and admins.
- **Scalable Architecture** – FastAPI backend, React frontend, Cloudinary storage.
- **Secure Authentication** – OAuth2 with JWT & bcrypt for 99.9% security compliance.

## 🛠️ Tech Stack

- **Backend:** FastAPI, PyPDF2, python-docx, LangChain, HuggingFace, Pydantic, Passlib, PyJWT  
- **Frontend:** React, Axios, react-router-dom  
- **Storage:** Cloudinary (secure CV uploads)  
- **ML Model:** `sentence-transformers/all-MiniLM-L6-v2`  
- **Tools:** Python 3.8+, Node.js 16+, Git  

## ⚙️ Installation

### ✅ Prerequisites

- Python 3.8+
- Node.js 16+
- Git
- Cloudinary Account
- (Optional) HuggingFace API Token

### 🧩 Clone the Repository

```bash
git clone https://github.com/your-username/cv-align.git
cd cv-align
🔧 Backend Setup
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file in backend/:

ini
Copy
Edit
CLOUDINARY_URL=your_cloudinary_url
JWT_SECRET_KEY=your_secret_key
HUGGINGFACE_TOKEN=your_hf_token
💻 Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
▶️ Run the Application
Start Backend:

bash
Copy
Edit
cd backend
uvicorn main:app --reload
Start Frontend:

bash
Copy
Edit
cd ../frontend
npm start
Open in your browser: http://localhost:3000

👥 Usage
Job Seekers
Register and browse job listings

Upload CVs (PDF/DOCX)

Recruiters
Post jobs with skill and experience requirements

View CVs ranked with scores and feedback

Admins
Manage jobs, users, and CVs through a unified dashboard

📊 Evaluation Workflow
Parse CV content

Generate sentence embeddings

Compare with job description using cosine similarity

Return relevance score + actionable feedback (in < 1 second)

🤝 Contributing
Contributions are welcome! 🚀

bash
Copy
Edit
# Fork the repo and clone your fork
git checkout -b feature/your-feature
# Make your changes
git commit -m "Add your feature"
git push origin feature/your-feature
Then, open a Pull Request with a description of your changes.

📄 License
This project is licensed under the MIT License.

📬 Contact
Email: krish12252005@gmail.com

yaml
Copy
Edit


