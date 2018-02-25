import axios from 'axios';

export const getUserTweets = (data) => {
    return axios({
        method: 'get',
        params: {
            token: data
        },
        responseType: 'json',
        url: 'http://localhost:4000/tweets',
        config: {
            headers: {
                'Accept': 'application/json'
            }
        }
    }).then(json => json.data);

};