/// <reference path="../pb_data/types.d.ts" />
migrate(
    (app) => {
        const collection = new Collection({
            id: 'pbc_kanbantodos',
            name: 'todos',
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
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'status',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'priority',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'order',
                    type: 'number',
                    required: false,
                },
                {
                    name: 'due_date',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'tags',
                    type: 'text',
                    required: false,
                },
                {
                    cascadeDelete: true,
                    collectionId: '_pb_users_auth_',
                    hidden: false,
                    id: 'relation_todo_user',
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

        return app.save(collection)
    },
    (app) => {
        const collection = app.findCollectionByNameOrId('pbc_kanbantodos')
        return app.delete(collection)
    }
)
