import * as fs from 'fs';

export const fileWrite = (fileName = 'helloworld.txt'  , text ='Hello World!'): void => {
  try {
    fs.writeFileSync(fileName, text);
    console.log(`>>> ${fileName} write!`);
  } catch (err) {
    console.error(err)
  }
}

export const readFile = (fileName = 'helloworld.txt'):string => {
  if(!existsSync(fileName)) {
    return ''
  }

  try {
    const data = fs.readFileSync(fileName, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

export const fileDelete = (path: fs.PathLike):void => {
  if(!existsSync(path)) {
    return
  }
  
  try {
    fs.unlinkSync(path)
    console.log(`>>> ${path} delete!`);
  } catch(err) {
    console.error(err)
  }
}

export const existsSync = (fileName: fs.PathLike):boolean => {
  return fs.existsSync(fileName)
}