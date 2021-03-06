module.exports = function(grunt) {

    // Load tasks
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['server/tests/**/*.js']
            }
        },

        env : {
            options : {
                //Shared Options Hash
                //These Are being used by the node server to do oAuth currently
                TWITTER_CONSUMER_KEY: 'z68u41jMxQIfWc6XxpMWBMAlw',
                TWITTER_CONSUMER_SECRET: 'Ja1rg57feAN0RVJiIWiNYNr4fSM2vuTf9pd4iVzXf9J035pQmm',
                FACEBOOK_APP_ID: '642106902524261',
                FACEBOOK_APP_SECRET: '3698a3cdf3071e66de86ce201a5e2ca4'
                //FACEBOOK_CALLBACK_URL: 'http://forbiddencolors.com/facebook.php?'
            },
            dev : {
                NODE_ENV : 'development'

            },
            test : {
                NODE_ENV : 'test'

            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        clean: ["node_modules", "client/components"]





    });

    grunt.registerTask('serverTests', ['env:test', 'mochaTest']);
    grunt.registerTask('test', ['env:test', 'serverTests']);
    grunt.registerTask('dev', ['env:dev', 'nodemon']);
    grunt.registerTask('serve', ['env:dev', 'nodemon']);

};