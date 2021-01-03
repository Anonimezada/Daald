import fs from 'fs';
import path from 'path';
import DaaldClient from '../structures/Client';

type ReloadFunction<Module> = (module: Module, dirPath: string) => void;

export default class FileUtil {
  static filename(filepath: string): string {
    return path.parse(filepath).name;
  }

  static async readDirectory<B>(
    directory: string,
    client: DaaldClient,
    callback: ReloadFunction<B> = () => null
  ): Promise<unknown[]> {
    return Promise.all(
      FileUtil.readdirRecursive(directory).map(async filepath => {
        const fullpath = path.resolve(filepath);
        const Module = (await import(fullpath)).default;
        // @ts-ignore
        callback(new Module(client), filepath);
      })
    );
  }

  static readdirRecursive(directory: string): string[] {
    return fs.readdirSync(directory).reduce((p, file) => {
      const filepath = path.join(directory, file);
      if (fs.statSync(filepath).isDirectory()) {
        return [...p, ...FileUtil.readdirRecursive(filepath)];
      }
      return [...p, filepath];
    }, []);
  }
}