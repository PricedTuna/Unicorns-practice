import {crudApi} from '../config/api/curdApi';
import {CrudItemResponses} from '../infrastructure/interfaces/CrudItemResponse';

export const CreateUpdateItem = async (
  item: Partial<CrudItemResponses>,
): Promise<CrudItemResponses | boolean> => {
  if (item._id !== undefined && item._id !== 'new') {
    return await updateItem(item);
  } else {
    return await createItem(item);
  }

  throw new Error('Cant update/create this item, check ID');
};

const createItem = async (item: Partial<CrudItemResponses>) => {
  try {
    const {_id, ...rest} = item; // ...rest representa las demas propiedades, las que se necesitan para crear un nuevo item
    const {data} = await crudApi.post<CrudItemResponses>('/unicorns', {
      ...rest,
    });

    return data;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    throw new Error('Error al crear item');
  }
};

const updateItem = async (
  item: Partial<CrudItemResponses>,
): Promise<boolean> => {
  try {
    const {_id, ...rest} = item; // ...rest representa las demas propiedades, las que se necesitan para crear un nuevo item
    const {status} = await crudApi.put<CrudItemResponses>(`/unicorns/${_id}`, {
      ...rest,
    });

    return status === 200;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    throw new Error('Error al crear item');
  }
};
