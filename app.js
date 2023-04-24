const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json());

var business1 = JSON.parse(
  `{
  "name":"Joeys Eatery",
  "address":"1234 oak st",
  "city":"New York",
  "state":"New York",
  "zipcode":"12345",
  "phonenumber":"1231231234",
  "category":"restaurant",
  "subcategory":"bbq"
  }`
)
var business2 = JSON.parse(
  `{
  "name":"Billys Eatery",
  "address":"2234 maple st",
  "city":"Portland",
  "state":"Oregon",
  "zipcode":"22345",
  "phonenumber":"2231231234",
  "category":"restaurant",
  "subcategory":"pizza"
  }`
)
var business3 = JSON.parse(
  `{
  "name":"Daveys Eatery",
  "address":"3234 pine st",
  "city":"Nashville",
  "state":"Tennessee",
  "zipcode":"32345",
  "phonenumber":"3231231234",
  "category":"restaurant",
  "subcategory":"italian"
  }`
)
var business4 = JSON.parse(
  `{
  "name":" Sammys Eatery",
  "address":"4234 fir st",
  "city":"Austin",
  "state":"Texas",
  "zipcode":"42345",
  "phonenumber":"4231231234",
  "category":"restaurant",
  "subcategory":"cafe"
  }`
)
var businesses = [business1, business2, business3, business4]

function isValidBusiness(id) {
  return id < businesses.length
}

function isValidReview(id) {
  return true
}

function isValidPhoto(id) {
  return true
}

app.post('/businesses', (req, res) => {
  if (req.body && req.body.name && req.body.address && req.body.city && req.body.state && req.body.zipcode && req.body.phonenumber && req.body.category && req.body.subcategory) {
    res.status(201).end()
  } else {
    res.status(400).json({
      err: "Request needs a JSON body with the following fields: name, address, city, state, zipcode, phonenumber, category, subcategory"
    })
  }
})

app.put('/businesses/:businessID', function(req, res, next) {
  var businessID = parseInt(req.params.businessID)
  if (isValidBusiness(businessID)) {
    if (req.body && req.body.name && req.body.address && req.body.city && req.body.state && req.body.zipcode && req.body.phonenumber && req.body.category && req.body.subcategory) {
      res.status(200).end()
    } else {
      res.status(400).json({
        err: "Request needs a JSON body with the following fields: name, address, city, state, zipcode, phonenumber, category, subcategory"
      })
    }
  } else {
    next()
  }
})

app.delete('/businesses/:businessID', function(req, res, next) {
  var businessID = parseInt(req.params.businessID)
  if (isValidBusiness(businessID)) {
    res.status(204).end()
  } else {
    next()
  }
})

app.get('/businesses', function(req, res ){
  var page = parseInt(req.query.page) || 1;
  var numPerPage = 2;
  var lastPage = Math.ceil(businesses.length / numPerPage);
  page = page < 1 ? 1 : page;
  page = page > lastPage ? lastPage : page;
  var start = (page - 1) * numPerPage;
  var end = start + numPerPage;
  var pageBuisnesses = businesses.slice(start, end);
  var links = {};
  if (page < lastPage) {
      links.nextPage = '/businesses?page=' + (page + 1);
      links.lastPage = '/businesses?page=' + lastPage;
  }
  if (page > 1) {
      links.prevPage = '/businesses?page=' + (page - 1);
      links.firstPage = '/businesses?page=1';
  }
  res.status(200).json({
    pageNumber: page,
    totalPages: lastPage,
    pageSize: numPerPage,
    totalCount: businesses.length,
    businesses: pageBuisnesses,
    links: links
  });
})

app.get('/businesses/:businessID', function(req, res, next){
  var businessID = parseInt(req.params.businessID)
  if (isValidBusiness(businessID)) {
    res.status(200).json(businesses[businessID])
  } else {
    next()
  }
})

app.post('/reviews', (req, res) => {
  if (req.body && req.body.stars && req.body.cost) {
    res.status(201).end()
  } else {
    res.status(400).json({
      err: "Request needs a JSON body with the following fields: stars, cost"
    })
  }
})

app.put('/reviews/:reviewID', function(req, res, next) {
  var reviewID = parseInt(req.params.reviewID)
  if (isValidReview(reviewID)) {
    if (req.body && req.body.stars && req.body.cost) {
      res.status(200).end()
    } else {
      res.status(400).json({
        err: "Request needs a JSON body with the following fields: stars, cost"
      })
    }
  } else {
    next()
  }
})

app.delete('/reviews/:reviewID', function(req, res, next) {
  var reviewID = parseInt(req.params.reviewID)
  if (isValidReview(reviewID)) {
    res.status(204).end()
  } else {
    next()
  }
})

app.post('/photos', (req, res) => {
  if (req.body && req.body.link && req.body.caption) {
    res.status(201).end()
  } else {
    res.status(400).json({
      err: "Request needs a JSON body with the following fields: link, caption"
    })
  }
})

app.put('/photos/:photoID', function(req, res, next) {
  var photoID = parseInt(req.params.photoID)
  if (isValidPhoto(photoID)) {
    if (req.body && req.body.link && req.body.caption) {
      res.status(200).end()
    } else {
      res.status(400).json({
        err: "Request needs a JSON body with the following fields: link, caption"
      })
    }
  } else {
    next()
  }
})

app.delete('/photos/:photoID', function(req, res, next) {
  var photoID = parseInt(req.params.photoID)
  if (isValidPhoto(photoID)) {
    res.status(204).end()
  } else {
    next()
  }
})

app.use('*', function (req, res) {
  res.status(404).send({
      err: "The requested resource doesn't exist"
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})