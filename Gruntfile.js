module.exports = function (grunt) {
    var pkgConfig = grunt.file.readJSON('package.json');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
            pkg: pkgConfig,
            less: {
                development: {
                    files: {
                        "../target/classes/META-INF/resources/felles-design/css": "src/main/webapp/less/felles-design.less",
                        "dist/css/felles-design.css": "src/main/webapp/less/felles-design.less",
                        "../target/classes/META-INF/resources/bootstrap/css": "src/main/webapp/node_modules/bootstrap/less/bootstrap.less",
                        "dist/css/bootstrap.css": "src/main/webapp/node_modules/bootstrap/less/bootstrap.less"
                    }
                }
            },
            copy: {
                dist: {
                    files: [
                        // includes files within path
                        {
                            flatten: false,
                            expand: true,
                            cwd: '<%= pkg.src %>/main/resources/META-INF/resources/felles-design/',
                            src: ['**'],
                            dest: '<%= pkg.dist %>/',
                            filter: 'isFile'
                        },
                        {
                            flatten: true,
                            expand: true,
                            src: ['<%= pkg.src %>/images/*'],
                            dest: '<%= pkg.dist %>/images/'
                        }
                    ]
                },
                example: {
                    files: [{
                        flatten: false,
                        expand: true,
                        cwd: '<%= pkg.dist %>/',
                        src: ['**'],
                        dest: '<%= pkg.src %>/doc/examples/felles-design/',
                        filter: 'isFile'
                    }]
                },
                bootstrapVariables: {
                    files: [
                        {
                            flatten: false,
                            expand: true,
                            cwd: '<%= pkg.src %>/main/webapp/less/bootstrap/',
                            src: 'variables.less',
                            dest: '<%= pkg.src %>/main/webapp/node_modules/bootstrap/less/'
                        }]
                }
            },
            connect: {
                base: {
                    options: {
                        base: 'src/doc/examples/felles-design',
                        port: 4040,
                        livereload: true,
                        open: true
                    }
                }
            }
            ,
            watch: {
                files: ['src/main/webapp/less/**/*.less', '*/index.html'],
                tasks: 'build',
                options: {
                    livereload: true,
                    nospawn: true
                }
            }
            ,
            clean: {
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '<%= pkg.dist %>'
                        ]
                    }]
                }
            }
        }
    )
    ;

    grunt.event.on('watch', function (action, filepath) {
        grunt.task.run(['build']);
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean:dist', 'copy:bootstrapVariables', 'less', 'copy:dist', 'copy:example']);
    grunt.registerTask('default', ['connect:base', 'watch']);

}
;
