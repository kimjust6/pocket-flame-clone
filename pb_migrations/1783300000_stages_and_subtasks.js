/// <reference path="../pb_data/types.d.ts" />
migrate(
    (app) => {
        // 1. Add subtasks field to todos
        try {
            const todos = app.findCollectionByNameOrId('todos')
            todos.fields.add(
                new Field({
                    name: 'subtasks',
                    type: 'json',
                    required: false,
                })
            )
            app.save(todos)
        } catch (e) {
            console.error('Error adding subtasks to todos:', e)
        }

        // 2. Create kanban_stages collection
        const stages = new Collection({
            id: 'pbc_kanbanstages',
            name: 'kanban_stages',
            type: 'base',
            system: false,
            listRule: 'user = @request.auth.id',
            viewRule: 'user = @request.auth.id',
            createRule: '@request.auth.id != "" && user = @request.auth.id',
            updateRule: 'user = @request.auth.id',
            deleteRule: 'user = @request.auth.id',
            fields: [
                {
                    autogeneratePattern: '[a-z0-9]{15}',
                    hidden: false,
                    id: 'text3208210256',
                    max: 15,
                    min: 15,
                    name: 'id',
                    pattern: '^[a-z0-9]+$',
                    presentable: false,
                    primaryKey: true,
                    required: true,
                    system: true,
                    type: 'text',
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'key',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'color',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'order',
                    type: 'number',
                    required: false,
                },
                {
                    cascadeDelete: true,
                    collectionId: '_pb_users_auth_',
                    hidden: false,
                    id: 'relation_stage_user',
                    maxSelect: 1,
                    minSelect: 0,
                    name: 'user',
                    presentable: false,
                    required: false,
                    system: false,
                    type: 'relation',
                },
                {
                    hidden: false,
                    id: 'autodate2990389176',
                    name: 'created',
                    onCreate: true,
                    onUpdate: false,
                    presentable: false,
                    system: false,
                    type: 'autodate',
                },
                {
                    hidden: false,
                    id: 'autodate3332085495',
                    name: 'updated',
                    onCreate: true,
                    onUpdate: true,
                    presentable: false,
                    system: false,
                    type: 'autodate',
                },
            ],
        })

        return app.save(stages)
    },
    (app) => {
        try {
            const stages = app.findCollectionByNameOrId('pbc_kanbanstages')
            app.delete(stages)
        } catch (e) {}

        try {
            const todos = app.findCollectionByNameOrId('todos')
            const field = todos.fields.getByName('subtasks')
            if (field) {
                todos.fields.remove(field.id)
                app.save(todos)
            }
        } catch (e) {}
    }
)
