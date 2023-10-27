'use strict';

const countryData = require('../data/events');
const jwt = require('jsonwebtoken');
const secretKey = 'ndp4221';

const getAllCountries = async (req, res, next) => {
    try {

        const countrylist = await countryData.getCountries();
        res.send(countrylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStates = async (req,res,next) => {

    try {

        const list = await countryData.getStates();
        res.send(list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCountry = async (req, res, next) => {
    try {
        const cId = req.params.id;
        const event = await countryData.getById(cId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addCountry = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await countryData.createCountry(data);
        //res.send(insert);
        res.send("Country added successfully")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCountry = async (req, res, next) => {
    try {
        const cId =  req.params.id;
        const data = req.body;
        const updated = await countryData.updateCountry(cId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCountry = async (req, res, next) => {
    try {
        const cId = req.params.id;
        const deletedcountry = await countryData.deleteCountry(cId);
        res.send("Country deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const users = [
    { username: 'chirag.sutariya@spec-india.com', password: '123456' },
    
  ];

const Login = (req, res, next) => {
        
        const { username, password } = req.body;
  
        // Check if username and password are valid (you should use a database here)
        const user = users.find((u) => u.username === username && u.password === password);

      
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      
        // Generate and send a JWT token
        const token = jwt.sign({ users }, secretKey, { expiresIn: '10h' });
        res.json({ token });
    }


    function verifyToken(req, res, next) {
        const token = req.headers['authorization'];
      
        if (!token) {
          return res.status(403).json({ message: 'Token not provided' });
        }
      
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          }
      
          req.userId = decoded.userId;
          next();
        });
      }
   

module.exports = {
    getAllCountries,
    getCountry,
    addCountry,
    updateCountry,
    deleteCountry,
    Login,
    verifyToken,
    getAllStates
}