const https = require('https');

exports.handler = async (event, context, callback) => {
    let { queryStringParameters: { loc, ll } } = event;

    console.log('before if checks: ', loc, ll);

    let dataString = '';

    if (loc !== undefined) {
        const response = await new Promise((resolve, reject) => {
            const req = https.get(`https://www.metaweather.com/api/location/search/?query=${loc}`, function (res) {
                res.on('data', chunk => dataString += chunk);
                res.on('end', () => {
                    resolve({ statusCode: 200, body: dataString, });
                });
            });
            req.on('error', e => {
                reject({
                    statusCode: 500,
                    body: 'Something wrong',
                });
            });
        });
        return response;
    } else if (ll !== undefined) {
        console.log('ll: ', ll);
        let [latInput, longInput] = ll.split(',');
        const response = await new Promise((resolve, reject) => {
            const req = https.get(`https://www.metaweather.com/api/location/search/?lattlong=${latInput},${longInput}`, function (res) {
                res.on('data', chunk => dataString += chunk);
                res.on('end', () => {
                    resolve({ statusCode: 200, body: dataString, });
                });
            });
            req.on('error', e => {
                reject({
                    statusCode: 500,
                    body: 'Something wrong',
                });
            });
        });
        return response;
    }
};
