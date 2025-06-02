import { camelCase, isArray, isObject, kebabCase, snakeCase, transform } from 'lodash';

/**
 * Returns object with keys transformed to camel-case
 * @param obj
 */
export const camelize = (obj: any): any =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key.toString());
    acc[camelKey] = isObject(value) ? camelize(value) : value;
  });

/**
 * Returns object with keys transformed to kebab-case
 * @param obj
 */
export const kebabilize = (obj: any): any =>
  transform(obj, (acc, value, key, target) => {
    const kebabKey = isArray(target) ? key : kebabCase(key.toString());
    acc[kebabKey] = isObject(value) ? kebabilize(value) : value;
  });

/**
 * Returns object with keys transformed to snake-case
 * @param obj
 */
export const snakeify = (obj: any): any =>
  transform(obj, (acc, value, key, target) => {
    const snakeKey = isArray(target) ? key : snakeCase(key.toString());
    acc[snakeKey] = isObject(value) ? snakeify(value) : value;
  });
