import {Iuser} from '../model/model'
import path from 'path';
import {readData, writeData} from '../utils/utils';
import bcrypt from 'bcrypt';
const filePath: string = path.resolve(__dirname, '../model/user.json')
export const createUser = (data: Iuser) => {
    const userList = JSON.parse(readData(filePath));
    let userExist = userList.find((user: Iuser) => user.email === data.email)
    if(userExist){
        throw new Error('User Already Exist')
    }
    data.id = userList.length + 1
}