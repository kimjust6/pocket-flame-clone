/**
 * Loader for the login page.
 * Redirects to homepage if already authenticated.
 * @type {import('pocketpages').PageDataLoaderFunc}
 * @returns {Object} Empty object
 */
module.exports = function (context) {
    // If already logged in, redirect to homepage
    if (context.request.auth) {
        context.response.redirect('/')
        return
    }

    return {}
}
