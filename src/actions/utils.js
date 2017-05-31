// Boilerplate code for handling JSON responses from the API.  Decodes
// successful responses, and unifies the error messages generated by us with
// the default ones returned by Express/Passport.
export const handleResponse = res => {
    if (!res.ok) {
        if (res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')) {
            // It's a nice JSON error returned by us, so decode it
            return res.json().then(err => Promise.reject(err));
        }
        // It's a less informative error returned by express
        return Promise.reject({
            code: res.status,
            message: res.statusText
        });
    }
    return res.json();
};

