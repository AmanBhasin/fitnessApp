<template>
    <div class="title-bar" :style="{ backgroundColor: TitleColor }">
        <h3>{{ currentDay }}</h3>
        <p style="color: white; font-size: medium;">{{ motivationalMessage }}</p>
    </div>
    <div class="display-exercises" :style="{backgroundColor: bodyColor }">
        
    </div>
  </template>
  
  <script setup>
    import {ref} from 'vue';



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

  const TitleColor = getRandomColor();
  const bodyColor = lightenColor(TitleColor, 30, 0.5);
  </script>


  <style>
  .title-bar {
    height: 22vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .title-bar h3 {
    font-size: 42px; /* Adjust font size as needed */
    margin-bottom: 8px; /* Add spacing between h3 and p */
    color: white;

  }
  
  .display-exercises {
    height: 70vh;
    width: 100%;
  }
  </style>