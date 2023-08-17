import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']
  
  public async run () {
    const uniqueKey = 'id'
    
    await Post.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        userId: 1,
        public: true,
        title: 'Introduction to SQL',
        image: 'information-1641937_1920.jpg',
        content: `**Introduction to SQL: Unveiling the Power of Database Management**

In the digital age, where information is paramount and data rules supreme, the importance of efficient data management cannot be overstated. Enter SQL, a ubiquitous language that empowers developers and businesses to manage, retrieve, and manipulate data stored in relational databases. Whether you're an aspiring developer or a curious soul seeking to unravel the mysteries of database management, this journey into the realm of SQL will be your guiding light.

**What is SQL?**

SQL, which stands for Structured Query Language, is a domain-specific language used to interact with relational database management systems (RDBMS). It serves as a bridge between humans and machines, enabling users to communicate their data-related requests and commands to the database.

**Why SQL Matters**

In the digital landscape, data is the backbone of decision-making. SQL enables efficient data manipulation and retrieval, allowing you to extract valuable insights from massive datasets. It forms the core of various applications, from e-commerce platforms managing inventory to social media networks handling user interactions.

**Key Concepts**

1. **Database:** At the heart of SQL lies the database, a structured collection of data organized into tables, each containing rows and columns.

2. **Tables:** Think of tables as spreadsheets. They consist of columns (fields) that define the types of data stored and rows (records) containing the actual data.

3. **Queries:** SQL's real power shines through queries. These are statements that allow you to retrieve, manipulate, and analyze data from databases. For example, fetching a list of products with their prices or counting the number of registered users.

4. **CRUD Operations:** SQL revolves around CRUD—Create, Read, Update, and Delete. These operations form the foundation of data management. You can create new records, read existing ones, update data, and delete unnecessary entries.

**Basic SQL Commands**

1. **SELECT:** The SELECT statement is your window into the data. It retrieves specific columns or entire rows from a table based on your criteria. For instance:
  \`\`\`sql
  SELECT name, age FROM users WHERE country = 'USA';
  \`\`\`

2. **INSERT:** The INSERT command lets you add new data to a table:
  \`\`\`sql
  INSERT INTO products (name, price) VALUES ('Laptop', 999);
  \`\`\`

3. **UPDATE:** When data needs modification, use the UPDATE statement:
  \`\`\`sql
  UPDATE employees SET salary = 60000 WHERE department = 'IT';
  \`\`\`

4. **DELETE:** The DELETE command removes unwanted data:
  \`\`\`sql
  DELETE FROM orders WHERE status = 'cancelled';
  \`\`\`

**Advanced SQL Concepts**

1. **Joins:** Joins allow you to combine data from multiple tables. Common types include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.

2. **Aggregation:** Aggregation functions like SUM, AVG, COUNT, MIN, and MAX enable you to perform calculations on groups of data.

3. **Subqueries:** Subqueries are queries embedded within other queries, enhancing your ability to retrieve complex data.

**Conclusion**

SQL is a pivotal tool that empowers developers, analysts, and businesses to harness the potential of their data. With SQL, you possess the key to unlocking insights, optimizing operations, and driving informed decision-making. As you delve deeper into this world, you'll uncover the limitless possibilities that emerge when you master the language that bridges the gap between data and wisdom. So, whether you're embarking on a development journey or seeking to enhance your analytical prowess, SQL is your passport to a world of data-driven excellence.
        `
      },
      {
        id: 2,
        userId: 2,
        public: true,
        title: 'Healthy Habits for a Balanced Life',
        image: 'hands-5086503_1920.jpg',
        content: `**Healthy Habits for a Balanced Life: Nurturing Your Mind, Body, and Soul**

In the midst of our fast-paced lives, achieving balance seems like an elusive goal. However, the path to a balanced life is paved with small, sustainable habits that nourish your mind, body, and soul. Embracing these habits can lead to a life where wellness and contentment coexist harmoniously.

**1. Prioritize Sleep**

In a world that glorifies productivity, sleep often takes a backseat. Yet, quality sleep is vital for overall well-being. Establish a consistent sleep schedule, create a calming bedtime routine, and ensure your sleep environment is conducive to rest. Adequate sleep rejuvenates your body, enhances cognitive function, and sets the tone for a productive day ahead.

**2. Nourish Your Body**

Fueling your body with nutritious foods is essential for vitality. Adopt a balanced diet rich in whole grains, lean proteins, fruits, vegetables, and healthy fats. Stay hydrated, listen to your body's hunger cues, and avoid restrictive diets. Remember, eating is not just about sustenance—it's an opportunity to nourish and nurture yourself.

**3. Stay Active**

Regular physical activity is a cornerstone of a balanced life. Find forms of exercise that you genuinely enjoy, whether it's jogging, yoga, dancing, or hiking. Aim for at least 30 minutes of moderate activity most days of the week. Exercise not only improves physical health but also boosts mood, reduces stress, and enhances cognitive function.

**4. Cultivate Mindfulness**

In a world of constant distractions, mindfulness offers a way to anchor yourself in the present moment. Practice meditation, deep breathing, or simply take a few moments each day to observe your surroundings without judgment. Mindfulness cultivates self-awareness, reduces stress, and enhances your ability to cope with life's challenges.

**5. Foster Meaningful Relationships**

Human connections are a cornerstone of well-being. Nurture relationships that bring positivity and support to your life. Spend quality time with loved ones, engage in meaningful conversations, and practice active listening. Meaningful relationships provide emotional nourishment and a sense of belonging.

**6. Limit Screen Time**

While technology has transformed our lives, excessive screen time can negatively impact your well-being. Set boundaries for screen usage, especially before bedtime. Dedicate time to activities that don't involve screens, such as reading, crafting, or spending time outdoors.

**7. Practice Gratitude**

Cultivating gratitude shifts your focus from what's lacking to what's abundant in your life. Start a gratitude journal, where you jot down three things you're grateful for each day. This simple practice fosters a positive outlook, reduces stress, and enhances overall happiness.

**8. Embrace Rest and Relaxation**

Amid life's demands, rest and relaxation are often overlooked. Schedule moments of rest, whether it's taking a leisurely bath, enjoying a cup of tea, or simply sitting in silence. Prioritizing downtime rejuvenates your mind and allows you to recharge.

**9. Pursue Personal Growth**

Learning and growth contribute to a sense of fulfillment. Engage in activities that challenge you intellectually, whether it's learning a new skill, reading diverse books, or attending workshops. Personal growth fosters self-confidence and empowers you to embrace new opportunities.

**10. Practice Self-Compassion**

Be kind to yourself, just as you would to a friend. Treat yourself with the same level of understanding and patience that you extend to others. Embrace imperfections, celebrate achievements, and acknowledge that self-care is not selfish—it's essential for your well-being.

In the pursuit of a balanced life, remember that perfection is not the goal. It's about progress, self-compassion, and a commitment to fostering habits that promote holistic wellness. By nurturing your mind, body, and soul through these healthy habits, you're creating a foundation for a life that thrives in harmony.
        `,
      },
      {
        id: 3,
        userId: 3,
        public: true,
        title: 'Getting Started with JavaScript',
        image: 'javascript-4523100_1920.jpg',
        content: `**Getting Started with JavaScript: Your Gateway to Web Development**

In the dynamic realm of web development, JavaScript stands as a cornerstone language that brings interactivity and functionality to websites and applications. Whether you're a budding developer or someone curious about the language that powers modern web experiences, embarking on your journey with JavaScript is an exciting endeavor. Let's dive into the basics and set the stage for your JavaScript adventure.

**Understanding JavaScript**

JavaScript is a versatile, high-level programming language primarily used for building interactive elements within web pages. Unlike HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets), which focus on structure and design respectively, JavaScript adds behavior to your web content. This dynamic trio works together harmoniously to create the immersive online experiences we've come to expect.

**Key Concepts**

1. **Scripting Language:** JavaScript is often referred to as a scripting language because it's executed by the browser as scripts. These scripts dictate how web pages behave in response to user actions and events.

2. **Client-Side Language:** JavaScript runs on the client side, meaning it's executed within the user's browser. This enables real-time interactions without the need for constant communication with the server.

3. **Syntax and Logic:** JavaScript uses a syntax similar to other programming languages. It incorporates conditionals (if statements), loops (for and while), functions, and more to control program flow and behavior.

**Getting Started**

1. **Setting Up:** No special software is needed to start working with JavaScript. A web browser and a simple text editor are all you need. You can write JavaScript code directly within the \`<script>\` tags in an HTML file or in an external \`.js\` file linked to your HTML.

2. **Hello, World!:** Let's write your first JavaScript program. In an HTML file, add the following code between the \`<script>\` tags within the \`<head>\` section:
  
  \`\`\`html
  <script>
      console.log("Hello, World!");
  </script>
  \`\`\`

3. **Variables:** Variables store data values. Declare a variable using the \`var\`, \`let\`, or \`const\` keyword. For example:
  
  \`\`\`javascript
  var message = "Welcome to JavaScript!";
  \`\`\`

4. **Functions:** Functions are blocks of code that can be reused. Define a function like this:
  
  \`\`\`javascript
  function greet(name) {
      return "Hello, " + name + "!";
  }
  \`\`\`

**Bringing Interactivity**

JavaScript's real magic lies in its ability to make websites interactive. You can respond to user actions, validate forms, and modify HTML and CSS on the fly.

1. **Event Handling:** You can respond to user actions like clicks and keypresses. For example:
  
  \`\`\`javascript
  document.querySelector("#myButton").addEventListener("click", function() {
      alert("Button clicked!");
  });
  \`\`\`

2. **DOM Manipulation:** The Document Object Model (DOM) is a representation of the web page's structure. JavaScript allows you to manipulate the DOM to change content and appearance dynamically.

**Resources for Learning**

1. **Online Tutorials:** Websites like MDN Web Docs, W3Schools, and freeCodeCamp offer comprehensive JavaScript tutorials for beginners.

2. **Interactive Learning:** Platforms like Codecademy and Udacity provide interactive coding challenges to help you practice.

**Conclusion**

JavaScript opens doors to endless possibilities in web development. As you embark on your JavaScript journey, remember that practice and experimentation are your allies. Whether you're building a personal website, crafting interactive forms, or adding visual effects, JavaScript will be your steadfast companion on your path to creating engaging web experiences. Happy coding!
        `,
      },
      {
        id: 4,
        userId: 1,
        public: true,
        title: 'Exploring Cloud Computing',
        image: 'clouds-1282314_1920.jpg',
        content: `**Exploring Cloud Computing: Unleashing the Power of the Virtual Horizon**

In the era of digital transformation, where data is the currency of the modern world, cloud computing emerges as a revolutionary force that reshapes how businesses and individuals leverage technology. This virtual powerhouse is transforming the way we store, access, and manage data, offering unparalleled scalability, flexibility, and innovation. Join us as we embark on a journey to explore the fascinating realm of cloud computing.

**Understanding Cloud Computing**

At its core, cloud computing is the delivery of computing resources—such as servers, storage, databases, networking, software, and analytics—over the internet, often referred to as "the cloud." This eliminates the need for physical hardware and local infrastructure, allowing users to access and utilize resources remotely.

**Key Concepts**

1. **Service Models:** Cloud computing is categorized into three main service models:
  - **Infrastructure as a Service (IaaS):** Provides virtualized computing resources over the internet, including virtual machines, storage, and networking components.
  - **Platform as a Service (PaaS):** Offers a platform that allows developers to build, deploy, and manage applications without worrying about underlying infrastructure.
  - **Software as a Service (SaaS):** Delivers software applications via the cloud, eliminating the need for installation and maintenance.

2. **Deployment Models:** Cloud services can be deployed using different models:
  - **Public Cloud:** Services are offered by third-party providers and accessible to anyone via the internet.
  - **Private Cloud:** Services are dedicated to a specific organization and not shared with others. It can be hosted on-premises or by a third-party provider.
  - **Hybrid Cloud:** Combines public and private cloud resources, allowing data and applications to be shared between them.

**Advantages of Cloud Computing**

1. **Scalability:** Cloud resources can be easily scaled up or down based on demand, ensuring efficient resource utilization and cost savings.

2. **Flexibility:** Users have the flexibility to choose the services they need and pay only for what they use.

3. **Cost-Efficiency:** Cloud computing eliminates the need for upfront infrastructure investments and reduces maintenance costs.

4. **Global Accessibility:** Cloud services can be accessed from anywhere with an internet connection, promoting collaboration and remote work.

5. **Reliability:** Cloud providers offer high levels of redundancy and data backup, minimizing the risk of data loss.

**Real-World Applications**

1. **Businesses:** Cloud computing enables businesses to streamline operations, enhance collaboration, and innovate faster by leveraging scalable and cost-effective IT resources.

2. **Data Analytics:** Cloud platforms offer powerful tools for data processing and analysis, allowing organizations to gain insights from massive datasets.

3. **IoT (Internet of Things):** Cloud computing supports IoT devices by providing the infrastructure to store, process, and analyze data generated by these devices.

4. **Development and Testing:** Cloud platforms provide a sandbox for developers to build, test, and deploy applications without the need for extensive local infrastructure.

**Challenges and Considerations**

1. **Security:** While cloud providers implement robust security measures, data breaches and security vulnerabilities are still concerns.

2. **Vendor Lock-In:** Switching between cloud providers can be challenging due to differences in services and APIs.

3. **Data Privacy:** Compliance with data protection regulations and maintaining data privacy can be complex.

**Conclusion**

Cloud computing represents a paradigm shift in how we approach technology. It empowers businesses to innovate without being burdened by infrastructure concerns and offers individuals access to powerful resources at their fingertips. As cloud technology continues to evolve, it will reshape industries, drive innovation, and unlock new possibilities that were once unimaginable. In a world where the virtual horizon knows no bounds, cloud computing is a force that propels us toward the future.
        `,
      },
      {
        id: 5,
        userId: 2,
        public: true,
        title: 'Effective Time Management Strategies',
        image: 'woman-4118058_1920.jpg',
        content: `**Effective Time Management Strategies: Mastering the Art of Productivity**

In a world filled with endless tasks, commitments, and distractions, effective time management stands as a powerful skill that can elevate your productivity and lead to a more balanced and fulfilling life. The ability to allocate your time wisely can have a profound impact on your personal and professional achievements. Let's delve into some proven strategies that can help you make the most of every moment.

**1. Set Clear Goals**

A journey without a destination is aimless. Setting clear and achievable goals provides you with a sense of purpose and direction. Break your goals into smaller, actionable steps and prioritize them based on their importance and deadlines.

**2. Prioritize Tasks**

The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a valuable tool for prioritization. Categorize tasks into four quadrants: urgent and important, important but not urgent, urgent but not important, and neither urgent nor important. Focus your energy on tasks in the "important but not urgent" quadrant to prevent last-minute rushes.

**3. Plan Ahead**

Taking a few minutes at the beginning or end of the day to plan your tasks can save you hours of confusion and stress. Create a to-do list, schedule tasks in a calendar, or use task management tools to organize your day.

**4. Use the Pomodoro Technique**

The Pomodoro Technique involves breaking your work into focused intervals (typically 25 minutes) followed by a short break. This method can enhance your concentration and prevent burnout.

**5. Eliminate Multitasking**

Contrary to popular belief, multitasking can hinder productivity. Instead, practice monotasking—focusing on one task at a time. This approach improves concentration and leads to better results.

**6. Delegate and Outsource**

You don't have to do everything yourself. Delegate tasks that can be handled by others and consider outsourcing tasks that fall outside your expertise. This frees up your time for tasks that truly require your attention.

**7. Learn to Say No**

Saying yes to every request can spread you thin. Politely decline commitments that don't align with your goals or priorities. Saying no respectfully is a step toward protecting your time.

**8. Minimize Distractions**

Digital distractions, such as social media and constant notifications, can be productivity killers. Turn off non-essential notifications, allocate specific times for checking emails and messages, and consider using website blockers during work sessions.

**9. Batch Similar Tasks**

Group similar tasks together and tackle them in one go. This prevents constant context switching and optimizes your focus and efficiency.

**10. Reflect and Review**

Regularly assess your progress and productivity. Identify areas where you can improve and adjust your strategies accordingly. Continuous self-reflection leads to refinement and growth.

**11. Take Breaks**

Burnout is counterproductive. Regular breaks—whether it's a short walk, deep breathing, or a moment of mindfulness—recharge your energy and maintain your focus.

**12. Learn to Let Go**

Not all tasks are equally important. Learn to let go of tasks that no longer align with your goals or bring minimal value. Sometimes, less is more.

**13. Maintain Work-Life Balance**

Remember that time management isn't just about work. Allocate time for relaxation, hobbies, and spending quality time with loved ones. A well-rounded life is a key to long-term productivity.

**14. Continuous Improvement**

Time management is a skill that evolves. Continuously seek ways to enhance your techniques, experiment with different strategies, and adapt to changing circumstances.

**Conclusion**

Effective time management isn't about squeezing more tasks into your day—it's about making the most of the time you have. By incorporating these strategies into your routine, you'll find yourself with not only increased productivity but also a sense of control, balance, and accomplishment. Remember, time is a limited resource, and how you manage it can shape the trajectory of your success and well-being.
        `,
      },
    ])
  }
}