import fs from 'fs';
import path from 'path';

export const readData = (filePath: string): any => {
    try{
        let data = fs.readFile(filePath, 'utf8', (err, data) => {
            return data
        } )
    } catch {
        fs.writeFile(filePath, '[]', (err)=>{
            if(err){
                return err;
            }
        });
        let data = fs.readFile(filePath, 'utf8', (err, data) => {
            return data;
        })
    }
}

export const writeData = (filePath: string, data: string) => {
    try{
        fs.writeFile(filePath, data, (err)=>{
            if(err){
                return err;
            }
        });
    } catch (err){
        return err;
    }
}