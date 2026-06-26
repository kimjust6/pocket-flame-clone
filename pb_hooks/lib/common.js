/**
 * @file Common utility functions and constants for PocketBase hooks.
 * @module common
 */

const TABLES = {
    USERS: 'users'
};

const COLS = {
    ID: 'id',
    NAME: 'name',
    USERNAME: 'username',
    AVATAR: 'avatar',
    SHORTHAND: 'shortHand'
};

module.exports = {
    TABLES,
    COLS,

    /**
     * Format a date string or Date object to a human-readable format.
     * @param {string|Date|null} date - The date to format
     * @returns {string} Formatted date string (e.g., "Jan 01, 2024") or '-' if invalid
     */
    formatDateTime: function (date) {
        if (!date) return '-'
        const d = new Date(date)
        if (isNaN(d.getTime())) return '-'
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = months[d.getMonth()]
        const day = d.getDate().toString().padStart(2, '0')
        const year = d.getFullYear()
        return `${month} ${day}, ${year}`
    },

    /**
     * Helper to get param from various context locations
     * @param {object} context - The pb_hooks context object
     * @param {string} key - The parameter key
     * @returns {string|null} The parameter value or null
     */
    getParam: function (context, key) {
        if (context.params && context.params[key]) return context.params[key]
        if (context.query && context.query[key]) return context.query[key]
        if (typeof context.queryParam === 'function') return context.queryParam(key)
        return null
    },

    /**
     * Helper to safely extract form data from a PocketBase context.
     * @param {object} context - The pb_hooks context object (request/response)
     * @returns {object} Simple key-value object of the form data
     */
    parseFormData: function (context) {
        let data = {}
        try {
            if (typeof context.formData === 'function') {
                return context.formData()
            }
            if (typeof context.body === 'function') {
                const body = context.body()
                if (body) return body
            }
        } catch (e) {
            console.error('[common.js] Error parsing form data:', e)
        }
        return data
    },

    /**
     * Initialize PocketBase client and get authenticated user.
     * @param {object} context - The pb_hooks context object
     * @returns {{client: any, user: any}} Object containing the initialized client and user model (or null)
     */
    init: function (context) {
        const { request } = context
        const client = context.pb({ request })
        const user = client.authStore.model
        return { client, user }
    }
}
