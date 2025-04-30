import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'


export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username:'Caporale',
        lastname:'Levi',
        firstname:'Ackerman',
        role:'admin',
        password:'azerty!',
        codage:236
      },
      {
        username:'Lorem',
        lastname:'Ermin',
        firstname:'Sparow',
        role:'student',
        password:'azerty!',
        codage:234
      }
    ])
  }
}