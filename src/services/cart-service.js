const axios = require('axios');


const baseUrl = 'https://faketure-aks-ingress.centralus.cloudapp.azure.com/cart/cart';

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

const postCart = async (sessionId, item) => {
    console.log(sessionId, item);
    return axios.post(baseUrl, { item: { sessionId, ...item, cart: strMapToJson(item.cart) } });
}

const getCartBy = async (sessionId) => {
    return axios.get(`${baseUrl}/${sessionId}`);
}
module.exports = { postCart, getCartBy };