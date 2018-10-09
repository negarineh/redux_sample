
export const userService = {
    getAll,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type' : 'application/json',
                  'Accept' : 'application/json'}
    };

    return fetch('/alladmins', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
