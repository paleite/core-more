module.exports = function(grunt) {
	'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	sass: {
  		core: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dist: {
        expand: true,
        cwd: 'dist/',
        src: ['*.css'],
      }
    },

    csscomb: {
      options: {
        config: 'csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/',
        src: ['*.css'],
        dest: 'dist/'
      }
    },

    autoprefixer: {
      core: {
       options: {
        map: true 
      },
      files: [{
        expand: true,
        cwd: 'dist/',
        src: ['*.css'],
        dest: 'dist/',
        ext: '.css',
      }]
    },

    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true,
          base: '.'
        }
      }
    }
  },

  watch: {
    sass: {
     files: 'scss/**/*.scss',
     tasks: 'dist-css'
   }
 }
});

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  // CSS distribution task.
  grunt.registerTask('dist-css', ['sass', 'autoprefixer', 'csscomb', 'csslint']);

  // Default task  
  grunt.registerTask('default', ['dist-css', 'connect']);
};