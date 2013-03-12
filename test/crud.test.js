var sys = require('sys');

describe('crud', function() {
    var app, compound, output, puts;

    before(function() {
        app = getApp();
        compound = app.compound;
        stubFS();
    });

    after(unstubFS);

    beforeEach(function() {
        output = [];
        puts = sys.puts;
        sys.puts = function(str) {
            output.push(str.replace(/\u001b\[\d+m/g, ''));
        };
    });

    afterEach(function() {
        flushFS();
        sys.puts = puts;
    });

    it('should generate scaffold', function() {
        compound.generators.perform('scaffold', ['post', 'title', 'content']);
        output.should.eql([ 'create  app/',
        'create  app/controllers/',
        'create  app/helpers/',
        'create  app/views/',
        'create  app/views/posts/',
        'create  app/views/layouts',
        'create  test/',
        'create  test/controllers/',
        'create  app/controllers/posts_controller.js',
        'exists  app/',
        'create  app/models/',
        'create  app/models/post.js',
        'create  app/views/layouts/posts_layout.ejs',
        'create  app/views/posts/_form.ejs',
        'create  app/views/posts/show.ejs',
        'create  app/views/posts/new.ejs',
        'create  app/views/posts/edit.ejs',
        'create  app/views/posts/index.ejs',
        'create  app/helpers/posts.js',
        'create  test/controllers/posts_controller_test.js',
        'create  test/test_helper.js']);

        var posts = getFile(app.root + '/app/views/posts/index.ejs');
        posts.should.include('pathTo.edit_post');
        posts.should.include('pathTo.new_post');
        posts.should.not.include('pathTo.edit_posts');
        posts.should.not.include('pathTo.new_posts');

        compound.generators.perform('scaffold', ['users', 'name', 'email', 'modeltest']);

        var users = getFile(app.root + '/app/views/users/index.ejs');
        users.should.include('pathTo.edit_user');
        users.should.include('pathTo.new_user');
        users.should.not.include('pathTo.edit_users');
        users.should.not.include('pathTo.new_users');

        var usersform = getFile(app.root + '/app/views/users/_form.ejs')
        usersform.should.include('form.input("name")');
        usersform.should.include('form.input("email")');
        usersform.should.include('form.input("modeltest")');
    });


    it('should generate scaffold for jade', function() {
        compound.generators.perform('scaffold', ['-tpl', 'jade', 'post', 'title', 'content']);
        output.should.eql([ 'create  app/',
        'create  app/controllers/',
        'create  app/helpers/',
        'create  app/views/',
        'create  app/views/posts/',
        'create  app/views/layouts',
        'create  test/',
        'create  test/controllers/',
        'create  app/controllers/posts_controller.js',
        'exists  app/',
        'create  app/models/',
        'create  app/models/post.js',
        'create  app/views/layouts/posts_layout.jade',
        'create  app/views/posts/_form.jade',
        'create  app/views/posts/show.jade',
        'create  app/views/posts/new.jade',
        'create  app/views/posts/edit.jade',
        'create  app/views/posts/index.jade',
        'create  app/helpers/posts.js',
        'create  test/controllers/posts_controller_test.js',
        'create  test/test_helper.js']);

    });
});
