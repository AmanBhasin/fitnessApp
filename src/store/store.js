import { defineStore } from 'pinia';

export const useExerciseStore = defineStore('exerciseStore', {
    state: () => ({
        filteredExercises: []
    }),
    actions: {
        setFilteredExercises(exercises) {
            this.filteredExercises = exercises;
        }
    }
});
