function checkAuth(req, res, next){
    const authorization = req.headers.authorization;
    console.log(authorization);
    if(!authorization){
        return res.status(401).send({ error: "Unauthorized access " });
    }

    const token = authorization.split(" ")[1];
    try{
        const {_id} = jwt.verify({}) 
    }
}

export default checkAuth;
