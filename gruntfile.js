module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            development: {
                options: {
                    style: 'expanded',
                    implementation: require('sass')
                },
                files: {
                    'dev/styles/style.css': 'src/styles/main.scss'
                }
            },
            production: {
                options: {
                    implementation: require('sass'),
                    sourceMap: true
                },
                files: {
                    'dist/styles/style.min.css': 'src/styles/main.scss'
                }
            }
        },
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dev/img/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },
        watch: {
            sass: {
                files: ['src/styles/*.scss'],
                tasks: ['sass:development']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['replace:dev']
            },
            images: {
                files: ['src/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            scripts: {
                files: ['src/scripts/*.js'],  // Arquivos monitorados
                tasks: ['copy:dev'],            // Tarefa a ser executada quando houver alterações
                options: {
                    spawn: false,  // Não reiniciar o processo Grunt toda vez
                },
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/style.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/*.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/style.min.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/*.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/*.html',
                }
            },
        },
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/*.js'
                }
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts/',  // Caminho para os scripts de origem
                        src: ['**/*.js'],     // Seleciona todos os arquivos .js
                        dest: 'dev/scripts/'  // Destino para os arquivos copiados
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts/',
                        src: ['**/*.js'],
                        dest: 'dist/scripts/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['watch', 'copy:dev']);
    grunt.registerTask('build', ['sass:production', 'htmlmin:dist', 'replace:dist', 'imagemin:dist', 'uglify']);

};
