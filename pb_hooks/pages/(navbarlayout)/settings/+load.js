/**
 * Loader for the Settings page.
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
module.exports = function (context) {
    try {
        let settings = {
            id: 'defaultsettings',
            color_primary: "#d9d9d9",
            color_accent: "#50fbc2",
            color_background: "#282525",
            weather_lat: "43.6532",
            weather_lon: "-79.3832",
            weather_unit: "celsius",
            search_engine: "https://www.google.com/search?q="
        };

        try {
            const record = $app.findFirstRecord("flame_settings");
            if (record) {
                settings = {
                    id: record.id,
                    color_primary: record.getString("color_primary") || settings.color_primary,
                    color_accent: record.getString("color_accent") || settings.color_accent,
                    color_background: record.getString("color_background") || settings.color_background,
                    weather_lat: record.getString("weather_lat") || settings.weather_lat,
                    weather_lon: record.getString("weather_lon") || settings.weather_lon,
                    weather_unit: record.getString("weather_unit") || settings.weather_unit,
                    search_engine: record.getString("search_engine") || settings.search_engine
                };
            }
        } catch (e) {
            console.error("Failed to load settings in settings loader:", e);
        }

        let applications = [];
        try {
            const appRecords = $app.findRecordsByFilter("applications", "1=1", "order, name", 200, 0);
            applications = appRecords.map(app => ({
                id: app.id,
                name: app.getString("name"),
                url: app.getString("url"),
                icon: app.getString("icon"),
                description: app.getString("description"),
                order: app.getInt("order")
            }));
        } catch (e) {}

        let categories = [];
        try {
            const catRecords = $app.findRecordsByFilter("bookmark_categories", "1=1", "order, name", 100, 0);
            categories = catRecords.map(cat => ({
                id: cat.id,
                name: cat.getString("name"),
                order: cat.getInt("order")
            }));
        } catch (e) {}

        let bookmarks = [];
        try {
            const bRecords = $app.findRecordsByFilter("bookmarks", "1=1", "order, name", 1000, 0);
            bookmarks = bRecords.map(b => ({
                id: b.id,
                name: b.getString("name"),
                url: b.getString("url"),
                icon: b.getString("icon"),
                category: b.getString("category"),
                order: b.getInt("order")
            }));
        } catch (e) {}

        return {
            isHome: false,
            settings,
            applications,
            categories,
            bookmarks
        };
    } catch (e) {
        console.error("Failed in settings loader:", e);
        return {
            isHome: false,
            settings: {},
            applications: [],
            categories: [],
            bookmarks: []
        };
    }
}
