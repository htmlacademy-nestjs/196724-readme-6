export const FIELD_NAME = 'file';
export const MIME_TYPE = 'multipart/form-data';
export const FileSwaggerSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};
