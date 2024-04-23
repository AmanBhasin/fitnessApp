
<template>
  <div>
    <!-- <h1>Welcome to my fitness App</h1> -->
    <input v-model="searchedBodyPart" type="text" placeholder="chest">
    <!--  @click="fetchData" -->
    <!--  -->
    <button @click="fetchData">get exercise</button>
    <div class="card flex justify-content-center">
        <h3>Filter By</h3>
        <Dropdown v-model="searchedBodyPart" :options="items"  placeholder="Body Part" style="width: 150px;" />

    </div>




    <div v-if="exerciseData">
      <h2>Exercise Data</h2>
      <ul>
        <li v-for="exercise in exerciseData" :key="exercise.id" style="display: flex;">
          <div>
            <h3>{{ exercise.name }}</h3>
            <p>Body Part: {{ exercise.bodyPart }}</p>
            <p>Target: {{ exercise.target }}</p>
            <!-- <p>Gif URL: <a :href="exercise.gifUrl">{{ exercise.gifUrl }}</a></p> -->
            <p>Instructions:</p>
            <ul>
              <li v-for="(instruction, index) in exercise.instructions" :key="index">
                {{ instruction }}
              </li>
            </ul>
          </div>
          
          <div><img :src="exercise.gifUrl" alt="Example GIF"></div>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// import {AutoComplete} from 'primevue/autocomplete';

export default {

  // components: {
  //   AutoComplete,
  // },

  setup() {
    const items = ref(["chest", "back", "lower legs", "upper legs", "upper arms", "lower arms", "shoulders", "cardio", "neck"]);
    const searchedBodyPart = ref("");
    let responseExerciseByBodyParts = ref(null)
    const exerciseData = ref(null); 
    const fetchData = async () => {
      const exerciseByBodyParts = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + searchedBodyPart.value,
        params: { limit: '80' , offset: '80'  },
        headers: {
          'X-RapidAPI-Key': '320ede38cemsh51ba6d318c3707ep149bdajsnfad76fcdcf46',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }  //Note: Pagination has to be applied in this


      };

      try {
        responseExerciseByBodyParts = await axios.request(exerciseByBodyParts);
        exerciseData.value = responseExerciseByBodyParts.data;
        console.log(exerciseData);
        
        // save the data to the postgres database
        await saveToDatabase(exerciseData.value, searchedBodyPart.value);
      } catch (error) {
        console.error("Error in fetching the Exercises:", error);
      }
    };

    const saveToDatabase = (async(exercises, bodyPart) => {
        try {
          const res = await axios.post(`http://localhost:3000/api/saveExercises/${bodyPart}`, exercises )
          console.log(res);
        } catch (error) {
          console.error('Error saving data to database:', error);
        }
    });

    return {fetchData, searchedBodyPart, responseExerciseByBodyParts
     ,exerciseData
     ,items
     ,saveToDatabase

    };
  }
};
</script>

<style>
/* Add your styles here if needed */
</style>
