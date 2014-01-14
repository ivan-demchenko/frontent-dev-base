module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      coffee: {
        files: ['frontend/src/coffee/**/*.coffee'],
        tasks: ['coffee:dev']
      },
      stylus: {
        files: ['frontend/src/stylus/**/*.styl'],
        tasks:['stylus:dev']
      },
      jade: {
        files: ['frontend/src/jade/**/*.jade'],
        tasks: ['jade:dev']
      }
    },

    coffee: {
      dev: {
        files: [{
          expand: true,
          cwd: 'frontend/src/coffee/',
          src: ['**/*.coffee'],
          dest: 'frontend/builds/dev/js/',
          ext: '.js'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'frontend/src/coffee/',
          src: ['**/*.coffee'],
          dest: 'frontend/temp/js/',
          ext: '.js'
        }]
      }
    },

    stylus: {
      dev: {
        files: [{
          expand: true,
          cwd: 'frontend/src/stylus/',
          src: ['**/*.styl'],
          dest: 'frontend/builds/dev/css/',
          ext: '.css'
        }]
      }
    },

    jade: {
      dev: {
        files: [{
          expand: true,
          cwd: 'frontend/src/jade/',
          src: ['**/*.jade'],
          dest: 'frontend/builds/dev/templates/',
          ext: '.html'
        }]
      }
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      prod: {
        src: ['frontend/temp/js/**/*.js'],
        dest: 'frontend/builds/prod/app.js'
      }
    },

    clean: ['frontend/temp'],

uglify: {
  options: {
    sourceMap: 'frontend/builds/prod/source-map.js',
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    "<%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
  },
  prod: {
    files: {
      'frontend/builds/prod/app.min.js': ['frontend/builds/prod/app.js']
    }
  }
}

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('dev', [
    'coffee:dev', 'stylus:dev', 'jade:dev', 'watch'
  ]);

  grunt.registerTask('default', [
    'coffee:prod', 'concat', 'clean', 'uglify'
  ]);

};