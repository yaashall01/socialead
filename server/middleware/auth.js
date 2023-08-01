import jwt from 'jsonwebtoken';


/*export const verifyToken = function (req, res, next) {
    // get token from header
    const token = req.header('Wahasaaan');
    
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(403).json({ msg: 'Token is not valid' });
    }
};*/



export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};