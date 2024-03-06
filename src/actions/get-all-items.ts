import {crudApi} from '../config/api/curdApi';
import {CrudItemResponses} from '../infrastructure/interfaces/CrudItemResponse';

export const getAllItems = async (): Promise<CrudItemResponses[]> => {
  const {data} = await crudApi.get('/unicorns');
  return data;
};
