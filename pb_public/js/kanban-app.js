/**
 * Flame Kanban Board - Client Application Module
 * Handles state management, drag-and-drop, customizable stages,
 * subtask checklists, and real-time socket synchronization.
 */
; (function (global) {
    'use strict'

    // Color definitions for customizable stages
    const STAGE_COLOR_MAP = {
        primary: { dot: 'bg-primary', badge: 'badge-primary badge-outline' },
        warning: { dot: 'bg-warning', badge: 'badge-warning badge-outline' },
        info: { dot: 'bg-info', badge: 'badge-info badge-outline' },
        success: { dot: 'bg-success', badge: 'badge-success badge-outline' },
        secondary: {
            dot: 'bg-secondary',
            badge: 'badge-secondary badge-outline',
        },
        accent: { dot: 'bg-accent', badge: 'badge-accent badge-outline' },
        error: { dot: 'bg-error', badge: 'badge-error badge-outline' },
    }

    const PRIORITY_MAP = {
        urgent: {
            label: '🔥 Urgent',
            badge: 'bg-error/15 text-error border border-error/30',
        },
        high: {
            label: '⚠️ High',
            badge: 'bg-warning/15 text-warning border border-warning/30',
        },
        medium: {
            label: '🔷 Medium',
            badge: 'bg-info/15 text-info border border-info/30',
        },
        low: {
            label: '🟢 Low',
            badge: 'bg-success/15 text-success border border-success/30',
        },
    }

    const DEFAULT_STAGES = [
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

    /**
     * Parse raw initial JSON payload safely.
     * @param {string} elementId - ID of JSON script tag
     * @returns {object}
     */
    function loadInitialPayload(elementId) {
        const raw = document.getElementById(elementId)?.textContent || '{}'
        try {
            return JSON.parse(raw)
        } catch (e) {
            console.error('Failed to parse initial kanban payload:', e)
            return {}
        }
    }

    /**
     * Generates a unique client-side identifier for subtasks.
     * @returns {string}
     */
    function generateSubtaskId() {
        return (
            'st_' +
            Date.now() +
            '_' +
            Math.random().toString(36).substring(2, 6)
        )
    }

    /**
     * Converts stage title to slug key.
     * @param {string} name
     * @returns {string}
     */
    function slugify(name) {
        return (
            name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '_')
                .replace(/^_+|_+$/g, '') || 'stage_' + Date.now()
        )
    }

    /**
     * Main Alpine.js Kanban Component Factory
     */
    function kanbanApp() {
        const initial = loadInitialPayload('kanban-initial-data')

        const baseComponent = {
            // Data Collections
            todos: Array.isArray(initial.todos) ? initial.todos : [],
            stages:
                Array.isArray(initial.stages) && initial.stages.length > 0
                    ? initial.stages
                    : JSON.parse(JSON.stringify(DEFAULT_STAGES)),
            userId: initial.user?.id || '',
            userEmail: initial.user?.email || '',

            // Real-time Sockets State
            pb: null,
            socketStatus: 'connecting', // 'connected' | 'connecting' | 'disconnected'
            socketStatusText: 'Connecting Sockets...',
            lastSocketActivity: '',
            broadcastChannel: null,

            // Filter & Search State
            searchQuery: '',
            filterPriority: 'all',

            // Drag and Drop State
            draggedTaskId: null,
            dragOverColumn: null,

            // Task Modal State
            modalOpen: false,
            saving: false,
            seeding: false,
            newSubtaskTitle: '',
            taskForm: {
                id: '',
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                due_date: '',
                tags: '',
                subtasks: [],
            },

            // Stages Modal State
            stagesModalOpen: false,
            savingStages: false,
            newStageName: '',
            stagesForm: [],

            // --- COMPUTED PROPERTIES ---

            get sortedStages() {
                return [...this.stages].sort(
                    (a, b) => (a.order || 0) - (b.order || 0)
                )
            },

            get totalSubtasksCount() {
                return this.todos.reduce(
                    (acc, t) => acc + (t.subtasks ? t.subtasks.length : 0),
                    0
                )
            },

            get completedSubtasksCount() {
                return this.todos.reduce((acc, t) => {
                    if (!t.subtasks || !Array.isArray(t.subtasks)) return acc
                    return acc + t.subtasks.filter((s) => s.completed).length
                }, 0)
            },

            get urgentCount() {
                const now = new Date()
                return this.todos.filter((t) => {
                    if (t.status === 'done') return false
                    if (t.priority === 'urgent') return true
                    if (t.due_date && new Date(t.due_date) < now) return true
                    return false
                }).length
            },

            // --- INITIALIZATION ---

            async init() {
                await this.initPocketBaseRealtime()
                this.initBroadcastChannel()
            },

            async initPocketBaseRealtime() {
                try {
                    this.socketStatus = 'connecting'
                    this.socketStatusText = 'Connecting Sockets...'

                    this.pb = new PocketBase(window.location.origin)
                    this.pb.authStore.loadFromCookie(document.cookie)

                    // Subscribe to real-time events for todos
                    await this.pb.collection('todos').subscribe('*', (e) => {
                        this.handleTaskSocketEvent(e)
                    })

                    // Subscribe to real-time events for kanban_stages
                    try {
                        await this.pb
                            .collection('kanban_stages')
                            .subscribe('*', (e) => {
                                this.handleStageSocketEvent(e)
                            })
                    } catch (stageErr) {
                        console.warn(
                            'Real-time stages subscription warning:',
                            stageErr
                        )
                    }

                    this.socketStatus = 'connected'
                    this.socketStatusText = 'Live Sockets Active'
                    this.updateSocketActivity('Connected')
                } catch (err) {
                    console.warn('PocketBase realtime subscribe error:', err)
                    this.socketStatus = 'connected'
                    this.socketStatusText = 'Live Sync Ready'
                }
            },

            initBroadcastChannel() {
                if ('BroadcastChannel' in window) {
                    try {
                        this.broadcastChannel = new BroadcastChannel(
                            'flame_kanban_sync'
                        )
                        this.broadcastChannel.onmessage = (event) => {
                            if (event.data?.type === 'TODO_SOCKET_EVENT') {
                                this.handleTaskSocketEvent(
                                    event.data.payload,
                                    true
                                )
                            } else if (
                                event.data?.type === 'STAGE_SOCKET_EVENT'
                            ) {
                                this.handleStageSocketEvent(
                                    event.data.payload,
                                    true
                                )
                            }
                        }
                    } catch (e) {
                        console.warn('BroadcastChannel error:', e)
                    }
                }
            },

            broadcastLocal(type, action, record) {
                if (this.broadcastChannel) {
                    try {
                        this.broadcastChannel.postMessage({
                            type: type,
                            payload: { action, record },
                        })
                    } catch (e) { }
                }
            },

            // --- REAL-TIME EVENT HANDLERS ---

            handleTaskSocketEvent(e, isBroadcast = false) {
                const { action, record } = e
                if (!record) return

                if (this.userId && record.user && record.user !== this.userId) {
                    return
                }

                this.updateSocketActivity(`Task: ${action}`)

                // Normalize subtasks
                if (
                    typeof record.subtasks === 'string' &&
                    record.subtasks.trim()
                ) {
                    try {
                        record.subtasks = JSON.parse(record.subtasks)
                    } catch (err) {
                        record.subtasks = []
                    }
                }
                if (!Array.isArray(record.subtasks)) record.subtasks = []

                if (action === 'create') {
                    const idx = this.todos.findIndex((t) => t.id === record.id)
                    if (idx === -1) {
                        this.todos.push(record)
                        if (!isBroadcast) {
                            this.showToast(
                                `✨ Live task added: "${record.title}"`,
                                'info',
                                2500
                            )
                        }
                    }
                } else if (action === 'update') {
                    const idx = this.todos.findIndex((t) => t.id === record.id)
                    if (idx !== -1) {
                        this.todos.splice(idx, 1, {
                            ...this.todos[idx],
                            ...record,
                        })
                        if (this.taskForm.id === record.id && !this.modalOpen) {
                            this.taskForm = { ...record }
                        }
                    } else {
                        this.todos.push(record)
                    }
                    if (!isBroadcast) {
                        this.showToast(
                            `Update: "${record.title}"`,
                            'info',
                            2000
                        )
                    }
                } else if (action === 'delete') {
                    this.todos = this.todos.filter((t) => t.id !== record.id)
                    if (this.taskForm.id === record.id) {
                        this.closeTaskModal()
                    }
                    if (!isBroadcast) {
                        this.showToast(
                            'Task removed via live sync',
                            'info',
                            2000
                        )
                    }
                }
            },

            handleStageSocketEvent(e, isBroadcast = false) {
                const { action, record } = e
                if (!record) return

                if (this.userId && record.user && record.user !== this.userId) {
                    return
                }

                this.updateSocketActivity(`Stage: ${action}`)

                if (action === 'create') {
                    const idx = this.stages.findIndex(
                        (s) => s.id === record.id || s.key === record.key
                    )
                    if (idx === -1) {
                        this.stages.push(record)
                    } else {
                        this.stages.splice(idx, 1, record)
                    }
                    if (!isBroadcast) {
                        this.showToast(
                            `✨ Stage added: "${record.name}"`,
                            'info',
                            2000
                        )
                    }
                } else if (action === 'update') {
                    const idx = this.stages.findIndex(
                        (s) => s.id === record.id || s.key === record.key
                    )
                    if (idx !== -1) {
                        this.stages.splice(idx, 1, {
                            ...this.stages[idx],
                            ...record,
                        })
                    } else {
                        this.stages.push(record)
                    }
                } else if (action === 'delete') {
                    this.stages = this.stages.filter(
                        (s) => s.id !== record.id && s.key !== record.key
                    )
                }
            },

            updateSocketActivity(label) {
                const time = new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
                this.lastSocketActivity = `${label} ${time}`
            },

            async refreshRealtime() {
                try {
                    if (this.pb) {
                        await this.pb.collection('todos').unsubscribe('*')
                        await this.pb
                            .collection('kanban_stages')
                            .unsubscribe('*')
                    }
                } catch (e) { }
                await this.initPocketBaseRealtime()
                this.showToast(
                    'Reconnected live socket subscription',
                    'success',
                    2000
                )
            },

            // --- FILTERING & CARD RETRIEVAL ---

            getCardsByStatus(status) {
                return this.todos.filter((t) => (t.status || 'todo') === status)
            },

            getFilteredCards(status) {
                return this.getCardsByStatus(status)
                    .filter((task) => {
                        if (
                            this.filterPriority !== 'all' &&
                            (task.priority || 'medium') !== this.filterPriority
                        ) {
                            return false
                        }
                        if (this.searchQuery.trim()) {
                            const q = this.searchQuery.toLowerCase()
                            const titleMatch = (task.title || '')
                                .toLowerCase()
                                .includes(q)
                            const descMatch = (task.description || '')
                                .toLowerCase()
                                .includes(q)
                            const tagsMatch = (task.tags || '')
                                .toLowerCase()
                                .includes(q)
                            const subtasksMatch = (task.subtasks || []).some(
                                (s) => (s.title || '').toLowerCase().includes(q)
                            )
                            if (
                                !titleMatch &&
                                !descMatch &&
                                !tagsMatch &&
                                !subtasksMatch
                            )
                                return false
                        }
                        return true
                    })
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
            },

            // --- SUBTASKS LOGIC ---

            countCompletedSubtasks(task) {
                if (!task.subtasks || !Array.isArray(task.subtasks)) return 0
                return task.subtasks.filter((s) => s.completed).length
            },

            async toggleCardSubtask(task, subtaskId) {
                if (!task.subtasks) return
                const sub = task.subtasks.find((s) => s.id === subtaskId)
                if (!sub) return

                sub.completed = !sub.completed
                this.broadcastLocal('TODO_SOCKET_EVENT', 'update', task)

                try {
                    if (this.pb) {
                        await this.pb.collection('todos').update(task.id, {
                            subtasks: task.subtasks,
                            user: this.userId,
                        })
                    }
                } catch (err) {
                    console.error('Failed to update subtask:', err)
                    sub.completed = !sub.completed
                    this.showToast('Failed to update subtask', 'error')
                }
            },

            addSubtaskToForm() {
                if (!this.newSubtaskTitle.trim()) return
                if (!Array.isArray(this.taskForm.subtasks)) {
                    this.taskForm.subtasks = []
                }
                this.taskForm.subtasks.push({
                    id: generateSubtaskId(),
                    title: this.newSubtaskTitle.trim(),
                    completed: false,
                })
                this.newSubtaskTitle = ''
            },

            removeSubtaskFromForm(index) {
                if (Array.isArray(this.taskForm.subtasks)) {
                    this.taskForm.subtasks.splice(index, 1)
                }
            },

            // --- DRAG AND DROP ---

            onDragStart(event, task) {
                this.draggedTaskId = task.id
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('text/plain', task.id)
            },

            onDragEnd() {
                this.draggedTaskId = null
                this.dragOverColumn = null
            },

            onDragOverCol(colKey) {
                this.dragOverColumn = colKey
            },

            onDragLeaveCol(colKey) {
                if (this.dragOverColumn === colKey) {
                    this.dragOverColumn = null
                }
            },

            async onDropCol(colKey) {
                const taskId = this.draggedTaskId
                this.dragOverColumn = null
                this.draggedTaskId = null

                if (!taskId) return
                const task = this.todos.find((t) => t.id === taskId)
                if (!task || task.status === colKey) return

                await this.changeTaskStatus(task, colKey)
            },

            async changeTaskStatus(task, newStatus) {
                const prevStatus = task.status
                task.status = newStatus

                this.broadcastLocal('TODO_SOCKET_EVENT', 'update', task)

                try {
                    if (this.pb) {
                        await this.pb.collection('todos').update(task.id, {
                            status: newStatus,
                            user: this.userId,
                        })
                    }
                    const stageObj = this.stages.find(
                        (s) => s.key === newStatus
                    )
                    this.showToast(
                        `Moved to ${stageObj?.name || newStatus}`,
                        'success',
                        1500
                    )
                } catch (err) {
                    console.error('Failed to update task status:', err)
                    task.status = prevStatus
                    this.showToast(
                        'Failed to move task: ' + (err.message || 'Error'),
                        'error'
                    )
                }
            },

            canMoveLeft(status) {
                const sortedKeys = this.sortedStages.map((s) => s.key)
                return sortedKeys.indexOf(status) > 0
            },

            canMoveRight(status) {
                const sortedKeys = this.sortedStages.map((s) => s.key)
                const idx = sortedKeys.indexOf(status)
                return idx >= 0 && idx < sortedKeys.length - 1
            },

            async moveTaskStep(task, direction) {
                const sortedKeys = this.sortedStages.map((s) => s.key)
                const currentIndex = sortedKeys.indexOf(
                    task.status || sortedKeys[0] || 'todo'
                )
                const nextIndex = currentIndex + direction
                if (nextIndex >= 0 && nextIndex < sortedKeys.length) {
                    await this.changeTaskStatus(task, sortedKeys[nextIndex])
                }
            },

            // --- TASK MODAL & CRUD ---

            openTaskModal(task = null, defaultCol = null) {
                const fallbackCol = this.stages.length
                    ? this.stages[0].key
                    : 'todo'
                if (task) {
                    this.taskForm = {
                        id: task.id,
                        title: task.title || '',
                        description: task.description || '',
                        status: task.status || fallbackCol,
                        priority: task.priority || 'medium',
                        due_date: task.due_date || '',
                        tags: task.tags || '',
                        subtasks: Array.isArray(task.subtasks)
                            ? JSON.parse(JSON.stringify(task.subtasks))
                            : [],
                    }
                } else {
                    this.taskForm = {
                        id: '',
                        title: '',
                        description: '',
                        status: defaultCol || fallbackCol,
                        priority: 'medium',
                        due_date: '',
                        tags: '',
                        subtasks: [],
                    }
                }
                this.newSubtaskTitle = ''
                this.modalOpen = true
            },

            closeTaskModal() {
                this.modalOpen = false
                this.newSubtaskTitle = ''
                this.taskForm = {
                    id: '',
                    title: '',
                    description: '',
                    status: 'todo',
                    priority: 'medium',
                    due_date: '',
                    tags: '',
                    subtasks: [],
                }
            },

            async saveTask() {
                if (!this.taskForm.title.trim()) {
                    this.showToast('Please enter a task title', 'warning')
                    return
                }

                this.saving = true
                const payload = {
                    title: this.taskForm.title.trim(),
                    description: this.taskForm.description || '',
                    status:
                        this.taskForm.status || this.stages[0]?.key || 'todo',
                    priority: this.taskForm.priority || 'medium',
                    due_date: this.taskForm.due_date || '',
                    tags: this.taskForm.tags || '',
                    subtasks: Array.isArray(this.taskForm.subtasks)
                        ? this.taskForm.subtasks
                        : [],
                    user: this.userId,
                }

                try {
                    if (this.taskForm.id) {
                        const updated = await this.pb
                            .collection('todos')
                            .update(this.taskForm.id, payload)
                        const idx = this.todos.findIndex(
                            (t) => t.id === this.taskForm.id
                        )
                        if (idx !== -1) {
                            this.todos.splice(idx, 1, {
                                ...this.todos[idx],
                                ...updated,
                            })
                        }
                        this.broadcastLocal(
                            'TODO_SOCKET_EVENT',
                            'update',
                            updated
                        )
                        this.showToast('Task updated', 'success', 2000)
                    } else {
                        payload.order = this.getCardsByStatus(
                            payload.status
                        ).length
                        const created = await this.pb
                            .collection('todos')
                            .create(payload)
                        this.todos.push(created)
                        this.broadcastLocal(
                            'TODO_SOCKET_EVENT',
                            'create',
                            created
                        )
                        this.showToast('Task created', 'success', 2000)
                    }
                    this.closeTaskModal()
                } catch (err) {
                    console.error('Failed to save task:', err)
                    this.showToast(
                        'Error saving task: ' +
                        (err.message || 'Unknown error'),
                        'error'
                    )
                } finally {
                    this.saving = false
                }
            },

            async deleteTask(taskId) {
                if (!confirm('Are you sure you want to delete this task?'))
                    return

                try {
                    await this.pb.collection('todos').delete(taskId)
                    this.todos = this.todos.filter((t) => t.id !== taskId)
                    this.broadcastLocal('TODO_SOCKET_EVENT', 'delete', {
                        id: taskId,
                    })
                    this.closeTaskModal()
                    this.showToast('Task deleted', 'info', 2000)
                } catch (err) {
                    console.error('Failed to delete task:', err)
                    this.showToast(
                        'Failed to delete task: ' + (err.message || 'Error'),
                        'error'
                    )
                }
            },

            async clearCompletedTasks() {
                const doneTasks = this.getCardsByStatus('done')
                if (!doneTasks.length) return
                if (
                    !confirm(`Clear all ${doneTasks.length} completed task(s)?`)
                )
                    return

                try {
                    for (const task of doneTasks) {
                        await this.pb.collection('todos').delete(task.id)
                        this.broadcastLocal('TODO_SOCKET_EVENT', 'delete', {
                            id: task.id,
                        })
                    }
                    this.todos = this.todos.filter((t) => t.status !== 'done')
                    this.showToast(
                        `Cleared ${doneTasks.length} completed tasks`,
                        'success',
                        2000
                    )
                } catch (err) {
                    console.error('Failed to clear completed tasks:', err)
                    this.showToast(
                        'Error clearing tasks: ' + err.message,
                        'error'
                    )
                }
            },

            // --- STAGE CUSTOMIZATION MANAGEMENT ---

            openStagesModal() {
                this.stagesForm = JSON.parse(JSON.stringify(this.sortedStages))
                this.newStageName = ''
                this.stagesModalOpen = true
            },

            closeStagesModal() {
                this.stagesModalOpen = false
                this.newStageName = ''
            },

            addNewStage() {
                if (!this.newStageName.trim()) return
                const name = this.newStageName.trim()
                const key = slugify(name)
                const colorOptions = [
                    'primary',
                    'warning',
                    'info',
                    'success',
                    'secondary',
                    'accent',
                    'error',
                ]
                const color =
                    colorOptions[this.stagesForm.length % colorOptions.length]

                this.stagesForm.push({
                    id: '',
                    name: name,
                    key: key,
                    color: color,
                    order: this.stagesForm.length,
                })
                this.newStageName = ''
            },

            deleteStage(index) {
                if (this.stagesForm.length <= 1) {
                    this.showToast('At least one stage is required', 'warning')
                    return
                }
                const stageToDelete = this.stagesForm[index]
                const affectedTasks = this.getCardsByStatus(stageToDelete.key)
                if (affectedTasks.length > 0) {
                    if (
                        !confirm(
                            `This stage contains ${affectedTasks.length} task(s). They will be moved to the first stage. Continue?`
                        )
                    ) {
                        return
                    }
                }
                this.stagesForm.splice(index, 1)
                this.stagesForm.forEach((s, idx) => (s.order = idx))
            },

            moveStageOrder(index, direction) {
                const targetIdx = index + direction
                if (targetIdx < 0 || targetIdx >= this.stagesForm.length) return
                const temp = this.stagesForm[index]
                this.stagesForm[index] = this.stagesForm[targetIdx]
                this.stagesForm[targetIdx] = temp
                this.stagesForm.forEach((s, idx) => (s.order = idx))
            },

            resetToDefaultStages() {
                if (
                    !confirm(
                        'Reset stages to default (To Do, In Progress, In Review, Done)?'
                    )
                )
                    return
                this.stagesForm = JSON.parse(JSON.stringify(DEFAULT_STAGES))
            },

            async saveAllStages() {
                this.savingStages = true
                try {
                    this.stagesForm.forEach((s, idx) => (s.order = idx))

                    const existingStageIds = this.stages
                        .filter((s) => s.id && !s.id.startsWith('default_'))
                        .map((s) => s.id)
                    const keptStageIds = this.stagesForm
                        .filter((s) => s.id)
                        .map((s) => s.id)
                    const deletedIds = existingStageIds.filter(
                        (id) => !keptStageIds.includes(id)
                    )

                    // Remove deleted stages from database
                    for (const id of deletedIds) {
                        try {
                            await this.pb.collection('kanban_stages').delete(id)
                            this.broadcastLocal(
                                'STAGE_SOCKET_EVENT',
                                'delete',
                                { id }
                            )
                        } catch (e) { }
                    }

                    // Move orphaned tasks to first available stage
                    const remainingKeys = this.stagesForm.map((s) => s.key)
                    const firstKey = remainingKeys[0] || 'todo'
                    for (const t of this.todos) {
                        if (!remainingKeys.includes(t.status)) {
                            t.status = firstKey
                            try {
                                await this.pb.collection('todos').update(t.id, {
                                    status: firstKey,
                                    user: this.userId,
                                })
                                this.broadcastLocal(
                                    'TODO_SOCKET_EVENT',
                                    'update',
                                    t
                                )
                            } catch (e) { }
                        }
                    }

                    // Save or update stages
                    const savedStages = []
                    for (const st of this.stagesForm) {
                        const payload = {
                            name: st.name.trim(),
                            key: st.key,
                            color: st.color || 'primary',
                            order: st.order,
                            user: this.userId,
                        }

                        if (st.id && !st.id.startsWith('default_')) {
                            const updated = await this.pb
                                .collection('kanban_stages')
                                .update(st.id, payload)
                            savedStages.push(updated)
                            this.broadcastLocal(
                                'STAGE_SOCKET_EVENT',
                                'update',
                                updated
                            )
                        } else {
                            const created = await this.pb
                                .collection('kanban_stages')
                                .create(payload)
                            savedStages.push(created)
                            this.broadcastLocal(
                                'STAGE_SOCKET_EVENT',
                                'create',
                                created
                            )
                        }
                    }

                    this.stages = savedStages
                    this.closeStagesModal()
                    this.showToast('Stages saved and synced!', 'success', 2000)
                } catch (err) {
                    console.error('Failed to save stages:', err)
                    this.showToast(
                        'Error saving stages: ' + (err.message || 'Error'),
                        'error'
                    )
                } finally {
                    this.savingStages = false
                }
            },

            // --- STARTER TASKS SEEDING ---

            async seedStarterTasks() {
                this.seeding = true
                const sampleTasks = [
                    {
                        title: 'Explore Flame Dashboard & Bookmarks',
                        description:
                            'Organize applications, custom categories, and bookmark URLs for quick startpage access.',
                        status: 'done',
                        priority: 'low',
                        tags: 'setup, flame',
                        order: 0,
                        subtasks: [
                            {
                                id: 'st_1',
                                title: 'Check dashboard categories grid',
                                completed: true,
                            },
                            {
                                id: 'st_2',
                                title: 'Customize colors in Settings manager',
                                completed: true,
                            },
                        ],
                    },
                    {
                        title: 'Test Live Sockets & Subtasks',
                        description:
                            'Open a second browser tab or window at /kanban. Toggle subtasks or drag cards to watch both boards update live instantaneously!',
                        status: 'in_progress',
                        priority: 'urgent',
                        tags: 'realtime, sockets',
                        order: 0,
                        subtasks: [
                            {
                                id: 'st_3',
                                title: 'Open /kanban in another browser window',
                                completed: false,
                            },
                            {
                                id: 'st_4',
                                title: 'Toggle a subtask checkbox to test live socket update',
                                completed: false,
                            },
                            {
                                id: 'st_5',
                                title: 'Drag card across custom stages',
                                completed: false,
                            },
                        ],
                    },
                    {
                        title: 'Configure Weather & Theme Settings',
                        description:
                            'Adjust accent colors, light/dark modes, and weather coordinates in the Settings manager.',
                        status: 'in_progress',
                        priority: 'medium',
                        tags: 'theme, settings',
                        order: 1,
                        subtasks: [
                            {
                                id: 'st_6',
                                title: 'Set latitude and longitude in settings',
                                completed: false,
                            },
                            {
                                id: 'st_7',
                                title: 'Pick temperature unit (Celsius or Fahrenheit)',
                                completed: true,
                            },
                        ],
                    },
                    {
                        title: 'Connect Immich Photo Slideshow',
                        description:
                            'Add your Immich server URL, API key, and album ID in settings for custom background slideshows.',
                        status: 'review',
                        priority: 'medium',
                        tags: 'immich, integrations',
                        order: 0,
                        subtasks: [
                            {
                                id: 'st_8',
                                title: 'Obtain API key from Immich web UI',
                                completed: false,
                            },
                            {
                                id: 'st_9',
                                title: 'Verify album ID permissions',
                                completed: false,
                            },
                        ],
                    },
                    {
                        title: 'Set up Automated Backup Schedule',
                        description:
                            'Export and backup PocketBase SQLite database pb_data periodically.',
                        status: 'todo',
                        priority: 'high',
                        tags: 'devops, backup',
                        order: 0,
                        subtasks: [
                            {
                                id: 'st_10',
                                title: 'Create backup cron script',
                                completed: false,
                            },
                            {
                                id: 'st_11',
                                title: 'Verify SQLite snapshot integrity',
                                completed: false,
                            },
                        ],
                    },
                ]

                try {
                    for (const t of sampleTasks) {
                        const created = await this.pb
                            .collection('todos')
                            .create({
                                ...t,
                                user: this.userId,
                            })
                        this.todos.push(created)
                        this.broadcastLocal(
                            'TODO_SOCKET_EVENT',
                            'create',
                            created
                        )
                    }
                    this.showToast(
                        'Loaded starter Kanban tasks with subtasks!',
                        'success',
                        2500
                    )
                } catch (err) {
                    console.error('Error seeding tasks:', err)
                    this.showToast(
                        'Failed to seed tasks: ' + err.message,
                        'error'
                    )
                } finally {
                    this.seeding = false
                }
            },

            // --- UI HELPERS ---

            parseTags(tagsStr) {
                if (!tagsStr) return []
                return tagsStr
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
            },

            priorityLabel(priority) {
                return PRIORITY_MAP[priority]?.label || 'Medium'
            },

            priorityBadgeClass(priority) {
                return (
                    PRIORITY_MAP[priority]?.badge || PRIORITY_MAP.medium.badge
                )
            },

            colorDotClass(color) {
                return (
                    STAGE_COLOR_MAP[color]?.dot || STAGE_COLOR_MAP.primary.dot
                )
            },

            badgeColorClass(color) {
                return (
                    STAGE_COLOR_MAP[color]?.badge ||
                    STAGE_COLOR_MAP.primary.badge
                )
            },

            formatDate(dateStr) {
                if (!dateStr) return ''
                try {
                    const d = new Date(dateStr + 'T00:00:00')
                    return d.toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                    })
                } catch (e) {
                    return dateStr
                }
            },

            isOverdue(dateStr) {
                if (!dateStr) return false
                try {
                    const due = new Date(dateStr + 'T23:59:59')
                    return due < new Date()
                } catch (e) {
                    return false
                }
            },
        }

        return window.withToastHelpers
            ? window.withToastHelpers(baseComponent)
            : baseComponent
    }

    global.kanbanApp = kanbanApp
})(window)
