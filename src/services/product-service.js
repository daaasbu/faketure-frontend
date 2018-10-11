const axios = require('axios');


const baseUrl = 'https://faketure-aks-ingress.centralus.cloudapp.azure.com/product/products';

const getProducts = async (page, size) => {
    const url = (page && size) ? `${baseUrl}/${page}/${size}` : baseUrl;
    const res = axios.get(url);
    return res;
}

const getProductsByCategory = async (category) => {
    const url = `${baseUrl}/category`;
    const res =  axios.get(url);
    return res;
}

module.exports = { getProducts, getProductsByCategory };