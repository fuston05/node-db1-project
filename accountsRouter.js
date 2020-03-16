const express= require('express');

const router= express.Router();

const db = require("./data/dbConfig");

//get all accounts
router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then( accounts => {
      res.status(200).json({Data: accounts})
    } )
    .catch(error => {
      res.status(500).json({error: 'There was a server error'})
    })
})//end router.get

//get account by ID
router.get('/:id', (req, res) => {
  db('accounts').where({id: req.params.id})
    .then( account => {
      if( account.length > 0 ){
        res.status(200).json({Data: account})
      }else{
        res.status(404).json({error: 'Id not found'})
      }
    } )
    .catch(error => {
      res.status(500).json({error: 'There was a server error'})
    })
})//end router.get

//add a new accout.. returns id of new account
router.post('/', (req, res) => {
  db('accounts').insert(req.body, 'id')
    .then( ids => {
      res.status(201).json({results: ids})
    } )
    .catch(error => {
      res.status(500).json({error: 'There was a server error'})
    })
})//end router.post

//update account by ID
router.put('/:id', (req, res) => {
  db('accounts').where({id: req.params.id})
    .update(req.body)
    .then( result => {
      res.status(200).json({message: 'Account successfully updated'})
    } )
    .catch(error => {
      res.status(500).json({error: 'There was a server error'})
    })
})//end router.put

//delete an account.. returns a count of records deleted
router.delete('/:id', (req, res) => {
  db('accounts').where({id: req.params.id})
  .del()
  .then( count => {
    if( count > 0 ){
      res.status(200).json({message: 'Account successfully deleted'})
    }else{
      res.status(404).json({error: 'Account not found'})
    }
  } )
  .catch(error => {
    res.status(500).json({error: 'There was a server error'})
  })
})//end router.delete

module.exports= router;