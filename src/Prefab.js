define(function (require) {

    'use strict';

    var Clazz = require('./Clazz');
    var Node = require('qtek/Node');

    function PrefabInstance(prefab, entities, rootNode) {
        this._entities = entities;
        this._rootNode = rootNode;
        this._prefab = prefab;
    }

    PrefabInstance.prototype.getRootNode = function () {
        return this._rootNode;
    };

    PrefabInstance.prototype.getEntities = function () {
        return this._entities;
    };

    PrefabInstance.prototype.getPrefab = function () {
        return this._prefab;
    };

    PrefabInstance.prototype.$dispose = function () {
        this._prefab.$destroyInstance(this);
    }

    var Prefab = Clazz.derive({
        
        _entities: null,

        _appInstance: null,

        _rootNode: null,

        _instanceCount: 0

    }, function (app3d, name) {
        this._appInstance = app3d;

        this._rootNode = new Node({
            name: name
        });

        this._entities = [];
    }, {

        addEntity: function (entity) {
            if (this._entities.indexOf(entity) < 0) {
                this._entities.push(entity);
            }
        },

        removeEntity: function (entity) {
            this._entities.splice(this._entities.indexOf(entity), 1);
        },

        $getEntities: function () {
            return this._entities;
        },

        $instantiate: function (world) {
            var entities = [];
            var rootNode = world.getScene().cloneNode(this._rootNode);
            rootNode.setName(rootNode.name + '_' + this._instanceCount);

            for (var i = 0; i < this._entities.length; i++) {
                var entity = this._entities[i];
                var newSceneNode = rootNode.queryNode(entity.getSceneNode().getPath());
                var newEntity = entity.clone(newSceneNode);
                entities.push(newEntity);
            }

            this._instanceCount++;

            return new PrefabInstance(this, entities, rootNode);
        },

        $destroyInstance: function (instance) {
            this._instanceCount--;
        },

        getRootNode: function () {
            return this._rootNode;
        }
    });

    return Prefab;
});