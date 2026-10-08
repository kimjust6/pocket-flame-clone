/**
 * Loader for the Kanban Board page.
 * Checks authentication and loads todos and stages for the current user.
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
module.exports = function (context) {
    try {
        const user = context.request ? context.request.auth : null
        if (!user) {
            context.response.redirect('/login')
            return
        }

        // Fetch todos
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

            todos = records.map((r) => {
                let subtasks = []
                try {
                    const raw = r.get('subtasks')
                    if (Array.isArray(raw)) {
                        subtasks = raw
                    } else if (typeof raw === 'string' && raw.trim()) {
                        subtasks = JSON.parse(raw)
                    }
                } catch (e) {
                    subtasks = []
                }

                return {
                    id: r.id,
                    title: r.getString('title'),
                    description: r.getString('description'),
                    status: r.getString('status') || 'todo',
                    priority: r.getString('priority') || 'medium',
                    order: r.getInt('order') || 0,
                    due_date: r.getString('due_date'),
                    tags: r.getString('tags'),
                    subtasks: Array.isArray(subtasks) ? subtasks : [],
                    user: r.getString('user'),
                    created: r.getString('created'),
                    updated: r.getString('updated'),
                }
            })
        } catch (e) {
            console.error('Failed to fetch todos for kanban:', e)
        }

        // Fetch custom kanban stages
        let stages = []
        try {
            const stageRecords = $app.findRecordsByFilter(
                'kanban_stages',
                'user = {:user}',
                'order, created',
                100,
                0,
                { user: user.id }
            )

            stages = stageRecords.map((s) => ({
                id: s.id,
                name: s.getString('name'),
                key: s.getString('key'),
                color: s.getString('color') || 'primary',
                order: s.getInt('order') || 0,
                user: s.getString('user'),
            }))
        } catch (e) {
            console.error('Failed to fetch kanban stages:', e)
        }

        // Fallback default stages if user hasn't configured any yet
        if (!stages || stages.length === 0) {
            stages = [
                {
                    id: 'default_todo',
                    name: 'To Do',
                    key: 'todo',
                    color: 'primary',
                    order: 0,
                },
                {
                    id: 'default_in_progress',
                    name: 'In Progress',
                    key: 'in_progress',
                    color: 'warning',
                    order: 1,
                },
                {
                    id: 'default_review',
                    name: 'In Review',
                    key: 'review',
                    color: 'info',
                    order: 2,
                },
                {
                    id: 'default_done',
                    name: 'Done',
                    key: 'done',
                    color: 'success',
                    order: 3,
                },
            ]
        }

        return {
            todos,
            stages,
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
            stages: [
                {
                    id: 'default_todo',
                    name: 'To Do',
                    key: 'todo',
                    color: 'primary',
                    order: 0,
                },
                {
                    id: 'default_in_progress',
                    name: 'In Progress',
                    key: 'in_progress',
                    color: 'warning',
                    order: 1,
                },
                {
                    id: 'default_review',
                    name: 'In Review',
                    key: 'review',
                    color: 'info',
                    order: 2,
                },
                {
                    id: 'default_done',
                    name: 'Done',
                    key: 'done',
                    color: 'success',
                    order: 3,
                },
            ],
            user: null,
        }
    }
}
