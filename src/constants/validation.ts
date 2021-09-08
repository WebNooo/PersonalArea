export const required = (value: any, message: 'test') =>
  new Promise((resolve, reject) => {
    return value !== undefined && value !== null && value.length > 0 ?
      resolve(value) :
      reject(message);
  });

export const required2 = {
  _validation: (value: any) => {
    return value !== undefined && value !== null && value.length > 0 ?
      Promise.resolve(value) :
      Promise.reject(new Error('message'));
  },
};
