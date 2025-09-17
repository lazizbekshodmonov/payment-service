import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export function loadYamlConfig() {
  const configPath = join(__dirname, '../../resources/application.yml');
  const fileContents = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(fileContents) as Record<string, any>;

  function replaceEnv(obj: unknown): unknown {
    if (typeof obj === 'string') {
      const match = obj.match(/^\{(.+)\}$/);
      if (match) {
        const envVal = process.env[match[1]];
        return envVal !== undefined ? String(envVal) : null;
      }
      return obj;
    } else if (Array.isArray(obj)) {
      return obj.map((item) => replaceEnv(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: Record<string, unknown> = {};
      for (const key of Object.keys(obj)) {
        newObj[key] = replaceEnv((obj as Record<string, unknown>)[key]);
      }
      return newObj;
    }
    return obj;
  }

  return replaceEnv(config) as Record<string, any>;
}
