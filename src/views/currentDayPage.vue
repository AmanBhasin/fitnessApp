<template>
  <div class="container">
    <div class="title-bar" :style="{ backgroundColor: TitleColor }">
      <h1 class="title">{{ currentDay }}</h1>
      <p class="subtitle">{{ motivationalMessage }}</p>
    </div>
    <div class="display-exercises" :style="{ backgroundColor: bodyColor }">
      <div class="searchExer">
        <searchComponent/>
      </div>
      <div v-for="exercise in filteredExercises" :key="exercise.id" :title="exercise.name" class="exercise-card">
        <div class="exercise-content">
          <div class="exercise-info">
            <h2>{{ exercise.name }}</h2>
            <div v-for="(instruction, index) in exercise.instructions" :key="index" class="instruction">
              <h4>{{ index + 1 }}. {{ instruction }}</h4>
            </div>
          </div>
          <div class="exercise-image" :style="{ backgroundColor: TitleColor }">
            <img :src="exercise.gifUrl" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import searchComponent from '@/components/searchComponent.vue';
import { useExerciseStore } from '@/store/store';
import { storeToRefs } from 'pinia';

const color = ["rgb(72, 80, 218)", "rgb(208, 38, 191)", "rgb(30, 120, 105)", "rgb(194, 84, 47)", "rgb(230, 14, 64)", "rgb(84, 12, 29)", "rgb(28, 29, 28)", "rgb(0, 73, 94)"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * color.length);
  return color[randomIndex];
};

const exerciseStore = useExerciseStore();
const { filteredExercises } = storeToRefs(exerciseStore);

const currentDay = ref(getCurrentDay());
const motivationalMessage = ref(getRandomMotivationalMessage());

function lightenColor(rgbColor, percent, opacity) {
  const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
  const newR = Math.round(r + (255 - r) * (percent / 100));
  const newG = Math.round(g + (255 - g) * (percent / 100));
  const newB = Math.round(b + (255 - b) * (percent / 100));
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

async function fetchExercises(bodyPart) {
  try {
    const response = await axios.get(`http://localhost:3000/api/randomExercises/${bodyPart}`);
    exercises.value = response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}

onMounted(() => {
  // fetchExercises("back");
});

const TitleColor = getRandomColor();
const bodyColor = lightenColor(TitleColor, 30, 0.5);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
}

.title-bar {
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.title {
  color: white;
  margin: 0;
  font-size: 2rem;
}

.subtitle {
  color: white;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.display-exercises {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}

.searchExer {
  margin-bottom: 20px;
}

.exercise-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.exercise-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.exercise-info {
  flex: 1;
  padding: 20px;
}

.exercise-info h2 {
  margin: 0 0 10px;
  font-size: 1.5rem;
  color: #333;
}

.instruction {
  margin-bottom: 10px;
}

.instruction h4 {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.exercise-image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
}

.exercise-image img {
  border-radius: 10px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .exercise-card {
    flex-direction: row;
  }

  .exercise-content {
    flex-direction: row;
  }

  .exercise-info {
    width: 60%;
    margin-left: 20px;
  }

  .exercise-image {
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
  }
}
</style>
