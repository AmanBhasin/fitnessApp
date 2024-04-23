import fs from 'fs';

export function saveToJson(data, bodypart){
    if(data){
        try {
            fs.writeFileSync(`${bodypart}.json`, JSON.stringify(data));
            console.log("Data Saved in Json File");
        } catch (error) {
            console.error("Error writing Data to the file: ", error);
        }
    }
}