module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'wonderfulrecipes',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}