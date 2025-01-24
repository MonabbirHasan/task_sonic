CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_phone VARCHAR(15),
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'tasker', 'admin') DEFAULT 'user',
    user_status ENUM("blocked","unblocked") DEFAULT 'unblocked',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,  -- The user who posted the task
    task_type VARCHAR(255) NOT NULL,
    task_details TEXT NULL,
    task_budget DECIMAL(10, 2),
    task_category VARCHAR(100) NULL,
    task_date VARCHAR(100) NOT NULL,
    task_status ENUM('open', 'assigned', 'completed', 'cancelled') DEFAULT 'open',
    task_location VARCHAR(255),
    is_flexible BOOLEAN DEFAULT FALSE
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE taskers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- Reference to the user who is a tasker
    skills TEXT,
    bio TEXT,
    hourly_rate DECIMAL(10, 2),
    profile_picture VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE task_bids (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,  -- The task being bid on
    tasker_id INT NOT NULL,  -- The tasker bidding
    bid_amount DECIMAL(10, 2),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    bid_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (tasker_id) REFERENCES taskers(id)
);
CREATE TABLE task_completions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,  -- The task being completed
    tasker_id INT NOT NULL,  -- The tasker who completed the task
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating INT CHECK (rating BETWEEN 1 AND 5),  -- Rating given to the tasker
    review TEXT,  -- Review by the user
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (tasker_id) REFERENCES taskers(id)
);
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,  -- The task for which the payment was made
    amount DECIMAL(10, 2),
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
