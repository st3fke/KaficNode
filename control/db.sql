drop database if exists DB_DBNAME;
create database DB_DBNAME;

use DB_DBNAME;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(255),
    category_id INT,
    availability BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE testimonials (
    testimonial_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO news (title, content, image_url) VALUES
('New Coffee Blend Released', 'We are excited to announce the release of our new coffee blend. This blend is a perfect mix of rich flavors and a smooth finish.', 'blend.jpg'),
('Pastries Now Available', 'We now offer a variety of fresh pastries made daily. Come and try our delicious croissants, muffins, and more.', 'pastries.jpg'),
('Live Music on Weekends', 'Join us every weekend for live music performances by local artists. Enjoy great music while you savor our drinks and snacks.', 'live.jpg'),
('Special Holiday Discounts', "Don\'t miss our special holiday discounts on all our products. Visit our café and enjoy up to 20% off on select items.", 'holiday.png'),
('New Smoothie Flavors', 'Introducing new smoothie flavors! Choose from a variety of refreshing options packed with fruits and nutrients.', 'flavors.jpg');
INSERT INTO categories (name) VALUES
('Coffee'),
('Pastries'),
('Sandwiches'),
('Tea'),
('Cakes'),
('Smoothies');
INSERT INTO products (name, description, price, image_url, category_id, availability) VALUES
('Espresso', 'Strong black coffee made by forcing steam through ground coffee beans.', 3.99, 'espresso.jpg', 1, TRUE),
('Latte', 'Coffee made with espresso and steamed milk.', 4.49, 'latte.jpg', 1, TRUE),
('Croissant', 'Buttery and flaky pastry, perfect for breakfast or a snack.', 2.49, 'croissant.jpg', 2, TRUE),
('Bagel', 'Bread product originating in the Jewish communities of Poland.', 1.99, 'bagel.jpg', 2, FALSE),  -- Not available
('Club Sandwich', 'A delicious sandwich made with turkey, bacon, lettuce, and tomato.', 6.99, 'club_sandwich.jpg', 3, TRUE),
('Grilled Cheese', 'Classic sandwich made with melted cheese between slices of bread.', 5.49, 'grilled_cheese.jpg', 3, TRUE),
('Green Tea', 'Type of tea made from Camellia sinensis leaves.', 3.49, 'green_tea.jpg', 4, TRUE),
('Chai Tea', 'Spiced tea beverage made by brewing black tea with a mixture of aromatic Indian spices and herbs.', 4.99, 'chai_tea.jpg', 4, FALSE),  -- Not available
('Chocolate Cake', 'Rich and moist chocolate cake, perfect for indulging.', 4.99, 'chocolate_cake.jpg', 5, TRUE),
('Carrot Cake', 'Cake that contains grated carrots mixed into the batter.', 5.99, 'carrot_cake.jpg', 5, TRUE),
('Berry Smoothie', 'Refreshing smoothie made with a blend of berries and yogurt.', 5.49, 'berry_smoothie.jpg', 6, TRUE),
('Green Smoothie', 'Healthy smoothie made with leafy greens, fruits, and vegetables.', 5.99, 'green_smoothie.jpg', 6, TRUE);


INSERT INTO testimonials (user_name, email, message) VALUES
('John Doe', 'john@example.com', 'Great coffee and friendly service!'),
('Jane Smith', 'jane@example.com', 'The pastries here are amazing.'),
('Mike Johnson', 'mike@example.com', 'I love their sandwiches!'),
('Emily Davis', 'emily@example.com', 'Best tea in town!'),
('Chris Brown', 'chris@example.com', 'The cakes are to die for!');

INSERT INTO users (first_name, last_name, email, title, message) VALUES
('Alice', 'Johnson', 'alice@example.com', 'Inquiry', 'I have a question about your menu.'),
('Bob', 'Smith', 'bob@example.com', 'Feedback', 'Just wanted to say I love your café!');