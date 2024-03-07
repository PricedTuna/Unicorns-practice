import {crudApi} from '../config/api/curdApi';
import {CrudItemResponses} from '../infrastructure/interfaces/CrudItemResponse';

export const DeleteItemById = async (
  itemId: string | undefined,
): Promise<Boolean> => {
  if (!itemId) {
    return false;
  }

  const {status} = await crudApi.delete(`/unicorns/${itemId}`);
  return status === 200;
};
