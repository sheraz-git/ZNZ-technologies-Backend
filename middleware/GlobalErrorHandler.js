const GlobalErrorHandler=(err,req,res,next)=>{
    //status 
    //message
    //stack 
    //status Code
    const stack=err.stack;
    const message=err.message;
    const status= err.status ? err.status : "failed" 
    const statusCode= err.statusCode ? err.statusCode  : 500
    res.status(statusCode).json({
    status,
    message,
    stack
    })
    }
    module.exports=GlobalErrorHandler;