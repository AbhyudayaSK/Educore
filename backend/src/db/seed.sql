-- Seed Users
INSERT IGNORE INTO users (id, email, password_hash, name)
VALUES (1, 'test@example.com', '$2b$10$ZAHZOO2O.iUdSaJtNqKuBeeEZYVudMltF5hOkR1CDvIlBjN3SN1L2', 'Test User');

-- Seed Subjects
INSERT IGNORE INTO subjects (id, title, slug, description, thumbnail_url, is_published) 
VALUES 
(1, 'Full-Stack Web Development', 'full-stack-web-dev', 'Learn to build modern web applications from scratch.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', true),
(2, 'Data Science with Python', 'data-DS-python', 'Master data analysis, visualization, and machine learning.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', true),
(3, 'UI/UX Design Essentials', 'ui-ux-design', 'Design beautiful and user-friendly interfaces.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80', true),
(4, 'Advanced React Patterns', 'adv-react-patterns', 'Master higher-order components, render props, and hooks.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80', true),
(5, 'Node.js Architecture', 'nodejs-arch', 'Build scalable and performant backends with Node.js.', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80', true),
(6, 'Mobile Dev with Flutter', 'flutter-mobile', 'Create beautiful native apps for iOS and Android.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', true),
(7, 'Machine Learning Basics', 'ml-basics', 'Introduction to supervised and unsupervised learning.', 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80', true),
(8, 'Cloud with AWS', 'aws-cloud', 'Learn to deploy and manage services on AWS.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', true),
(9, 'Cybersecurity Essentials', 'cyber-essentials', 'Understand threats, vulnerabilities, and defenses.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', true),
(10, 'DevOps & CI/CD', 'devops-cicd', 'Automate delivery with Jenkins, Docker, and K8s.', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80', true),
(11, 'Digital Product Design', 'product-design', 'Strategy and design for successful digital products.', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80', true),
(12, 'Python for Automation', 'python-auto', 'Automate boring tasks with Python scripts.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', true),
(13, 'Modern Go (Golang)', 'go-lang', 'Efficient and concurrent programming with Go.', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80', true),
(14, 'Ethereum & Web3 Development', 'web3-solidity', 'Build decentralized applications with Solidity.', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80', true),
(15, 'Quantum Computing Basics', 'quantum-basics', 'Introduction to qubits, gates, and quantum algorithms.', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80', true);

-- Seed Sections
INSERT IGNORE INTO sections (id, subject_id, title, order_index)
VALUES 
(1, 1, 'Introduction to HTML & CSS', 0),
(2, 1, 'JavaScript Basics', 1),
(3, 1, 'React Fundamentals', 2),
(4, 2, 'Python for Data Science', 0),
(5, 2, 'Pandas & NumPy', 1),
(6, 3, 'Design Principles', 0),
(7, 4, 'React Hooks', 0),
(8, 5, 'Event Loop Deep Dive', 0),
(9, 6, 'Dart Intro', 0),
(10, 7, 'Regressions', 0),
(11, 8, 'EC2 and S3', 0),
(12, 9, 'Network Security', 0),
(13, 10, 'GitOps Flow', 0),
(14, 11, 'Figma Mastery', 0),
(15, 12, 'Scripting Basics', 0),
(16, 13, 'Goroutines', 0),
(17, 14, 'Solidity Basics', 0),
(18, 15, 'Qubits & Gates', 0);

-- Seed Videos
INSERT IGNORE INTO videos (id, section_id, title, description, youtube_url, order_index, duration_seconds)
VALUES 
(1, 1, 'HTML Crash Course', 'Learn the basics of HTML5', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 0, 3600),
(2, 1, 'CSS Crash Course', 'Learn CSS3 for styling websites', 'https://www.youtube.com/watch?v=yfoY53QXEnI', 1, 4200),
(3, 2, 'JavaScript Crash Course', 'JavaScript basics for beginners', 'https://www.youtube.com/watch?v=hdI2bqOjy3c', 0, 5400),
(4, 3, 'React JS Crash Course', 'Learn React 18', 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', 0, 6000),
(5, 4, 'Python Basics', 'Start with Python', 'https://www.youtube.com/watch?v=rfscVS0vtbw', 0, 3000),
(6, 5, 'Pandas Tutorial', 'Data manipulation with Pandas', 'https://www.youtube.com/watch?v=vmEHCJofslg', 0, 4500),
(7, 7, 'UseState and UseEffect', 'Deep dive into hooks', 'https://www.youtube.com/watch?v=O6P86uwfdO0', 0, 1800),
(8, 8, 'Non-blocking I/O', 'How Node works', 'https://www.youtube.com/watch?v=P9csgxBgaZ8', 0, 2400),
(9, 9, 'Flutter Setup', 'Kickstart Flutter', 'https://www.youtube.com/watch?v=VPvVD8t02U8', 0, 1500),
(10, 10, 'Linear Regression', 'Math behind ML', 'https://www.youtube.com/watch?v=CtsRRUddV2s', 0, 2100),
(11, 11, 'AWS IAM Basics', 'Identity & Access', 'https://www.youtube.com/watch?v=Z3SbsBp7mSY', 0, 1200),
(12, 12, 'Firewall Config', 'Securing networks', 'https://www.youtube.com/watch?v=4T9fD8EonU8', 0, 1900),
(13, 13, 'Jenkins Pipeline', 'Build automation', 'https://www.youtube.com/watch?v=7KCS70sCoK0', 0, 2200),
(14, 14, 'Auto-Layout Figma', 'Design faster', 'https://www.youtube.com/watch?v=T_8741Xh-Xk', 0, 1300),
(15, 15, 'File Handling Python', 'OS level scripts', 'https://www.youtube.com/watch?v=Uh2ebFW8OYM', 0, 1100),
(16, 16, 'Concurrency in Go', 'Master Go channels', 'https://www.youtube.com/watch?v=qyM8XAt1RWw', 0, 2500),
(17, 17, 'Solidity Intro', 'Writing smart contracts', 'https://www.youtube.com/watch?v=M576WGiDBdQ', 0, 3200),
(18, 18, 'Intro to Quantum', 'What is a qubit?', 'https://www.youtube.com/watch?v=JhHMJCUmq28', 0, 2700);
