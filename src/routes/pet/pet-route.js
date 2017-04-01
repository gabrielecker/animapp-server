const express = require('express');
const router = express.Router();
const Pet = require('../../models/pet/pet');

const getPets = (req, res)=>{
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

  if(req.query.castrated){
    query.castrated = true;
  }

  if(req.query.dewormed){
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
          res.send(err);
        }

        const pagination = [];
        const pages = Math.ceil(count/limit);

        for(let page = 1; page <= pages; page++){
          pagination.push(page);
        }

        res.json({pets, pagination});
      });
  });
}

const postPets = (req, res)=>{
  const pet = new Pet(req.body);
  pet.save(()=>{
    res.json({message: 'Sucesso!', id: pet._id});
  });
}

const getPet = (req, res)=>{
  Pet.findById(req.params.id).then((err,pet)=>{
    if(err){
      res.json(err);
    }
      res.json(pet);
  });
}

router
  .get('/', getPets)
  .post('/', postPets)

  .get('/:id', getPet);



module.exports = router;