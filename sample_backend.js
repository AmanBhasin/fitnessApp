const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const {json} = require('express')
const cors = require('cors')
const app = express();
const PORT = 3000;
const fs = require('fs');
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

// Middleware to parse JSON requests
app.use(json());
app.use(cors());
// Endpoint to save exercises to PostgreSQL database
app.post('/api/saveExercises/:bodyPartName', async (req, res) => {
  const { bodyPartName } = req.params;
  const exercises = req.body;

  try {
    // Find or create the body part
    let bodyPart = await BodyPart.findOne({ where: { name: bodyPartName } });
    if (!bodyPart) {
      bodyPart = await BodyPart.create({ name: bodyPartName });
    }
    console.log("Before Calling Function...");
    // saveToJson(exercises, bodyPartName);
    // Save exercises associated with the body part
    // await Exercise.bulkCreate(exercises.map(exercise => ({
    //   name: exercise.name,
    //   gifUrl: exercise.gifUrl,
    //   instructions: exercise.instructions,
    //   BodyPartId: bodyPart.id
    // }))
    // );

    res.status(201).send('Exercises saved to database successfully');
  } catch (error) {
    console.error('Error saving exercises to database:', error);
    res.status(500).send('Error saving exercises to database');
  }
});

// Endpoint to get random  exercises by body part
app.get('/api/randomExercises/:bodyPartName', async (req, res) => {
  const { bodyPartName } = req.params;

  try {
    const exercises = await Exercise.findAll({
      where: { '$BodyPart.name$': bodyPartName }, // Filter by body part name
      include: [{ model: BodyPart, where: { name: bodyPartName } }], // Include the associated body part
      order: Sequelize.literal('random()'), // Order randomly
      limit: 15 // Limit to 10 exercises
    });

    res.json(exercises);
  } catch (error) {
    console.error('Error fetching random exercises:', error);
    res.status(500).send('Error fetching random exercises');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
