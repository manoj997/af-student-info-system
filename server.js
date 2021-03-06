const port=process.env.PORT || 5000;
const Bundler=require('parcel-bundler');
const express=require('express');
const app =express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const courseRouter=require('./routes/Course/courseRoutes');
const studentRouter=require('./routes/Student/StudentRoute');
const moduleRouter=require('./routes/Course/moduleRoutes');
const adminRouter=require('./routes/Admin/AdminRoute');
const instructorRouter=require('./routes/Instructor/InstructorRoute');
const examRouter=require('./routes/Instructor/ExamRoute');
const assignmentRouters=require('./routes/Course/assignmentRoute');
const bundler=new Bundler('./public/index.html',{});
let db;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.all((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
// });
//
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });


app.use('/assignments/file',express.static('uploads/assignment'));
app.use(express.json());
app.use('/api/courses',courseRouter);
app.use('/api/students',studentRouter);
app.use('/api/modules',moduleRouter);
app.use('/api/admins',adminRouter);
app.use('/api/instructors',instructorRouter);
app.use('/api/exams',examRouter);
app.use('/api/assignments', assignmentRouters);

app.use(bundler.middleware());
app.use(express.static('./dist'));

//db connection
mongoose.connect("mongodb+srv://polroti:polroti123@sis-cluster-to2kk.azure.mongodb.net/student-info-system",{
    useNewUrlParser:true
}).then(() =>{
    console.log("Connected to MongoDB Cloud");
    db="Connected to MongoDB Cloud";
}).catch(()=>{
    console.log('Connection to MongoDB Cloud Failed');
    db="Cannot connect to MongoDB Cloud";
});
//test


app.get('/', function(req,res){
    // res.send('<h1>Hello Manoj Kumar!</h1> '+db);
    res.sendFile('./dist/index.html');
});

app.listen(port,()=>{
    console.log('Server is running on port: ' + port);
});

