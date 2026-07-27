/**
 * Loader for the profile page.
 * Checks authentication and loads the user profile.
 * @type {import('pocketpages').PageDataLoaderFunc}
 * @returns {{ profile: import('../../../lib/pocketbase-types').UsersResponse }}
 */
module.exports = function (context) {
    const common = require(__hooks + '/lib/common.js')
    const { TABLES } = common
    const user = context.request ? context.request.auth : null

    if (!user) {
        context.response.redirect('/login')
        return
    }

    // Fetch fresh user data
    let profile = user
    try {
        profile = $app.findRecordById(TABLES.USERS, user.id)
    } catch (e) {
        console.error("Failed to fetch fresh profile:", e)
    }

    // Verify profile is a Record, otherwise shim it
    if (profile && typeof profile.getString !== 'function') {
        const p = profile
        profile = {
            ...p,
            getString: (key) => p[key] || '',
            collection: () => ({ id: p.collectionId || p.collectionName || 'users' }),
            // Fallback to session user email as POJO profile often lacks it
            email: () => p.email || user?.email || '',
        }
    }

    return {
        profile,
        formatDateTime: common.formatDateTime
    }
}
