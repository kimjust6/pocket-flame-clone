/**
 * Loader for the Kanban Board page.
 * Checks authentication and loads todos for the current user.
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
module.exports = function (context) {
    try {
        const user = context.request ? context.request.auth : null
        if (!user) {
            context.response.redirect('/login')
            return
        }

        let todos = []
        try {
            const records = $app.findRecordsByFilter(
                'todos',
                'user = {:user}',
                'order, created',
                500,
                0,
                { user: user.id }
            )

            todos = records.map((r) => ({
                id: r.id,
                title: r.getString('title'),
                description: r.getString('description'),
                status: r.getString('status') || 'todo',
                priority: r.getString('priority') || 'medium',
                order: r.getInt('order') || 0,
                due_date: r.getString('due_date'),
                tags: r.getString('tags'),
                user: r.getString('user'),
                created: r.getString('created'),
                updated: r.getString('updated'),
            }))
        } catch (e) {
            console.error('Failed to fetch todos for kanban:', e)
        }

        return {
            todos,
            user: {
                id: user.id,
                email:
                    typeof user.email === 'function'
                        ? user.email()
                        : user.email || '',
            },
        }
    } catch (e) {
        console.error('Failed to load kanban page data:', e)
        return {
            todos: [],
            user: null,
        }
    }
}
