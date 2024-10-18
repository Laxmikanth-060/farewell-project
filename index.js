const express=require("express");
const mongoose=require("mongoose");

const app=express();
const path=require("path");
const { emit } = require("process");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(8008,()=>{
    console.log("port working successfully");
});

app.get("/home", async (req,res)=>{
    let i=" ",stud_in=0,stud_out=0;

    let stud_total=await student.find({}).countDocuments();
    stud_in=await student.find({status:"IN"}).countDocuments();
    stud_out=await student.find({status:"OUT"}).countDocuments();

    res.render("index.ejs",{i,stud_in,stud_out,stud_total});
});

app.get("/home/id",async (req,res)=>{
    let {id}=req.query;
    console.log(id);

    let i= await student.findOne({id:id});
    if(i==null){
        i=" ";

       let stud_in=await student.find({status:"IN"}).countDocuments();
       let stud_out=await student.find({status:"OUT"}).countDocuments();
       let stud_total=await student.find({}).countDocuments();

        res.render("index.ejs",{i,stud_in,stud_out,stud_total});
    }else{

        let stud_total=await student.find({}).countDocuments();
        let stud_in=await student.find({status:"IN"}).countDocuments();
        let stud_out=await student.find({status:"OUT"}).countDocuments();
     
    res.render("index.ejs",{i,stud_in,stud_out,stud_total});  }
});

app.get("/home/student",async (req,res)=>{

    let {studentid}=req.query;
    let i= await student.findOne({studentid:studentid});

    if(i==null){
        i=" ";

    let stud_total=await student.find({}).countDocuments();
    let stud_in=await student.find({status:"IN"}).countDocuments();
    let stud_out=await student.find({status:"OUT"}).countDocuments();

        res.render("index.ejs",{i,stud_in,stud_out,stud_total});
    }
    else{
    
   let stud_total=await student.find({}).countDocuments();
   let stud_in=await student.find({status:"IN"}).countDocuments();
   let stud_out=await student.find({status:"OUT"}).countDocuments();

    res.render("index.ejs",{i,stud_in,stud_out,stud_total});  }
});

app.get("/home/update",async (req,res)=>{ 

    let a=new Date().toString().split(" ")[4];
    // let b=new Date().toString().split(" ").slice(0,4).join(" ");
     let {status,id}=req.query;
    let i=" ";
    //if error untey if statement thiseyyu bey
    if(id){
        await student.updateOne({_id:id},{$set:{status:status,intime:a}});
        i= await student.findOne({_id:id});
    }

     let stud_total=await student.find({}).countDocuments();
     let stud_in=await student.find({status:"IN"}).countDocuments();
     let stud_out=await student.find({status:"OUT"}).countDocuments();  

     res.render("index.ejs",{i,stud_in,stud_out,stud_total});
})

mongoose.connect("mongodb://127.0.0.1:27017/farewell");

const schema= new mongoose.Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    studentid:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },
    // transactionid:{
    //     type:String,
    //     require:true,
    // },
    // phoneno:{
    //     type:Number,
    //     // required:true,
    //     minLength:10,
    //     maxLength:10,
    // },
    intime:{
        type:String,
    },
    status:{
        type:String,
    }

    
});

app.post("/home/database",async (req,res)=>{

    let data=await student.find({});
    let count=await student.find({}).countDocuments();
     
    res.render("database.ejs",{data,count});
})

let student=new mongoose.model("student",schema);


const fs = require('fs');

const filePath = '/home/hp/Farewell/data.json';

fs.readFile(filePath, 'utf8', async(err, jdata) => {
  if (err) {
    console.error('There was a problem reading the file:', err);
    return;
  }
  
  try {
    const data = JSON.parse(jdata);
    // console.log(jsonData);
    let num=Math.ceil((Math.random()+19)*1000);
 for(let i=0;i<data.length;i++){
    let s = new student({
     
        id:data[i].code,
        name:data[i].Name,
        studentid:data[i].ID,
        email:data[i].Recipient,
      //transactionid:data[i].transaction_id,
        //  phoneno:data[i].Phone Number,
        status:"OUT",
    });
//     await s.save();
//    console.log(data[i].id);
}

  } catch (parseError) {
    console.error('There was a problem parsing the JSON:', parseError);
  }
});





app.post("/home/database/filter",async (req,res)=>{
    let {status}=req.body;
    let data=null;
    console.log(status);
    if(status==="temp"){

          data=await student.find({ });
          count=await student.find({}).countDocuments();
    }else{

     data=await student.find({status:status}); 
     count=await student.find({status:status}).countDocuments(); 
    
    }
    
    res.render("database.ejs",{data,count});    
})

app.get("/home/database/update",async (req,res)=>{
    let a=new Date().toString().split(" ")[4];
    // let b=new Date().toString().split(" ").slice(0,4).join(" ");
     let {status,id}=req.query;
     await student.updateOne({_id:id},{$set:{status:status,intime:a}});
     data=await student.find({ });
     count=await student.find({}).countDocuments();
     res.render("database.ejs",{data,count});

})












// fetch('https://script.googleusercontent.com/macros/echo?user_content_key=DnPGHl3RumymQ_3xeWnWAIyfyvYhv5Cc7PZqeuvZIeIfeYvhGZwPQDzPqCYwp0VbfWRc3yMmxBttqWqK7khbu_7D7s-9IeDym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO4817o3EX_P6juQGS8etG08PyIozrLcRxAcxmt3vBq8hsf5i_LhECmcAqDMCA82nLmy6XEl_Vs-en-Jq7-0GYCX7jI00l0Hitz9Jw9Md8uu&lib=Mr_lNlU7ZJfWvyOlLcvgUc2gRAjJP1Rz5')
// //   .then(response => {
   
// //     return response.json();
// //   })
//   .then(data => {
    
//     console.log(data);
//   })
   
//   .catch(error => {
    
//     console.error('Error:', error);
//   });

// let url="https://script.googleusercontent.com/macros/echo?user_content_key=DnPGHl3RumymQ_3xeWnWAIyfyvYhv5Cc7PZqeuvZIeIfeYvhGZwPQDzPqCYwp0VbfWRc3yMmxBttqWqK7khbu_7D7s-9IeDym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO4817o3EX_P6juQGS8etG08PyIozrLcRxAcxmt3vBq8hsf5i_LhECmcAqDMCA82nLmy6XEl_Vs-en-Jq7-0GYCX7jI00l0Hitz9Jw9Md8uu&lib=Mr_lNlU7ZJfWvyOlLcvgUc2gRAjJP1Rz5";
//  getdata();
// async function getdata(){
//     try{
      
//         let res= await axios.get(url);
//         console.log(res);

//     }catch(e){
//         console.log("erro:",e);
//     }
// }

// const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=-URsLpKTO_Q1sekDBEh_F7qsH4_12EBFAfa-yb6P1bl62Q3CC07j_cB-0mnH85M0L1oo9mL5k04wAVAYK6MkYgofk5bPwKrjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA1Df9JCJ5bTtN2HOpyh0ZaaKdlNf7BrYEO62UhMf-1OEHafPESLwMamp9BwitHzq4IP3AbB_5PwNYw-nBag92Vk_p6iAgB5l9z9Jw9Md8uu&lib=Mr_lNlU7ZJfWvyOlLcvgUc2gRAjJP1Rz5';

// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//     // Work with the JSON data here
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });

// fetch("file:///home/laxmikantha/Farewell/data.json").then(res=>
//      res.json()
// ).then(data =>
//     console.log(data)
// )
// .catch((err)=>{
//     console.log(err);
// })






