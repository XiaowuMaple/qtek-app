// Plugin is a component which offer the scriptability to user
define(function (require) {

    'use strict';

    var Component = require('../Component');

    var PluginComponent = Component.derive({
        /**
         * Context can only be assigned on create
         */
        _context: null
    }, function (ContextCtor) {
        if (ContextCtor) {
            this._context = new ContextCtor();
        }
    }, {
        type: 'PLUGIN',

        $init: function (entity) {
            Component.prototype.$init.call(this, entity);
            this._invokeContextMethod('init');
        },

        $frame: function () {
            Component.prototype.$frame.call(this);
            this._invokeContextMethod('frame');
        },

        $dispose: function () {
            Component.prototype.$dispose.call(this);
            this._invokeContextMethod('dispose');
        },

        $dispatchEvent: function (name) {
            name = 'on' + name;
            if (this._context && this._context[name]) {
                var args = arguments;
                var handler = this._context[name];
                var entity = this.getEntity();
                switch (args.length) {
                    case 1:
                        handler.call(this._context, entity);
                        break;
                    case 2:
                        handler.call(this._context, entity, args[1]);
                        break;
                    case 3:
                        handler.call(this._context, entity, args[1], args[2]);
                        break;
                    case 4:
                        handler.call(this._context, entity, args[1], args[2], args[3]);
                        break;
                    default:
                        handler.apply(this._context, Array.prototype.slice.call(args, 1));
                        break;
                }
            }
        },

        setContext: function (ContextCtor) {
            this._context = new ContextCtor();
        },

        _invokeContextMethod: function (name) {
            if (this._context && this._context[name]) {
                this._context[name](this.getEntity());
            }
        }
    });

    return PluginComponent;
});