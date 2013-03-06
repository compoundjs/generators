describe('crud', function() {
    var app = getApp();
    var compound = app.compound;

    it('should generate scaffold', function() {
        compound.generators.perform('scaffold', ['post', 'title', 'content']);
    });
});
