import * as fs from 'fs';
import fsExtra from 'fs-extra'

export const mkdir = (path: fs.PathLike, options: fs.MakeDirectoryOptions & { recursive: true; }):void => {
  try {
    fs.mkdir(path, options, (err) => {
      if (err) throw err;
    });
    console.log('mkdir', path)
  } catch (error) {
    console.error(error)
  }
}


export const fileWrite = (fileName = 'helloworld.txt'  , text ='Hello World!'): void => {
  try {
    fs.writeFileSync(fileName, text);
    console.log(`>>> ${fileName} write!`);
  } catch (err) {
    console.error(err)
  }
}

export const readDir = (path: string):string[] => {
  try {
    const data = fs.readdirSync(path)
    return data
  } catch (err) {
    console.log(err)
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

export function getJSON(path:string):Record<string,unknown> {
  try {
      if (!existsSync(path)) { return }
      if(!path.endsWith('.json')){
        console.log('is Not JSON file : ' + path)
        return
      }
      const json = JSON.parse(readFile(path))
      return json
  } catch (error) {
      console.log(error)
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
  const result = fs.existsSync(fileName)
  if(!result) {
    console.info('target file not exists : ' + fileName)
  }
  return result
}

export const clearDir = (path: string):void => {
  fsExtra.emptyDirSync(path)
}