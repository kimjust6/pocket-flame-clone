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

            function extractSubtasks(record) {
                try {
                    const raw = record.getString('subtasks')
                    if (!raw || typeof raw !== 'string' || !raw.trim()) {
                        return []
                    }
                    let parsed = JSON.parse(raw)
                    if (typeof parsed === 'string') {
                        try {
                            parsed = JSON.parse(parsed)
                        } catch (_) {}
                    }
                    if (!Array.isArray(parsed)) {
                        return []
                    }
                    return parsed
                        .filter(
                            (item) =>
                                item &&
                                typeof item === 'object' &&
                                typeof item.title === 'string' &&
                                item.title.trim() !== ''
                        )
                        .map((item, idx) => ({
                            id: String(item.id || 'st_' + (idx + 1)),
                            title: String(item.title).trim(),
                            completed: Boolean(item.completed),
                        }))
                } catch (e) {
                    return []
                }
            }

            todos = records.map((r) => {
                return {
                    id: r.id,
                    title: r.getString('title'),
                    description: r.getString('description'),
                    status: r.getString('status') || 'todo',
                    priority: r.getString('priority') || 'medium',
                    order: r.getInt('order') || 0,
                    due_date: r.getString('due_date'),
                    tags: r.getString('tags'),
                    subtasks: extractSubtasks(r),
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
