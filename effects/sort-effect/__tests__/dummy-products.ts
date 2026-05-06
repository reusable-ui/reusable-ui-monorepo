import { Product } from './product-types.js'



// Initial 9 random products:
export const initialProducts: Map<string, Product> = new Map([
    ['p1', { id: 'p1', name: 'Grapes',    price: 0.99 }],
    ['p2', { id: 'p2', name: 'Iceberg',   price: 0.59 }],
    ['p3', { id: 'p3', name: 'Honeydew',  price: 0.29 }],
    ['p4', { id: 'p4', name: 'Banana',    price: 1.99 }],
    ['p5', { id: 'p5', name: 'Eggplant',  price: 0.79 }],
    ['p6', { id: 'p6', name: 'Doughnut',  price: 1.49 }],
    ['p7', { id: 'p7', name: 'Apple',     price: 2.99 }],
    ['p8', { id: 'p8', name: 'Carrot',    price: 3.49 }],
    ['p9', { id: 'p9', name: 'Fig',       price: 1.19 }],
]);