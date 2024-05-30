
<template>
    <currentDayPage/>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import currentDayPage from './views/currentDayPage.vue'
import searchedBodyPart from './components/searchComponent.vue'

export default {

  components: {
    currentDayPage,
    searchedBodyPart,
  },

  setup() {
    const items = ref(["chest", "back", "lower legs", "upper legs", "upper arms", "lower arms", "shoulders", "cardio", "neck"]);
    const searchedBodyPart = ref("");
    let responseExerciseByBodyParts = ref(null)
    const exerciseData = ref(null); 
    
    // const fetchData = async () => {
    //   const exerciseByBodyParts = {
    //     method: 'GET',
    //     url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + searchedBodyPart.value,
    //     params: { limit: '80' , offset: '80'  },
    //     headers: {
    //       'X-RapidAPI-Key': '320ede38cemsh51ba6d318c3707ep149bdajsnfad76fcdcf46',
    //       'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    //     }  //Note: Pagination has to be applied in this


    //   };

    //   try {
    //     responseExerciseByBodyParts = await axios.request(exerciseByBodyParts);
    //     exerciseData.value = responseExerciseByBodyParts.data;
    //     console.log(exerciseData);
        
    //     // save the data to the postgres database
    //     await saveToDatabase(exerciseData.value, searchedBodyPart.value);
    //   } catch (error) {
    //     console.error("Error in fetching the Exercises:", error);
    //   }
    // };

    // const saveToDatabase = (async(exercises, bodyPart) => {
    //     try {
    //       const res = await axios.post(`http://localhost:3000/api/saveExercises/${bodyPart}`, exercises )
    //       console.log(res);
    //     } catch (error) {
    //       console.error('Error saving data to database:', error);
    //     }
    // });

   
    return { searchedBodyPart, responseExerciseByBodyParts
     ,exerciseData
     ,items
    };
  }
};
</script>

<style>
/* Add your styles here if needed */
</style>
