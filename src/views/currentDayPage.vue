<template>
  <div class="container">
    <div class="title-bar" :style="{ backgroundColor: TitleColor }">
      <h1 style="color: white; margin-bottom: 0px">{{ currentDay }}</h1>
      <p style="color: white; font-size: medium;">{{ motivationalMessage }}</p>
    </div>
    <div class="display-exercises" :style="{ backgroundColor: bodyColor }">
        <div class="searchExer">
          <input type="text" v-model="bodyPart">
          <button @click="fetchExercises(bodyPart)">Find</button>
        </div>
        <div v-for="exercise in exercises" :key="exercise.id" :title="exercise.name" style="display: flex; flex-direction: column; ">
            <!-- {{ console.log(exercise.instructions)}} -->
            <!-- {{ formatToString(exercise.instructions) }} -->
            <div style="display: flex; height: 40%;">
              <div  style="width: 60%; margin-left: 20px;" >
                 <h1>{{ exercise.name }}</h1>
                  <div v-for="(instruction, index) in exercise.instructions" :key="index" class="instruction">
                    <h4>{{ index + 1 }}. {{ instruction }}</h4>
                  </div>
              </div>
              <div style="padding: 20px; border-radius: 10px;  margin: 10px;" :style="{backgroundColor: TitleColor}">
                  <img :src="exercise.gifUrl" alt="" style="border-radius: 10px; ">
              </div>
            </div>
        </div>
    </div>
  </div>
</template>
  <!-- to display the instruction nicely, terraform script to make registry, graph theory start -->
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';




  const color = ["rgb(72, 80, 218)", "rgb(208, 38, 191)", "rgb(30, 120, 105)", "rgb(194, 84, 47)", "rgb(230, 14, 64)", "rgb(84, 12, 29)", "rgb(28, 29, 28)", "rgb(0, 73, 94)"];
  
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * color.length);
    return color[randomIndex];
  };



  const currentDay = ref(getCurrentDay());
  const motivationalMessage = ref(getRandomMotivationalMessage());

  function lightenColor(rgbColor, percent, opacity) {
    // Parse the RGB color string
    const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
    // Calculate lighter RGB values
    const newR = Math.round(r + (255 - r) * (percent / 100));
    const newG = Math.round(g + (255 - g) * (percent / 100));
    const newB = Math.round(b + (255 - b) * (percent / 100));
    // Return the new RGBA color string
    return `rgba(${newR}, ${newG}, ${newB}, ${opacity})`;
}

  const bodyPart = ref("back");
function getRandomMotivationalMessage() {
  const messages = [
    "Stay committed to your workouts!",
    "Believe in yourself. You are stronger than you think.",
    "Strive for progress, not perfection.",
    "You're one workout away from a good mood!",
    "The only bad workout is the one that didn't happen.",
    "You've got this!"
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}
    
function getCurrentDay() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
}


const exercises = ref([]);

async function fetchExercises(bodyPart, ) {
  try {
    const response = await axios.get(`http://localhost:3000/api/randomExercises/${bodyPart}`);
    exercises.value = response.data;
    // console.log(exercises.value.instructions);
    // formatToString(exercises.value.instructions);

  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}

onMounted(() => {
  fetchExercises("back");
});


  const TitleColor = getRandomColor();
  const bodyColor = lightenColor(TitleColor, 30, 0.5);
  </script>


  <style>
  
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.title-bar {
  /* Your title bar styles */
  height: 30vh; /* Adjust height as needed */
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.display-exercises {
  /* Your display exercises styles */
  flex-grow: 1; /* This makes the div grow to fill the remaining space */
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
}
  </style>