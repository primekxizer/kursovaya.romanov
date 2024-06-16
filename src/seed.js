const sequelize = require('./config/database');
const Product = require('./models/Product');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const categories = [
        { name: 'Одежда', subcategories: ['Худи', 'Футболки'] },
        { name: 'Бренды', subcategories: ['Adidas', 'Nike'] },
        { name: 'Обувь', subcategories: ['Asics', 'Salomon'] },
        { name: 'Аксессуары', subcategories: ['Рюкзаки', 'Кошельки'] },
        { name: 'Электроника', subcategories: ['Смартфоны', 'Наушники'] }
    ];

    const imageUrl = 'https://via.placeholder.com/150';  
    const defaultAvailability = 10; 

    try {
        for (let category of categories) {
            for (let subcategory of category.subcategories) {
                for (let i = 0; i < 10; i++) {
                    await Product.create({
                        name: `Товар ${i + 1}`,
                        price: (Math.random() * 100).toFixed(2),
                        shortDescription: `Краткое описание товара ${i + 1}`,
                        fullDescription: `Полное описание товара ${i + 1}`,
                        category: category.name,
                        subcategory: subcategory,
                        characteristic1: `Характеристика 1 для товара ${i + 1}`,
                        characteristic2: `Характеристика 2 для товара ${i + 1}`,
                        characteristic3: `Характеристика 3 для товара ${i + 1}`,
                        imageUrl: imageUrl,
                        availability: defaultAvailability,  // устанавливаем значение по умолчанию
                    });
                }
            }
        }

        console.log('Database seeded!');
    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    } finally {
        sequelize.close();
    }
};

seedDatabase();
