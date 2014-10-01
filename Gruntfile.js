module.exports = function( grunt ) {
	"use strict";

	// Force use of Unix newlines
	grunt.util.linefeed = "\n";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		jsonlint: {
			all: {
				src: [
					"package.json",
					".jshintrc",
					".jscsrc",
					".csslintrc",
					"bower.json",
					"csscomb.json"
				]
			}
		},

		jshint: {
			all: {
				src: [
					"js/**/*.js", "Gruntfile.js"
				],
				options: {
					jshintrc: true
				}
			}
		},

		jscs: {
			src: "js/**/*.js",
			gruntfile: "Gruntfile.js"
		},

		uglify: {
			options: {
				preserveComments: "some",
				sourceMap: true
			},

			core: {
				files: [ {
					expand: true,
					cwd: "js",
					src: "**/*.js",
					dest: "dest/js"
				} ]
			}
		},

		sass: {
			core: {
				files: [ {
					expand: true,
					cwd: "scss/",
					src: [ "*.scss" ],
					dest: "dist",
					ext: ".css"
				} ]
			}
		},

		autoprefixer: {
			core: {
				options: {
					map: true
				},
				files: [ {
					expand: true,
					cwd: "dist",
					src: [ "*.css" ],
					dest: "dist",
					ext: ".css"
				} ]
			}
		},

		csscomb: {
			options: {
				config: "csscomb.json"
			},
			dist: {
				expand: true,
				cwd: "dist",
				src: [ "*.css" ],
				dest: "dist"
			}
		},

		csslint: {
			options: {
				csslintrc: ".csslintrc"
			},
			dist: {
				expand: true,
				cwd: "dist",
				src: [ "*.css" ]
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					keepalive: true,
					base: "."
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: "scss/**/*.scss",
				tasks: "dist-css"
			},
			js: {
				files: [ "js/**/*.js", "Gruntfile.js" ],
				tasks: "dist-js"
			}
		}
	});

	// These plugins provide necessary tasks.
	require("load-grunt-tasks")(grunt, { scope: "devDependencies" });

	// Javascript distribution task.
	grunt.registerTask("dist-js", [ "jsonlint", "jshint", "jscs", "uglify" ]);

	// CSS distribution task.
	grunt.registerTask("dist-css", [ "sass", "autoprefixer", "csscomb", "csslint" ]);

	// Default task
	grunt.registerTask("default", [ "dist-css", "dist-js", "connect" ]);
};
