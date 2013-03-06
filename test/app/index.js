var app = module.exports = function getServerInstance(params) {
    params = params || {};
    params.root = params.root || __dirname;
    return require('compound').createServer(params);
};
