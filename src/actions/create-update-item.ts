import {crudApi} from '../config/api/curdApi';
import {CrudItemResponses} from '../infrastructure/interfaces/CrudItemResponse';

export const CreateUpdateItem = async (
  item: Partial<CrudItemResponses>,
): Promise<CrudItemResponses> => {
  console.log('if');
  if (item._id !== undefined && item._id !== 'new') {
    updateItem(item);
  } else {
    return createItem(item);
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

const updateItem = (item: Partial<CrudItemResponses>) => {};
