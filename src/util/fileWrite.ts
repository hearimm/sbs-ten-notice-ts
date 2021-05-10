import * as fs from 'fs';

export const fileWrite = (fileName = 'helloworld.txt'  , text ='Hello World!') => {
  try {
    fs.writeFileSync(fileName, text);
    console.log(`${text} > ${fileName}`);
  } catch (err) {
    console.error(err)
  }
}

export const readFile = (fileName = 'helloworld.txt') => {
  try {
    const data = fs.readFileSync(fileName, 'utf8')
    console.log(data)
    return data
  } catch (err) {
    console.error(err)
  }
}