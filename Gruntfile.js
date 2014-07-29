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
  grunt.registerTask('dist-css', ['sass', 'autoprefixer']);

  // Default task  
  grunt.registerTask('default', ['dist-css']);
};