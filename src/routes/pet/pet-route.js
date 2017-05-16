const express = require('express');
const router = express.Router();
const Pet = require('../../models/pet/pet');
const authMiddleWare = require('../../middleware/auth-middleware');

const { authenticate } = authMiddleWare;

router.get('/',(req, res)=>{
  const limit = 5;

  const query = {
    'name': {
      '$regex': req.query.name || ''
    },
    'type': {
      '$regex': req.query.type || ''
    },
    'size':{
      '$regex': req.query.size || ''
    },
    'sex':{
      '$regex': req.query.sex || ''
    }
  };

  if(req.query.castrated === "true"){
    query.castrated = true;
  }

  if(req.query.dewormed === "true"){
    query.dewormed = true;
  }

  Pet.count(query).then(count =>{
    const skip = Number(req.query.skip);
    Pet.find(query)
      .limit(limit)
      .skip(skip > 0 ? skip : 0)
      .sort('--createdOn')
      .exec((err, pets)=>{
        if(err){
          return res.json(err.message);
        }

        const pagination = [];
        const pages = Math.ceil(count/limit);

        for(let page = 1; page <= pages; page++){
          pagination.push(page);
        }

        res.json({pets, pagination});
      });
  });
});

router.post('/',authenticate, (req, res)=>{
  const pet = new Pet(req.body);
  pet.save(()=>{
    res.json({message: 'Sucesso!', id: pet._id});
  });
});

router.get('/:id',(req, res)=>{
  Pet.findById(req.params.id).then((err,pet)=>{
    if(err){
      return res.json(err);
    }
      res.json(pet);
  });
});


module.exports = router;