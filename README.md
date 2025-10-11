# 🚀 Ciso-Assistent

A full-stack project with modern frontend and powerful Django backend.  
Follow the steps below to set up and run the project locally.  

---

## 📦 Frontend Setup  

```sh
# 1️⃣ Clone the repository using the project's Git URL.
git clone https://github.com/KrishSuthar17/Ciso-Assistent.git

# 2️⃣ Navigate to the project directory.
cd risk-steward

# 3️⃣ Install the necessary dependencies.
npm install

# 4️⃣ Start the development server with auto-reloading and instant preview.
npm run dev


## ⚙️ Backend Setup

# 1️⃣ Navigate to the backend directory.
cd backend

# 2️⃣ Install the required Python packages.
pip install -r requirements.txt

# 3️⃣ Apply database migrations.
python manage.py makemigrations
python manage.py migrate

# 4️⃣ Run the development server.
python manage.py runserver
```


🛠️ Technologies Used

🔹 Frontend

⚡ Vite

🟦 TypeScript

⚛️ React

🎨 shadcn/ui

💨 Tailwind CSS


🔹 Backend

🐍 Python 3.10+

🌐 Django

🔗 Django REST Framework

🗄️ Database: SQLite (default) 


✅ Requirements

Node.js: v18+

Python: v3.10+


npm: v9+











## starter comand  
    docker exec -it postgres_db psql -U postgres -d postgres

\l             -- list databases
\c postgres    -- connect to a database
\dt            -- list tables
SELECT * FROM core_perimeter;  -- check data
\q             -- quit psql


2️⃣ Disconnect / exit psql

Inside psql prompt, type:

\q

3️⃣ Stop / disconnect the Docker container (when you’re done)

If you want to stop the PostgreSQL container completely:

docker stop postgres_db


Container stops but data persists because Docker keeps the volume.

You can start it again later with:

docker start postgres_db

4️⃣ One-line connect & disconnect combo

Connect:

docker exec -it postgres_db psql -U postgres -d postgres


Disconnect (exit psql):

\q


Stop container when done:

docker stop postgres_db


Start container again:

docker start postgres_db