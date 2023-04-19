module.exports = (sequelize, DataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false,
        },
        awards: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        length: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            /*allowNull: false,*/ 
        },
        /*genre_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }*/

    };

    const config = {
        tableName: 'movies',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };
    
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}