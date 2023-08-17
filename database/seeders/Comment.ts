import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']
  
  public async run () {
    const uniqueKey = 'id'
    
    await Comment.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        postId: 1,
        name: 'SparklingIdeas',
        content: 'Great introduction to SQL!',
      },
      {
        id: 2,
        postId: 2,
        name: 'Wanderlust_Chronicles123',
        content: 'I love the tips in this article!',
      },
      {
        id: 3,
        postId: 3,
        name: 'TechTalesHub',
        content: 'JavaScript is my favorite language!',
      },
      {
        id: 4,
        postId: 4,
        name: 'Serene_Reflections',
        content: 'Cloud computing is changing the game!',
      },
      {
        id: 5,
        postId: 5,
        name: 'culinary_dventures',
        content: 'Time management is something we all struggle with.',
      },
    ])
  }
}