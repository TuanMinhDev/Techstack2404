import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//Xác thực
export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Chưa xác thực" });
  }
};

//Phân quyền là admin
export const verifyTokenIsAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{ 
        if(req.user.role == 'admin') {
            next();
        }
        else {
            res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }
    })
};

//Phân quyền là user
export const verifyTokenIsUser = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.role == 'user') {
            next();
        }
        else {
            res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }
    })
};

//userId
export const authenticateToken = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token không có hoặc không hợp lệ" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }
    req.userId = decoded.id; 
    next();
  });
};
