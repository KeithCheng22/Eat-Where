const express = require('express')
var cors = require('cors')
require('dotenv').config()

app = express()
app.use(cors())
app.use(express.json());

const port = 3000

app.post('/getRecco', async (req, res) => {
  const formData = req.body
  const {location, currentLocation: {latitude, longitude}, category, radius} = formData

  const yelp = require('yelp-fusion');
  const client = yelp.client(process.env.YELP_KEY);

  const options = {
      location: `Singapore, ${location}`,
      latitude, 
      longitude,
      radius: radius * 1000,
      categories: [`${category}`], 
      locale: 'en_SG'
  }

  client.search(options)
  .then(response => {
    res.json(response.jsonBody.businesses)
  }).catch(e => {
    console.log(e);
  });
})


app.listen(port, () => {
    console.log(`Server running on PORT ${port}`)
})