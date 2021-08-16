
exports.seed = function (knex) {
    return knex('transports').insert([
        { id: '1', color: '#e1202b' },
        { id: '2', color: '#0a78b2' },
        { id: '3', color: '#ba1a79' },
        { id: '4', color: '#2a3270' },
        { id: '5', color: '#bb530f' }
    ]);
};
