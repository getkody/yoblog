import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run () {
    const uniqueKey = 'id'
    
    await User.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        active: true,
        admin: true,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'somepass',
        bio: `John Doe is a seasoned explorer of both the physical and digital realms. With an insatiable curiosity, he has ventured into the uncharted territories of technology, weaving innovation into his life's tapestry. As an accomplished software engineer, his fingers dance across the keyboard, crafting intricate lines of code that bring digital dreams to life. His expertise spans from crafting elegant front-end interfaces that dazzle users to architecting robust back-end systems that power the modern digital landscape.

Beyond the glow of screens, John's passions extend to the great outdoors. A nature enthusiast, he can be found traversing rugged trails, capturing the beauty of landscapes through the lens of his camera. His fervor for exploration mirrors his approach to problem-solving in the world of technology—pushing boundaries, seeking novel solutions, and embracing the unknown.

John is not only a creator but also a mentor, sharing his wealth of knowledge through workshops and tutorials. His infectious enthusiasm ignites sparks of inspiration in those around him. In the ever-evolving world of technology, John stands as a beacon of innovation, his story an intricate mosaic of digital mastery and a heart that beats for the wonders of creation.
        `,
      },
      {
        id: 2,
        active: true,
        admin: false,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'anotherpass',
        bio: `Jane Smith is a multifaceted individual whose journey weaves through the realms of creativity, advocacy, and community building. With a background in visual arts, she employs her canvas as a means of self-expression, using color, texture, and form to communicate emotions and stories that resonate with viewers. Jane's artworks serve as windows into her soul, inviting observers to explore the depths of human experiences.

Jane's dedication extends to the educational realm, where she has a knack for inspiring learners of all ages. As an educator, she strives to nurture creativity and critical thinking, encouraging her students to embrace their unique talents and perspectives.

With an open heart and a zest for life, Jane Smith continues to paint the world with vibrant strokes of compassion and creativity. Her story is a testament to the power of using one's passions and talents to shape a more colorful and just world.
        `,
      },
      {
        id: 3,
        active: true,
        admin: false,
        firstName: 'Mike',
        lastName: 'Brown',
        email: 'mike@example.com',
        password: 'passagain',
        bio: `Mike Brown embodies the fascinating fusion of two distinct worlds—mechanics and software. With a toolbox in one hand and a laptop in the other, he seamlessly navigates between the tangible realm of engines and the intricate landscapes of code. As a master mechanic, Mike's hands-on skills are a testament to his precision and ingenuity in diagnosing and repairing vehicles.

However, Mike's passion extends beyond the grease and gears. He is a tech-savvy aficionado who revels in the realm of software development. When he's not under the hood of a car, he's immersed in the virtual realm, crafting lines of code that bring innovative solutions to life. His ability to bridge these two worlds sets him apart, allowing him to design digital tools that enhance the mechanics' trade.

Mike's journey is a tale of seamless synergy—an individual who finds beauty in both the symphony of an engine firing to life and the poetry of clean code executing flawlessly. With each turn of a wrench or keystroke, he's a testament to the boundless possibilities that emerge when a passion for mechanics and software meet. His story inspires others to explore the magic that happens at the intersection of the tangible and the digital.
        `,
      },
    ])
  }
}