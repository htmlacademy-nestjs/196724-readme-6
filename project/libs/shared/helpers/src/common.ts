import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export function fillDto<T, V>(
  someDto: ClassConstructor<T>,
  plainObject: V,
  options?: ClassTransformOptions
): T {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}