module.exports = function( grunt ) {
	"use strict";

	// Force use of Unix newlines
	grunt.util.linefeed = "\n";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jsonlint: {
			pkg: {
				src: [ "package.json" ]
			},
			jshintrc: {
				src: [ ".jshintrc" ]
			},
			jscsrc: {
				src: [ ".jscsrc" ]
			},
			csslintrc: {
				src: [ ".csslintrc" ]
			},
			bower: {
				src: [ "bower.json" ]
			},
			csscomb: {
				src: [ "csscomb.json" ]
			}
		},
		jshint: {
			all: {
				src: [
					"src/**/*.js", "Gruntfile.js"
				],
				options: {
					jshintrc: true
				}
			}
		},
		jscs: {
			//src: "**/*.js",
			gruntfile: "Gruntfile.js"
		},
		sass: {
			core: {
				files: [ {
					expand: true,
					cwd: "scss/",
					src: [ "*.scss" ],
					dest: "dist/",
					ext: ".css"
				} ]
			}
		},
		csslint: {
			options: {
				csslintrc: ".csslintrc"
			},
			dist: {
				expand: true,
				cwd: "dist/",
				src: [ "*.css" ]
			}
		},
		csscomb: {
			options: {
				config: "csscomb.json"
			},
			dist: {
				expand: true,
				cwd: "dist/",
				src: [ "*.css" ],
				dest: "dist/"
			}
		},
		autoprefixer: {
			core: {
				options: {
					map: true
				},
				files: [ {
					expand: true,
					cwd: "dist/",
					src: [ "*.css" ],
					dest: "dist/",
					ext: ".css"
				} ]
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

	grunt.registerTask("dist-js", [ "jsonlint", "jshint", "jscs" ]);

	// CSS distribution task.
	grunt.registerTask("dist-css", [ "sass", "autoprefixer", "csscomb", "csslint" ]);

	// Default task
	grunt.registerTask("default", [ "dist-css", "dist-js", "connect" ]);
};
