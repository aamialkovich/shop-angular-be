'use strict';

const products = [
    {id: '1', name: 'Product 1'},
    {id: '2', name: 'Product 2'},
    {id: '3', name: 'Product 3'},
    {id: '4', name: 'Product 4'},
]

module.exports.getProductsList = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    };
};

module.exports.getProductById = async (event) => {
    const productId = event.pathParameters && event.pathParameters.productId;
    return {
        statusCode: 200,
        body: JSON.stringify(products.find(el => el.id === productId)),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    };
};
