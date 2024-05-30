<template>
    <div style="display: flex;">
        <div class="autocomplete">
        <input type="text"
            v-model="bodyPart"
            placeholder="BodyPart"
            @focus=""
            @input="onInputChange"
            class="input-field"
        >
           
        <ul class="dropdown">
            <li v-if="bdpArray.length>0" v-for="(value, index) in bdpArray" :key="index" @click="bodyPart = value; bdpArray = []">
                {{ value }}
            </li>
        </ul>
        </div>

        <div class="autocomplete">
            <input type="text"
                v-model="muscleQuery"
                placeholder="muscles to target"
                @input="onInputChangeMuscle"
                @click="onInputChangeMuscle"
                @change="onInputChangeMuscle"
                class="input-field"
            >
            <ul  class="dropdown" v-if="showMuscleDropdown">
            <li v-if="muscles.length > 0" v-for="(value, index) in muscles" :key="index" @click="handleSelection(value,  'muscle')">
                {{ value }}
            </li>
        </ul>
        </div>


        <div class="autocomplete">
            <input type="text"
                v-model="equipQuery"
                placeholder="which Equipment"
                @input="onInputChangeEquipment"
                @change="onInputChangeEquipment"
                @click="onInputChangeEquipment "
                class="input-field"
            >
            <ul class="dropdown" v-if="showEquipmentDropdown">
            <li v-if="equipment.length > 0" v-for="(value, index) in equipment" :key="index" @click="handleSelection(value, 'equipment')">
                {{ value }}
            </li>
        </ul>
        </div>

        <div class="search-btn" @click="searchExercisesSubmit">
            Find Exercises
        </div>
    </div>
   
</template>

<script setup>

import {ref, watch} from 'vue'
// import bodyPartParam from './jsonFetchScript.js';
import axios from 'axios';
import { useExerciseStore } from '@/store/store'

const bodyPart = ref('');
const muscleQuery = ref('');
const muscles = ref([]);
const equipment = ref([]);
const bdpArray = ref([]);
const equipQuery = ref('');
const showEquipmentDropdown = ref(false);
const showMuscleDropdown = ref(false);
const exerciseStore = useExerciseStore();

const bodyParts = ["back", "chest", "cardio", "lower legs", "upper legs", "shoulders", "arms"];
bdpArray.value = bodyParts;
const testFunction = (e) => {
    console.log("focus has happened!");
    console.log(e);
}

const searchExercisesSubmit = async () => {
    try {
        const res = await axios.post('http://localhost:3000/search', {
            bodyPart: bodyPart.value,
            muscleQuery: muscleQuery.value,
            equipQuery: equipQuery.value
        });
        console.log(res.data); // Handle the response data as needed
        exerciseStore.setFilteredExercises(res.data);
    showEquipmentDropdown.value = false;
    } catch (error) {
        console.error(error); // Log or handle the error as needed
    }
};

const handleSelection = (val, query) => {
    if(query == 'muscle'){
        if(muscleQuery.value) {
            muscleQuery.value += ', ' + val;
        }
        else{
            muscleQuery.value = val;
        }
    }

    else if(query == 'equipment'){
        if(equipQuery.value){
            equipQuery.value += ', ' + val;
        }
        else{
            equipQuery.value = val;
        }
    }

}

const bodyPartParam = [
  {
    bodyPart: 'back',
    equipment: [
      'cable',          'barbell',
      'body weight',    'dumbbell',
      'stability ball', 'ez barbell',
      'kettlebell',     'leverage machine',
      'rope',           'medicine ball',
      'band',           'resistance band',
      'roller',         'smith machine',
      'weighted'
    ],
    targetmuscle: [
      'back',       'biceps',
      'rhomboids',  'rear deltoids',
      'forearms',   'shoulders',
      'core',       'triceps',
      'trapezius',  'glutes',
      'hamstrings', 'chest',
      'abdominals', 'deltoids',
      'obliques'
    ]
  },
  {
    bodyPart: 'chest',
    equipment: [
      'body weight',
      'leverage machine',
      'assisted',
      'band',
      'barbell',
      'cable',
      'stability ball',
      'dumbbell',
      'upper body ergometer',
      'kettlebell',
      'medicine ball',
      'bosu ball',
      'resistance band',
      'roller',
      'smith machine',
      'weighted'
    ],
    targetmuscle: [
      'chest',
      'triceps',
      'shoulders',
      'core',
      'deltoids',
      'trapezius',
      'latissimus dorsi',
      'back',
      'rhomboids'
    ]
  },
  {
    bodyPart: 'cardio',
    equipment: [
      'body weight',
      'leverage machine',
      'dumbbell',
      'rope',
      'stationary bike',
      'elliptical machine',
      'stepmill machine'
    ],
    targetmuscle: [
      'cardio',     'quadriceps',
      'hamstrings', 'calves',
      'glutes',     'core',
      'shoulders',  'triceps',
      'chest'
    ]
  },
  {
    bodyPart: 'lower legs',
    equipment: [
      'body weight',     'assisted',
      'band',            'barbell',
      'cable',           'dumbbell',
      'stability ball',  'rope',
      'kettlebell',      'leverage machine',
      'resistance band', 'roller',
      'sled machine',    'smith machine',
      'bosu ball',       'tire',
      'trap bar',        'weighted'
    ],
    targetmuscle: [
      'hamstrings',  'glutes',
      'quadriceps',  'calves',
      'lower back',  'back',
      'shoulders',   'triceps',
      'core',        'obliques',
      'hip flexors', 'groin',
      'forearms',    'lower abs',
      'chest',       'ankle stabilizers',
      'ankles',      'feet',
      'soleus',      'shins'
    ]
  },
  {
    bodyPart: 'upper legs',
    equipment: [
      'body weight',     'assisted',
      'band',            'barbell',
      'cable',           'dumbbell',
      'stability ball',  'rope',
      'kettlebell',      'leverage machine',
      'resistance band', 'roller',
      'sled machine',    'smith machine',
      'bosu ball',       'tire',
      'trap bar',        'weighted'
    ],
    targetmuscle: [
      'hamstrings',  'glutes',
      'quadriceps',  'calves',
      'lower back',  'back',
      'shoulders',   'triceps',
      'core',        'obliques',
      'hip flexors', 'groin',
      'forearms',    'lower abs',
      'chest',       'ankle stabilizers',
      'ankles',      'feet',
      'soleus',      'shins'
    ]
  },
  {
    bodyPart: 'shoulders',
    equipment: [
      'band',
      'barbell',
      'rope',
      'cable',
      'dumbbell',
      'ez barbell',
      'kettlebell',
      'body weight',
      'leverage machine',
      'resistance band',
      'smith machine',
      'weighted'
    ],
    targetmuscle: [
      'traps',         'upper back',
      'triceps',       'trapezius',
      'rhomboids',     'biceps',
      'forearms',      'core',
      'quadriceps',    'glutes',
      'hamstrings',    'rotator cuff',
      'rear deltoids', 'upper chest',
      'chest'
    ]
  },
  {
    bodyPart: 'arms',
    equipment: [
      'assisted',        'leverage machine',
      'band',            'barbell',
      'body weight',     'cable',
      'dumbbell',        'stability ball',
      'ez barbell',      'kettlebell',
      'medicine ball',   'olympic barbell',
      'resistance band', 'skierg machine',
      'smith machine',   'weighted'
    ],
    targetmuscle: [
      'arms',       'shoulders',
      'chest',      'forearms',
      'back',       'core',
      'quadriceps', 'hamstrings',
      'glutes'
    ]
  }
];

const onInputChange = () => {
    bdpArray.value = searchFunction(bodyPart.value, {type: 'bodyParts'})
}

const onInputChangeMuscle = () => {
    muscles.value = searchFunction(muscleQuery.value, {type: 'targetMuscles'})
    showMuscleDropdown.value = true;
    showEquipmentDropdown.value = false;
}

const onInputChangeEquipment = () => {  
    // showMuscleDropDown.value = false;
    equipment.value = searchFunction(equipQuery.value, {type: 'equipment'});
    showEquipmentDropdown.value = true;
    showMuscleDropdown.value = false;
}

const searchFunction = (searchQuery, extraParam = {type: 'default'}) => {
    const getMatchingElement = (arr, query) => {
        let matchArr = [];
        const scoredResults = arr.map(element => {
            const lquery = query.toLowerCase();
            let elementIndex = 0;
            let queryIndex = 0;
            while(queryIndex < lquery.length && elementIndex < element.length){
                if(lquery[queryIndex] === element[elementIndex]){
                    queryIndex++;
                }
                elementIndex++;
            }

            if(queryIndex === lquery.length)
            matchArr.push(element);
        })

        return matchArr;
    };

    if (extraParam.type === 'bodyParts') {
        
        return getMatchingElement(bodyParts, searchQuery);
    } else if (extraParam.type === 'targetMuscles') {
        const matchingBodyParam = bodyPartParam.find(param => param.bodyPart === bodyPart.value);
        if (matchingBodyParam){
            return getMatchingElement(matchingBodyParam.targetmuscle, searchQuery);
        }
    } else {
        const matchingBodyParam = bodyPartParam.find(param => param.bodyPart === bodyPart.value);
        if (matchingBodyParam) {
            return getMatchingElement(matchingBodyParam.equipment, searchQuery) ;
        }
    }
    return [];
}

</script>

<style scoped>
.autocomplete {
  position: relative;
  width: 300px;
  margin: 20px auto;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  font-size: 16px;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
}
.dropdown {
  position: absolute;
  border: 1px solid #ccc;
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  margin-top: 5px;
  padding: 0;
  list-style: none;
}


.search-btn {
    padding: 10px 20px;
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-btn:hover {
    background-color: #0056b3;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
}


.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>