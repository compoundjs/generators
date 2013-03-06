describe('crud', function() {
    var app = getApp();

    before(function() {
    });

    it('should generate scaffold', function() {
        app.generators.perform('scaffold', ['post', 'title', 'content']);
    });
});
