'use strict';

import { getProductsList } from './handlers/getProductsList/getProductsList';
import { getProductById } from './handlers/getProductById/getProductById';
import { createProduct } from './handlers/createProduct/createProduct';
import { catalogBatchProcess } from './handlers/catalogBatchProcess/catalogBatchProcess';

export { getProductsList, getProductById, createProduct, catalogBatchProcess };
