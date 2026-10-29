const express = require("express");

const cors = require('cors');
// crooss origin resource sharing to give permision to fronend to sen dreq to backend 

const path = require("path");
const profileRoutes = require("./routes/profileRoutes.js");

const authRoutes = require("./routes/authRoutes.js");

const jobsRoutes = require("./routes/jobsRoutes.js");

const resumeRoutes = require("./routes/resumeRoutes.js");

const roadRoutes = require("./routes/roadRoutes.js")

const interviewRoutes = require("./routes/interviewRoutes.js");

const savedJobRoutes = require("./routes/savedJobRoutes.js")

const app =express();

app.use(express.json())

app.use(cors());


// path of login and register

app.use("/api/auth",authRoutes);


//  path of api of jobs getting

app.use("/api/job",jobsRoutes);

// path for api/resume/uploads

app.use("/api/resume", resumeRoutes);

// path for api/road/


// Existing app.use(express.json()) aur app.use(cors()) ko rehne do.

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/profile", profileRoutes);


app.use('/api/roadmap',roadRoutes)

// path for coach interview 

app.use("/api/interview", interviewRoutes);

// api for appliaction

app.use("/api/saved-jobs", savedJobRoutes);

app.get("/",(req,res)=>{
    res.send("ai career is running on here")
})

module.exports=app