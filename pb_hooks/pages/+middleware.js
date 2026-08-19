/**
 * Root middleware function to provide user flame settings and global data.
 * @param {import('pocketpages').MiddlewareContext} context - The middleware context.
 * @returns {Object} The middleware data object.
 */
module.exports = function (context) {
    const user = context.request && context.request.auth ? context.request.auth : null;

    let settings = {
        color_primary: "#d9d9d9",
        color_accent: "#50fbc2",
        color_background: "#282525",
        color_primary_light: "#0F172A",
        color_accent_light: "#EAB308",
        color_background_light: "#F8FAFC",
        weather_lat: "43.6532",
        weather_lon: "-79.3832",
        weather_unit: "celsius",
        search_engine: "https://www.google.com/search?q="
    };

    if (user) {
        try {
            const records = $app.findRecordsByFilter("flame_settings", "user = {:user}", "", 1, 0, { user: user.id });
            const record = records && records.length ? records[0] : null;
            if (record) {
                settings = {
                    id: record.id,
                    user: record.getString("user") || user.id,
                    color_primary: record.getString("color_primary") || settings.color_primary,
                    color_accent: record.getString("color_accent") || settings.color_accent,
                    color_background: record.getString("color_background") || settings.color_background,
                    color_primary_light: record.getString("color_primary_light") || settings.color_primary_light,
                    color_accent_light: record.getString("color_accent_light") || settings.color_accent_light,
                    color_background_light: record.getString("color_background_light") || settings.color_background_light,
                    weather_lat: record.getString("weather_lat") || settings.weather_lat,
                    weather_lon: record.getString("weather_lon") || settings.weather_lon,
                    weather_unit: record.getString("weather_unit") || settings.weather_unit,
                    search_engine: record.getString("search_engine") || settings.search_engine
                };
            }
        } catch (e) {
            // collection doesn't exist yet or is empty
        }
    }

    if (context.locals) {
        context.locals.settings = settings;
    }

    return {
        settings
    };
};
