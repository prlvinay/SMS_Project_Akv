module.exports=(error,req,res,next)=>{
  if (res.headersSent) {
    return next(error); 
}
  error.statusCode=error.statusCode||500;
  error.status=error.status||'error';
  res.status(error.statusCode).json({
      status:error.statusCode,message:error.message
  });
}