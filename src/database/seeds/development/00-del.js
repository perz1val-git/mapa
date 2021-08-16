exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('orders').del()
    .then(function () {
        return knex('geocode_statuses').del()
    })
    .then(function () {
        return knex('transports').del()
    });
};