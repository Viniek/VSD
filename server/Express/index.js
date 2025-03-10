import express from 'express'
import users from './Routes/users.routes.js'
import cors from 'cors'
import cookieParser from "cookie-parser"; 
import auth from './Middlewares/Auth.js'
import history from "./Routes/History.routes.js"
import appointment from "./Routes/appointment.routes.js"

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Ensure this matches your frontend URL
    credentials: true, // ✅ Allow cookies
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // ✅ Ensure PATCH is allowed
  })
);


  app.use(express.urlencoded({ extended: true }));
  app.get("/", (request, response) => {
    response.send("<h1>vsd by joseph and victory..</h1>");
  });

app.use ("/api/users", users)
app.use("/api/history",auth,history)
app.use("/api/appointment",auth,appointment)

app.listen( process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
    
})