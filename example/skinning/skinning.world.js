define({
    // Graphic configs
    graphic: {
        shadow: {
            enable: true,
            shadowCascade: 2,
            cascadeSplitLogFactor: 0.4
        }
    },

    cameras: [{
        name: 'mainCamera',
        position: [0, 200, 300],
        target: [0, 100, 0]
    }],
    
    lights: [{
        name: 'main',
        type: 'directional',
        intensity: 0.7,
        position: [10, 10, 10],
        target: [0, 0, 0],
        shadowResolution: 1024
    }, {
        name: 'ambient',
        type: 'ambient',
        intensity: 0.2
    }],
    
    mainCamera: 'mainCamera',
    
    textures: [{
        target: '2D',
        name: 'groundDiffuse',
        wrapS: 'REPEAT',
        wrapT: 'REPEAT',
        url: '../asset/textures/grid.png',
        anisotropic: 32
    }],
    
    materials: [{
        name: 'ground',
        shader: 'buildin.lambert',
        uniforms: {
            diffuseMap: '#groundDiffuse',
            uvRepeat: [100, 100]
        },
        vertexDefines: {},
        fragmentDefines: {}
    }],

    models: [{
        name: 'baseMale',
        url: '../asset/baseMale/baseMale.json'
    }, {
        name: 'ground',
        procedure: 'plane',
        material: 'ground',
        rotation: [-Math.PI / 2, 0, 0],
        scale: [10000, 10000, 1]
    }],
    
    clips: [{
        name: 'run',
        url: '../asset/baseMale/baseMale@run.json'
    }, {
        name: 'strafeLeft',
        url: '../asset/baseMale/baseMale@strafeLeft.json'
    }, {
        name: 'strafeRight',
        url: '../asset/baseMale/baseMale@strafeRight.json'
    }, {
        name: 'idle',
        url: '../asset/baseMale/baseMale@idle.json'
    }],
    
    entities: [{
        sceneNodePath: 'baseMale',
        components: [{
            type: 'animation',
            clips: [{
                name: 'move',
                type: 'blend',
                blend: '2d',
                autoPlay: true,
                position: [0, 0],
                inputClips: [{
                    name: 'run',
                    type: 'skinning',
                    position: [0, 4]
                }, {
                    name: 'strafeLeft',
                    type: 'skinning',
                    position: [-2, 0],
                    offset: 400
                }, {
                    name: 'strafeRight',
                    type: 'skinning',
                    position: [2, 0]
                }, {
                    name: 'idle',
                    type: 'skinning',
                    position: [0, 0]
                }]
            }]
        }, {
            type: 'plugin',
            scriptUrl: 'baseMale.plugin.js'
        }]
    }, {
        sceneNodePath: 'mainCamera',
        components: [{
            type: 'plugin',
            scriptUrl: '../js/orbitCamera.plugin.js'
        }]
    }]
});