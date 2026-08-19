/**
 * Loader for the homepage startpage dashboard.
 * Fetches applications and bookmarks grouped by category.
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
module.exports = function (context) {
    try {
        const user = context.request.auth
        if (!user) {
            context.response.redirect('/login')
            return
        }
        const userFilter = "user = {:user}"
        const filterParams = { user: user.id }

        // Fetch all applications
        let applications = [];
        try {
            const appRecords = $app.findRecordsByFilter("applications", userFilter, "order, name", 200, 0, filterParams);
            applications = appRecords.map(app => ({
                id: app.id,
                name: app.getString("name"),
                url: app.getString("url"),
                icon: app.getString("icon"),
                description: app.getString("description"),
                order: app.getInt("order")
            }));
        } catch (e) {
            console.error("Failed to fetch applications:", e);
        }

        // Fetch categories and bookmarks
        let categories = [];
        let bookmarksByCategory = [];
        try {
            const catRecords = $app.findRecordsByFilter("bookmark_categories", userFilter, "order, name", 100, 0, filterParams);
            categories = catRecords.map(cat => ({
                id: cat.id,
                name: cat.getString("name"),
                order: cat.getInt("order")
            }));

            let bookmarks = [];
            try {
                bookmarks = $app.findRecordsByFilter("bookmarks", userFilter, "order, name", 1000, 0, filterParams);
            } catch (err) {
                console.error("Failed to fetch bookmarks for user:", err);
            }

            bookmarksByCategory = categories.map(cat => {
                const catBookmarks = (bookmarks || []).filter(b => b.getString("category") === cat.id);
                return {
                    id: cat.id,
                    name: cat.name,
                    order: cat.order,
                    bookmarks: catBookmarks.map(b => ({
                        id: b.id,
                        name: b.getString("name"),
                        url: b.getString("url"),
                        icon: b.getString("icon"),
                        order: b.getInt("order")
                    }))
                };
            });
        } catch (e) {
            console.error("Failed to fetch bookmarks:", e);
        }

        return {
            isHome: true,
            applications,
            categories,
            bookmarksByCategory
        };
    } catch (e) {
        console.error('Failed to load startpage data:', e);
        return {
            isHome: true,
            applications: [],
            categories: [],
            bookmarksByCategory: []
        };
    }
}