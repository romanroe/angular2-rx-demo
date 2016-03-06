'use strict';
var GulpConfig = (function () {
    function GulpConfig() {

        // ----------------------------------------------------------
        // Vendor
        // ----------------------------------------------------------

        this.vendor = [
            "node_modules/jquery/dist/jquery.js",
            "node_modules/lodash/lodash.js",

            "node_modules/es6-shim/es6-shim.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/systemjs/dist/system.js",
            "node_modules/angular2/bundles/angular2-polyfills.js",
            "node_modules/rxjs/bundles/Rx.js",
            "node_modules/angular2/bundles/angular2.dev.js",

            "node_modules/bootstrap/dist/css/bootstrap.css",
            "node_modules/bootstrap/dist/js/bootstrap.js"
        ];

        // ----------------------------------------------------------
        // Source Paths
        // ----------------------------------------------------------

        this.revAllOptions = {
            dontRenameFile: ["index.html"]
        };

        // Relative to Root folder

        this.htmlFiles = [
            "**/*.html"
        ];

        this.cssFiles = [
            "**/*.css"
        ];

        this.scssFiles = [
            "!**/_*.scss",
            "**/*.scss"
        ];

        this.scssRebuildAllFiles = [
            "**/_*.scss"
        ];

        this.typeScriptFiles = [
            "**/*.ts"
        ];
        this.typeScriptLintFiles = [
            "**/*.ts"
        ];

        this.javaScriptFiles = [
            "**/*.js"
        ];

        // Relative to Root folder

        this.typeScriptDefinitions = [
            "typings/main.d.ts"
            //"node_modules/rxjs/**/*.d.ts"
            //"node_modules/typescript/lib/lib.core.es6.d.ts"
        ];

        this.copyFiles = [
            ["bower_components/bootstrap/dist/fonts/**/*", "fonts"],
            ["bower_components/font-awesome/fonts/*.woff", "fonts"]
            //,
            //["src/**/*.ts", ""]
        ];

        // ----------------------------------------------------------
        // SystemJS
        // ----------------------------------------------------------

        this.systemImportMain = "app/main";

        this.systemJSConfig = {
            //baseURL: '',
            //defaultJSExtensions: true,
            emitDecoratorMetadata: true,
            //"paths": {
            //    "*": "*.js"
            //}

            packages: {'app': {defaultExtension: 'js'}}

        };

        // ----------------------------------------------------------
        // Output
        // ----------------------------------------------------------

        this.target = "target";

        this.targetApp = this.target + "/build";

        this.targetJs = this.targetApp;

        // ----------------------------------------------------------
        // BrowserSync
        // ----------------------------------------------------------

        this.browserSyncOptions = {
            injectChanges: true,
            reloadDelay: 750,
            open: false,
            online: true,
            reloadOnRestart: true,
            port: 9999,
            //proxy: {
            //    target: "http://localhost:8080",
            //    ws: true
            //},
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            },
            server: {
                baseDir: this.targetApp,
                directory: true

            }//,
            //files: this.targetApp + '/**/*'
        };

    }

    return GulpConfig;
})();
module.exports = GulpConfig;
