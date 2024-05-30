
const axios =  require('axios');

const fs = require('fs');
const { DatabaseError } = require('sequelize');
const data = JSON.parse(fs.readFileSync('chest.json', 'utf8'));

const chestParams = {
    bodyPart: 'chest',
    equipment: [],
    targetmuscle: ['chest'],

};

async function sendBodyParams(bdparams){
    try {
        const res = await axios.post('http://localhost:3000/api/bodyParams', bdparams)
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

function makeIt(params, fdata){
    fdata.forEach(exercise => {
        if(!params.equipment.includes(exercise.equipment)){
            params.equipment.push(exercise.equipment);
        }
        exercise.secondaryMuscles.forEach(muscle =>{ 
        if(!params.targetmuscle.includes(muscle)){
            params.targetmuscle.push(muscle);
        }})
})}

makeIt(chestParams, data);
// console.log(chestParams);

const dataBack = JSON.parse(fs.readFileSync('back.json', 'utf8'));
const backParams = {
    bodyPart: 'back',
    equipment: [],
    targetmuscle: ['back'],
}

makeIt(backParams, dataBack);
// console.log(backParams);

const dataCardio = JSON.parse(fs.readFileSync('cardio.json', 'utf8'));
const cardioParams = {
    bodyPart: 'cardio',
    equipment: [],
    targetmuscle: ['cardio'],
}

makeIt(cardioParams, dataCardio);
// console.log(cardioParams);

const dataArms = JSON.parse(fs.readFileSync('upperarms.json', 'utf8'));
const armsParams = {
    bodyPart: 'arms',
    equipment: [],
    targetmuscle: ['arms'],
}

makeIt(armsParams, dataArms);
// console.log(armsParams);

const dataUpperLegs = JSON.parse(fs.readFileSync('upperlegs.json', 'utf8'));
const dataLowerLegs = JSON.parse(fs.readFileSync('lowerlegs.json', 'utf8'));
const dataCombinedLegs = [...dataUpperLegs, ...dataLowerLegs];
const legParams = {
    bodyPart: 'legs',
    equipment: [],
    targetmuscle: [],
};

makeIt(legParams, dataCombinedLegs);
// console.log(legParams);

const dataShoulders = JSON.parse(fs.readFileSync('shoulders.json', 'utf8'));
const shoulderParams = {
    bodyPart: 'shoulders',
    equipment: [],
    targetmuscle: [],
}

makeIt(shoulderParams, dataShoulders);
// console.log(shoulderParams);


const bodyParams = [backParams, chestParams, cardioParams, legParams, shoulderParams, armsParams];
console.log(bodyParams);