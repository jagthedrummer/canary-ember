module.exports = function(grunt) {

  

  grunt.initConfig({
    aws: grunt.file.readJSON('aws-keys.json'),
    s3: {
      options: {
        key: '<%= aws.AWSAccessKeyId %>',
        secret: '<%= aws.AWSSecretKey %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },
      dev: {
        // These options override the defaults
        options: {
          encodePaths: false,
          maxOperations: 20
        },
        // Files to be uploaded.
        upload: [
          {
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'dist/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: '',

            options: {
              headers: {
                // 1 minute cache policy (1000 * 60)
                "Cache-Control": "max-age=60000, public",
                "Expires": new Date(Date.now() + 60000).toUTCString()
              }
            }
          },
          {
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'dist/assets/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: 'assets/'
          }
        ],

      }

    }, // end s3

    hashres: {
      prod: {
        src: [
          'dist/assets/app.js',
          'dist/assets/vendor.css',
          'dist/assets/app.css'
        ],
        dest: 'dist/index.html',
      }
    } // end hashres
  });

  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-hashres');

  // Default task(s).
  grunt.registerTask('default', ['hashres','s3']);

};
