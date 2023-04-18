var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
const secretKey = "thisismysecreckey"
app.get("/",(req,res)=>
{
    res.json({
        message:"A Sample Message"
    })
}
)

app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"raj",
        email:"raj@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
             if(err)
             {
                res.json({err})
             }
             else
             {
                res.json({token});
             }
    })
})

app.get("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err)
        {
            res.send({result:"please addd a valid token"})
        }
        else 
        {
            res.json({
                message:"The profile has been accessed",
                authData

            })
        }
    })
})
function verifyToken(req,res,next)
{
     let bearerHeader = req.headers['authorization'];
     if(bearerHeader!=='undefined')
     {
        const bearer=bearerHeader.split(":");
        const token= bearer[1];
        req.token = token;
        next();
     }
     else 
     {
         res.json({
            result:"There is not any token add...please add it.."
         })
     }

}
app.listen(4501,()=>
{
    console.log("The server is running at:"+4501);
})
