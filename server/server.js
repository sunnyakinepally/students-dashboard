const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs=require('fs')
const cors = require('cors'); // Import the cors middleware
const { Console } = require('console');
const { json } = require('express');
var mysql = require('mysql');
  
app.use(cors());

app.use(express.json()); // Enable JSON body parsing for checking req.body

// Serve static files (like data.json) from the 'server' directory
app.use(express.static(path.join(__dirname, 'server')));


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sunny#123",
  database:'sunnydb'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Define a route to get student data
app.get('/api/getStudentData', (req, res) => {
  try {
    // Read the JSON file
    const filePath = getstudents()
    // const jsonData = require(filePath);

    // Send the data as a JSON response
    // console.log('data reading',filePath)
   
    // res.json({ students: filePath });

      con.query("SELECT * FROM students", function (err, result, fields) {
        if (err) throw err;
        // console.log('result from db',result);
        res.json({students:result});
    
    });
  } catch (error) {
    console.error('Error reading data.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// put students data into data.json 

app.post('/api/putStudentsData', (req, res) => {
  try {
    console.log('Received request to add a student:', req.body);

    const filePath =putstudents();
    const jsonData = require(filePath);

    // // Generate a random ID (for simplicity, you might want to use a library like 'uuid')
    const randomId = Math.random().toString(36).substr(2, 9);

    const newStudent = {
      id: randomId,
      ...req.body, // Spread the properties correctly
    };

    // console.log('Adding new student:', newStudent);

    jsonData.students.push(newStudent);

    // Update the data.json file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    // console.log('Student added successfully');

    res.json({ message: 'Student added successfully', student: req.body });
  

    
    // inserting signup form values into SQL database 
    const newStudentdata = {
      id: randomId,
      name: req.body.name,
      mobile: req.body.mobile,
      password: req.body.password,
      amount:req.body.amount,
      grade:req.body.grade
    };
const sql='INSERT INTO students (id,name,mobile,password,amount,grade) VALUES(?,?,?,?,?,?)';
con.query(sql,[newStudentdata.id,newStudentdata.name,newStudentdata.mobile,newStudentdata.password,newStudentdata.amount,newStudentdata.grade],(err,result)=>{
  if (err) {
    console.error('Error inserting data into the database:', err);
    return;
  }
  console.log('Data inserted successfully:', result);

  // insert data done 

})

  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/deletestudent',(req,res)=>{
  try {
// console.log('deletestudent data',req.body)
const deleted=req.body
const filePath = putstudents()
const jsondata=require(filePath)

const filtered = jsondata.students.filter((value) => value.id == req.body.id);

// if(filtered.length>0){
  // const indextoremove=jsondata.students.findIndex((value)=>value.id==deleted.id);
//   if(indextoremove !==-1)
//   jsondata.students.splice(indextoremove,1)
// fs.writeFileSync(filePath, JSON.stringify(jsondata));
// console.log('removed selected from db',jsondata.students)


// }

con.query("SELECT * FROM students", function (err, result, fields) {
  if (err) throw err;
 
  const filteredid = result.filter((value) => value.id == req.body.id);
  if(filteredid.length>0){
    const indextoremove=result.findIndex((value)=>value.id==deleted.id);
  // console.log('removed',indextoremove)
  if(indextoremove !==-1){
    const deletedId = deleted.id;
  var sql = "DELETE FROM students WHERE id =?";
  con.query(sql, [deletedId], (err, result)=> {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });}
  }


});

}
  catch (error){
// Console.log('error')

  }
})

app.post('/api/profileupdate',(req,res)=>{
  try{
  console.log('recived to backend updated data',req.body)
  const updatedid=req.body.id
  const updatedname=req.body.name
  const updatedpassword=req.body.password
  const updatedmobie=req.body.mobile
  const updatedamount=req.body.amount
  const updatedgrade=req.body.grade
  var sql="UPDATE students set name=?,password=?,mobile=?,amount=?,grade=? where id=? "
  con.query(sql,[updatedname,updatedpassword,updatedmobie,updatedamount,updatedgrade,updatedid],(err,result)=>{
    if(err) throw err;
    console.log('updated row',result.affectedRows)
  })
  }
  catch (error){
    console.log(error)

  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getstudents(){
  const dbraw=fs.readFileSync('./data.json');
  const studentsdata = JSON.parse(dbraw).students
  return studentsdata;
}

function putstudents(){
  const filePath = './data.json';  // Modify this path based on your project structure

  // Check if the file exists, and if not, create it with an initial structure
  if (!fs.existsSync(filePath)) {
    const initialData = { students: [] };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }

  return filePath;
}