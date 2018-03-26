// Boilerplate code for handling errors from the API.  If the API sent back an
// error, return a rejected promise containing the decoded JSON body. If the
// request succeeded then we continue with the promise chain.
export const handleResponseErrors = res => {
    if (!res.ok) {
        return res.json().then(err => Promise.reject(err));
    }
    return res;
};
