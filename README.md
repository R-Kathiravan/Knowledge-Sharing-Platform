🔧 Configuration Instructions
🖥️ Backend (.NET Core)
Navigate to the backend folder:
 
cd Backend
Add your DB connection in appsettings.json:
 
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=ksp_db;user=root;password=yourpassword;"
}
Run the Web API:
 
dotnet restore
dotnet run
Backend runs at: http://localhost:5000

🌐 Frontend (Angular)
Navigate to the frontend folder:
 
cd Frontend/ksp
Install dependencies:
 
npm install
Create Forlder auth-config.ts, copy the code from auth-config.sample.ts and paste it and update your Google OAuth Client ID 
src/app/auth-config.ts
Serve the frontend:
ng serve
Frontend runs at: http://localhost:4200

🗃️ Database (MySQL)
Create the database:
 
CREATE DATABASE ksp_db;
Import provided SQL scripts in database  folder
CREATE DATABASE ksp_db;Import provided SQL scripts
