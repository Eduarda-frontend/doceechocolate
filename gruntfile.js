module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/style.css': 'src/styles/**/style.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/style.min.css': 'src/styles/**/style.less'
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
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['replace:dev']
            },
            images: {
                files: ['src/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
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

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['watch', 'copy:dev']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'imagemin:dist', 'uglify']);

};
