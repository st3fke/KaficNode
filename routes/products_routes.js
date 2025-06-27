const express = require("express");

const router = express.Router();
const connection = require("../control/config");

const User = require("../models/User");
const Testimonial = require("../models/Testimonial");
User.setConnection(connection);
Testimonial.setConnection(connection);

router.get("/", (req,res)=>{
    res.render("index", {title: "Home", active1: "active", active2: "", active3: ""});
})
router.get("/contact", (req,res)=>{
    res.render("contact", {title: "Contact", active1: "", active2: "", active3: "active"});
})

router.post("/contact", (req,res) => {
    const { firstname, lastname, email, title, message } = req.body;
    let user = new User(firstname, lastname, email, title, message);
    user.save().then((res) =>
    {
        res.redirect("/contact");
    }).catch((err) => 
    {
        console.log(err);
    });
})
router.get("/products", (req,res)=>{
    res.render("products", {title: "Products", active1: "", active2: "active", active3: ""});
})
router.get("/categories", (req,res) => {
    let sql = 'select * from categories';
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.send(result);
    });
})
router.get("/categories/data", (req,res) => {
    let sql = 'SELECT COUNT(products.product_id) as number FROM categories JOIN products ON categories.category_id = products.category_id GROUP BY categories.category_id';
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.send(result);
    });
})

router.get("/testimonials", (req,res) => {
    let sql = 'SELECT * FROM testimonials ORDER BY RAND() LIMIT 3';
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.send(result);
    });
})

router.post("/testimonials", (req,res) => {
    const { name, email, message } = req.body;
    let testimonial = new Testimonial(name, email, message);
    testimonial.save().then((result) =>
    {
        res.redirect("/contact");
    }).catch((err) => 
    {
        console.log(err);
    });
})

router.get("/products/get", (req, res) => {
    const { q, ord, cat } = req.query;

    let sql = `SELECT * FROM products WHERE 1=1`;
    
    if (q) {
        sql += ` AND (name LIKE ? OR description LIKE ?)`;
    }

    if (cat !== '%') {
        sql += ` AND category_id IN (SELECT category_id FROM categories WHERE name LIKE ?)`;
    }

    sql += ` ORDER BY price ${ord}`;

    const params = [];
    if (q) {
        params.push(`%${q}%`, `%${q}%`);
    }
    if (cat !== '%') {
        params.push(cat);
    }

    connection.query(sql, params, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
router.get("/products/featured", (req,res) =>
{
    let sql = "SELECT * FROM products ORDER BY RAND() LIMIT 3"
    connection.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result);
        
      });
})

router.get('/products/search', (req, res) => {
    const { q, ord = 'asc', cat = '%' } = req.query;

    let sql = "SELECT * FROM products WHERE (name LIKE ? OR description LIKE ?)";
    const params = [`%${q}%`, `%${q}%`];

    if (cat !== '%') {
        sql += " AND category_id IN (SELECT category_id FROM categories WHERE name LIKE ?)";
        params.push(cat);
    }

    sql += ` ORDER BY price ${ord}`;

    connection.query(sql, params, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
router.get('/products/suggestions', (req, res) => {
    const { q, cat } = req.query;

    let sql = `SELECT name FROM products WHERE name LIKE ?`;
    const params = [`%${q}%`];

    if (cat !== '%') {
        sql += ` AND category_id IN (SELECT category_id FROM categories WHERE name LIKE ?)`;
        params.push(cat);
    }

    sql += ` LIMIT 10`;

    connection.query(sql, params, (error, results) => {
        if (error) throw error;
        res.json(results.map(row => row.name));
    });
});
router.get('/news', (req, res) => {
    const sql = 'SELECT * FROM news ORDER BY created_at DESC';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;