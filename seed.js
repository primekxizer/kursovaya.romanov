const sequelize = require('./src/config/database');
const Category = require('./src/models/Category');
const Subcategory = require('./src/models/Subcategory');
const Product = require('./src/models/Product');

async function seed() {
    try {

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await Product.drop();
        await Subcategory.drop();
        await Category.drop();
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        await sequelize.sync({ force: true });

        // Создание категорий
        const categories = await Category.bulkCreate([
            { name: 'Одежда' },
            { name: 'Обувь' },
            { name: 'Аксессуары' },
            { name: 'Спорт' },
            { name: 'Бренды' }
        ]);

        // Создание подкатегорий
        const subcategories = await Subcategory.bulkCreate([
            { name: 'Рубашки', categoryId: categories[0].id },
            { name: 'Худи', categoryId: categories[0].id },
            { name: 'Adidas', categoryId: categories[1].id },
            { name: 'Nike', categoryId: categories[1].id },
            { name: 'Asics', categoryId: categories[1].id },
            { name: 'Кошельки', categoryId: categories[2].id },
            { name: 'Сумки', categoryId: categories[2].id },
            { name: 'Головные уборы', categoryId: categories[2].id },
            { name: 'Спортивные штаны', categoryId: categories[3].id },
            { name: 'Спортивная обувь', categoryId: categories[3].id },
            { name: 'Adidas', categoryId: categories[4].id },
            { name: 'Moncler', categoryId: categories[4].id },
            { name: 'V\'lone', categoryId: categories[4].id },
            { name: 'Carhartt', categoryId: categories[4].id }
        ]);

        console.log('Данные успешно добавлены!');
    } catch (err) {
        console.error('Ошибка при добавлении данных:', err);
    } finally {
        await sequelize.close();
    }
}

seed();
