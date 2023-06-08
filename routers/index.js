var express = require("express");
var router = express.Router();
const conn = require("./connect");

router.get("/users",  (req, res) => {
    let sql = "SELECT * FROM tb_user";
    let params = [];
    if(req.params.id !== undefined){
        sql += " WHERE id = ?";
        params.push(req.params.id);
    }
    sql += ' ORDER BY id DESC'
    conn.query(sql, params ,(err, result) => {
      if (err) throw err;
      return res.status(200).send(result)
    });
});




router.post("/addUser",  (req, res) => {
    let sql = "INSERT INTO tb_user SET ?";
    let params = req.body;
    if(!req.body['name'] || !req.body['surname']
    || !req.body['phone'] || !req.body['email']
    || !req.body['age']  || !req.body['address'] ){
        return res.status(400).send('Please Provide all data');
    }else{
        conn.query(sql, params, (err, result) => {
            if (err) throw err;
             res.status(200).send({result: result})
          });
    }
});

router.put('/updateUser' , (req, res) => {
    let sql = "UPDATE tb_user SET name = ? , surname = ? , phone= ? ,email =? ,age = ?, status = ?, address= ? WHERE id = ?"
    let params = [
        req.body['id'],
        req.body["name"],
        req.body["surname"],
        req.body["phone"],
        req.body["email"],
        req.body["age"],
        req.body["address"],
        req.body["status"],
      ];
      if(!req.body['id'] || !req.body['name'] || !req.body['surname']
      || !req.body['phone'] || !req.body['email']
      || !req.body['age']  || !req.body['address'] ){
          return res.status(404).send('Please Provide all data');
      }else {
        conn.query(sql, params, (err, result) => {
            if (err) throw err;
            res.status(200).send({result: result});
        });
      }
});


router.get('/deleteUser' , (req, res) => {
    let sql  = 'DELETE FROM tb_user WHERE id = ?';
    let params = req.body.id;
    if(!params){
        return res.status(404).send("please select user")
    }else{
        conn.query(sql, params, (err, result) => {
            if (err) throw err;
            res.status(200).send({result: result});
        });
    }
})

module.exports = router;