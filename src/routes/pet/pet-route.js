const express = require('express');
const router = express.Router();
const Pet = require('../../models/pet/pet');

const getPets = (req, res, next)=>{
  const limit = 5;

  const query = {
    'name': {
      '$regex': req.query.name || ''
    }
  };

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

const postPets = (req, res, next)=>{
  console.log(req.body);
  const pet = new Pet(req.body);
  pet.save(()=>{
    res.json({message: 'Sucesso!'});
  });
}

router
  .get('/', getPets)
  .post('/', postPets);



module.exports = router;