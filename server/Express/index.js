import express from 'express'
import users from './Routes/users.routes.js'
import cors from 'cors'
const app = express()
app.use(express.json)
app.use(
    cors({
      origin: ["http://localhost:5173"], // Replace with your frontend URL
      credentials: true, // Allow cookies to be sent
    }),
  );
  app.use(express.urlencoded({ extended: true }));
  app.get("/", (request, response) => {
    response.send("<h1>vsd by joseph and victory..</h1>");
  });

app.use ("/api/users", users)
app.listen( process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
    
})