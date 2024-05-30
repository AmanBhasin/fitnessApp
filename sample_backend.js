const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const {json} = require('express')
const cors = require('cors')
const app = express();
const PORT = 3000;
const fs = require('fs');
app.use(json());
app.use(cors());
let bodyParams = [];



app.post('/search', async(req, res) => {
  try {
    const {bodyPart, muscleQuery, equipQuery} = req.body;
    const exercises = await findExercises(bodyPart, muscleQuery, equipQuery);
    res.json(exercises);
  } catch (error) {
    console.log(error);
    res.status(500).send('error');
  }
});


const findExercises = async (bodyPart, muscleQuery, equipQuery) => {
  const fileString = bodyPart.replace(/\s+/g, '');
  const data = JSON.parse(fs.readFileSync(`${fileString}.json`, 'utf8'));

  const muscleQueries = muscleQuery ? muscleQuery.split(',').map(item => item.trim().toLowerCase()) : [];
  const equipQueries = equipQuery ? equipQuery.split(',').map(item => item.trim().toLowerCase()) : [];

  const filteredExercises = data.filter(exercise => {
    const hasMatchingMuscle = muscleQueries.length === 0 || muscleQueries.some(query => exercise.secondaryMuscles.map(m => m.toLowerCase()).includes(query));
    const hasMatchingEquipment = equipQueries.length === 0 || equipQueries.some(query => exercise.equipment.toLowerCase().includes(query));
    return hasMatchingMuscle && hasMatchingEquipment;
  });

  return filteredExercises;
};
function saveToJson(data, bodypart){
  console.log("Inside the Function");
  if(data){
      try {
          fs.appendFileSync(`${bodypart}.json`, JSON.stringify(data) + '\n');
          console.log("Data Saved in Json File");
      } catch (error) {
          console.error("Error writing Data to the file: ", error);
      }
  }
}

// Connect to PostgreSQL database
const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/fitnessdb');

// Define models for Exercise and BodyPart
const Exercise = sequelize.define('Exercise', {
  name: DataTypes.STRING,
  gifUrl: DataTypes.STRING,
  instructions: DataTypes.ARRAY(DataTypes.STRING)
});

const BodyPart = sequelize.define('BodyPart', {
  name: DataTypes.STRING
});

// Define associations between Exercise and BodyPart
BodyPart.hasMany(Exercise);
Exercise.belongsTo(BodyPart);
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });


app.get('/api/randomExercises/:bodyPartName', async (req, res) => {
  const { bodyPartName } = req.params;

  try {
    const exercises = await Exercise.findAll({
      where: { '$BodyPart.name$': bodyPartName }, // Filter by body part name
      include: [{ model: BodyPart, where: { name: bodyPartName } }], // Include the associated body part
      order: Sequelize.literal('random()'), // Order randomly
      limit: 15 // Limit to 15 exercises
    });

    res.json(exercises);
  } catch (error) {
    console.error('Error fetching random exercises:', error);
    res.status(500).send('Error fetching random exercises');
  }
});

const searchFunction = (searchQuery, extraParam="defaultForNow!") => {
 
  if(extraParam.type === "bodyParts"){
    const bodyParts = ["back", "chest", "cardio", "lower legs", "upper legs", "shoulders", "upper arms"];
    // searchQuery is String
    let searchResult = bodyParts.filter(str => searchQuery.charAt(0).toLowerCase() === str.charAt(0));
    if(searchResult.length === 1) return searchResult;
    let restQuery = searchQuery.substring(1);
    let restQuerySet = new Set(restQuery);
    let optimisedResult = [];
    let maxCount = 0;
    searchResult.forEach(str => {

      if(str.filter(char => restQuerySet.has(char)).length > maxCount){
        maxCount = str.filter(char => restQuerySet.has(char)).length;
        optimisedResult = [str];
      }
      else if(str.filter(char => restQuerySet.has(char)).length === maxCount){
        optimisedResult.push(str);
      }
    });
    return optimisedResult;
  }

  else if(extraParam.type === "targetMuscles"){
    // by here the default param => v-model of bodyPart => 
      bodyPartParam.forEach(bodyParam => {
        if(bodyParam.bodyPart.includes(searchQuery)){
          return bodyParam.targetmuscle;
        }
      })
  }

  else{
    bodyPartParam.forEach(bodyParam => {
      if(bodyParam.bodyPart.includes(searchQuery)){
        return bodyParam.equipment;
      }
    })
  }

  
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
