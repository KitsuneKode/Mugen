import prisma from '../db';
import { ContentType } from '@prisma/client';

async function main() {
  // Clean up existing data if needed (optional - comment out if you don't want to clear the DB)
  await prisma.link.deleteMany({});
  await prisma.brain.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.content.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding database...');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Johnson',
        avatarId: Math.floor(Math.random() * 10),
        email: 'alice@example.com',
        password: 'hashed_password_1', // In a real app, you would use bcrypt to hash passwords
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Smith',
        avatarId: Math.floor(Math.random() * 10),
        email: 'bob@example.com',
        password: 'hashed_password_2',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Alex Johnson',
        avatarId: Math.floor(Math.random() * 10),
        email: 'alex@example.com',
        password: 'hashed_password_4',
      },
    }),
    prisma.user.create({
      data: {
        avatarId: Math.floor(Math.random() * 10),
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        password: 'hashed_password_3',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sarah Chen',
        avatarId: Math.floor(Math.random() * 10),
        email: 'sarah@example.com',
        password: 'hashed_password_5',
      },
    }),
    prisma.user.create({
      data: {
        avatarId: Math.floor(Math.random() * 10),
        name: 'Jack Skellington',
        email: 'jack@example.com',
        password: 'hashed_password_6',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bookworm42',
        email: 'bookworm42@example.com',
        avatarId: Math.floor(Math.random() * 10),
        password: 'hashed_password_7',
      },
    }),
    prisma.user.create({
      data: {
        name: 'MarketingPro',
        avatarId: Math.floor(Math.random() * 10),
        email: 'marketingpro@example.com',
        password: 'hashed_password_8',
      },
    }),
    prisma.user.create({
      data: {
        name: 'NutritionNerd',
        avatarId: Math.floor(Math.random() * 10),
        email: 'nutritionnerd@example.com',
        password: 'hashed_password_9',
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { tag: 'technology' } }),
    prisma.tag.create({ data: { tag: 'design' } }),
    prisma.tag.create({ data: { tag: 'programming' } }),
    prisma.tag.create({ data: { tag: 'science' } }),
    prisma.tag.create({ data: { tag: 'art' } }),
    prisma.tag.create({ data: { tag: 'productivity' } }),
    prisma.tag.create({ data: { tag: 'time-management' } }),
    prisma.tag.create({ data: { tag: 'habits' } }),
    prisma.tag.create({ data: { tag: 'coding' } }),
    prisma.tag.create({ data: { tag: 'web-dev' } }),
    prisma.tag.create({ data: { tag: 'javascript' } }),
    prisma.tag.create({ data: { tag: 'halloween' } }),
    prisma.tag.create({ data: { tag: 'diy' } }),
    prisma.tag.create({ data: { tag: 'seasonal' } }),
    prisma.tag.create({ data: { tag: 'books' } }),
    prisma.tag.create({ data: { tag: 'summaries' } }),
    prisma.tag.create({ data: { tag: 'learning' } }),
    prisma.tag.create({ data: { tag: 'marketing' } }),
    prisma.tag.create({ data: { tag: 'social-media' } }),
    prisma.tag.create({ data: { tag: 'seo' } }),
    prisma.tag.create({ data: { tag: 'food' } }),
    prisma.tag.create({ data: { tag: 'health' } }),
    prisma.tag.create({ data: { tag: 'recipes' } }),
  ]);

  console.log(`Created ${tags.length} tags`);

  // Create content for users with tags
  const contents = await Promise.all([
    // Alice's content
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'Getting Started with Prisma',
        link: 'https://example.com/prisma-article',
        userId: users[0].id,
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[2].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.youtube,
        title: 'UI Design Principles',
        link: 'https://www.youtube.com/shorts/1-qrBRqbEi0',
        userId: users[0].id,
        Tags: {
          connect: [{ id: tags[1].id }, { id: tags[4].id }],
        },
      },
    }),

    // Bob's content
    prisma.content.create({
      data: {
        type: ContentType.youtube,
        title: 'JavaScript Advanced Concepts',
        link: 'https://www.youtube.com/watch?v=tmITb7u662M',
        userId: users[1].id,
        Tags: {
          connect: [{ id: tags[2].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.image,
        title: 'Data Visualization Chart',
        link: 'https://example.com/chart.png',
        userId: users[1].id,
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[3].id }],
        },
      },
    }),

    // Charlie's content
    prisma.content.create({
      data: {
        type: ContentType.reddit,
        title: 'Database Optimization Discussion',
        link: 'https://reddit.com/r/database/example',
        userId: users[2].id,
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[2].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.audio,
        title: 'Podcast on Scientific Discoveries',
        link: 'https://example.com/science-podcast',
        userId: users[2].id,
        Tags: {
          connect: [{ id: tags[3].id }],
        },
      },
    }),
  ]);

  const alexContents = await Promise.all([
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'The Pomodoro Technique Explained',
        link: 'https://example.com/pomodoro',
        userId: users[3].id,
        Tags: {
          connect: [{ id: tags[5].id }, { id: tags[6].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.youtube,
        title: 'Building Better Habits',
        link: 'https://www.youtube.com/watch?v=tmITb7u662M',
        userId: users[3].id,
        Tags: {
          connect: [{ id: tags[7].id }],
        },
      },
    }),
  ]);
  contents.push(...alexContents);

  // Content for Sarah Chen (Web Development Resources)
  const sarahContents = await Promise.all([
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'Modern JavaScript Frameworks Comparison',
        link: 'https://example.com/js-frameworks',
        userId: users[4].id,
        Tags: {
          connect: [
            { id: tags[8].id },
            { id: tags[9].id },
            { id: tags[10].id },
          ],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.youtube,
        title: 'Full Stack Development Tutorial',
        link: 'https://youtube.com/watch?v=fullstack',
        userId: users[4].id,
        Tags: {
          connect: [{ id: tags[9].id }],
        },
      },
    }),
  ]);
  contents.push(...sarahContents);

  // Content for Jack Skellington (Halloween Special)
  const jackContents = await Promise.all([
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'DIY Halloween Decorations',
        link: 'https://example.com/halloween-diy',
        userId: users[5].id,
        Tags: {
          connect: [{ id: tags[11].id }, { id: tags[12].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.image,
        title: 'Halloween Costume Ideas',
        link: 'https://example.com/halloween-costumes.png',
        userId: users[5].id,
        Tags: {
          connect: [{ id: tags[11].id }, { id: tags[13].id }],
        },
      },
    }),
  ]);
  contents.push(...jackContents);

  // Add more content for the remaining public brain users
  // Bookworm42 (Book Summaries)
  const bookwormContents = await Promise.all([
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'Atomic Habits Summary',
        link: 'https://example.com/atomic-habits-summary',
        userId: users[6].id,
        Tags: {
          connect: [{ id: tags[14].id }, { id: tags[15].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'The Psychology of Money Key Takeaways',
        link: 'https://example.com/psychology-money',
        userId: users[6].id,
        Tags: {
          connect: [{ id: tags[14].id }, { id: tags[16].id }],
        },
      },
    }),
  ]);
  contents.push(...bookwormContents);

  // MarketingPro (Digital Marketing Hub)
  const marketingContents = await Promise.all([
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'SEO Strategies for 2024',
        link: 'https://example.com/seo-2024',
        userId: users[7].id,
        Tags: {
          connect: [{ id: tags[17].id }, { id: tags[19].id }],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.youtube,
        title: 'Social Media Marketing Masterclass',
        link: 'https://example.com/social-media-marketing',
        userId: users[7].id,
        Tags: {
          connect: [{ id: tags[17].id }, { id: tags[18].id }],
        },
      },
    }),
  ]);
  contents.push(...marketingContents);

  // NutritionNerd (Healthy Recipes Collection)
  const nutritionContents = await Promise.all([
    prisma.content.create({
      data: {
        type: ContentType.article,
        title: 'Quick Healthy Breakfast Ideas',
        link: 'https://example.com/healthy-breakfast',
        userId: users[8].id,
        Tags: {
          connect: [
            { id: tags[20].id },
            { id: tags[21].id },
            { id: tags[22].id },
          ],
        },
      },
    }),
    prisma.content.create({
      data: {
        type: ContentType.image,
        title: 'Meal Prep Guide',
        link: 'https://example.com/meal-prep.png',
        userId: users[8].id,
        Tags: {
          connect: [{ id: tags[21].id }, { id: tags[22].id }],
        },
      },
    }),
  ]);
  contents.push(...nutritionContents);

  console.log(`Created ${contents.length} content items`);

  // Connect users with tags they're interested in
  await Promise.all([
    prisma.user.update({
      where: { id: users[0].id },
      data: {
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[1].id }, { id: tags[2].id }],
        },
      },
    }),
    prisma.user.update({
      where: { id: users[1].id },
      data: {
        Tags: {
          connect: [{ id: tags[2].id }, { id: tags[3].id }],
        },
      },
    }),
    prisma.user.update({
      where: { id: users[2].id },
      data: {
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[3].id }, { id: tags[4].id }],
        },
      },
    }),
  ]);

  console.log('Connected users with tags');

  // Create brains
  const brains = await Promise.all([
    // Alice's brains
    prisma.brain.create({
      data: {
        name: 'Development Resources',
        share: true,
        description: 'A collection of development resources and articles',
        userId: users[0].id,
        stars: Math.floor(Math.random() * 500),
        Contents: {
          connect: [{ id: contents[0].id }],
        },
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[2].id }],
        },
      },
    }),
    prisma.brain.create({
      data: {
        name: 'Design Inspiration',
        share: false,
        description: 'A collection of design resources and inspiration',
        userId: users[0].id,
        Contents: {
          connect: [{ id: contents[1].id }],
        },
        Tags: {
          connect: [{ id: tags[1].id }, { id: tags[4].id }],
        },
      },
    }),

    // Bob's brain
    prisma.brain.create({
      data: {
        name: 'Learning Materials',
        description: 'A collection of learning resources',
        share: true,
        stars: Math.floor(Math.random() * 500),
        userId: users[1].id,
        Contents: {
          connect: [{ id: contents[2].id }, { id: contents[3].id }],
        },
        Tags: {
          connect: [{ id: tags[2].id }, { id: tags[3].id }],
        },
      },
    }),

    // Charlie's brain
    prisma.brain.create({
      data: {
        name: 'Research Collection',
        share: false,
        description: 'A collection of research papers and discussions',
        userId: users[2].id,
        Contents: {
          connect: [{ id: contents[4].id }, { id: contents[5].id }],
        },
        Tags: {
          connect: [{ id: tags[0].id }, { id: tags[3].id }],
        },
      },
    }),
    // Add the missing await for the last brain creation
    await prisma.brain.create({
      data: {
        name: 'Productivity Mastery',
        share: true,
        stars: Math.floor(Math.random() * 500),

        description:
          'A collection of productivity techniques, tools, and insights to help you get more done with less stress.',
        userId: users[3].id,
        Contents: {
          connect: alexContents.map((content) => ({ id: content.id })),
        },
        Tags: {
          connect: [
            { id: tags.find((t) => t.tag === 'productivity')!.id },
            { id: tags.find((t) => t.tag === 'time-management')!.id },
            { id: tags.find((t) => t.tag === 'habits')!.id },
          ],
        },
      },
    }),

    // Sarah Chen's brain - Web Development Resources
    await prisma.brain.create({
      data: {
        name: 'Web Development Resources',
        share: true,
        stars: Math.floor(Math.random() * 500),

        description:
          'Curated list of articles, tutorials, and tools for modern web development.',
        userId: users[4].id,
        Contents: {
          connect: sarahContents.map((content) => ({ id: content.id })),
        },
        Tags: {
          connect: [
            { id: tags.find((t) => t.tag === 'coding')!.id },
            { id: tags.find((t) => t.tag === 'web-dev')!.id },
            { id: tags.find((t) => t.tag === 'javascript')!.id },
          ],
        },
      },
    }),

    // Jack Skellington's brain - Halloween Special
    await prisma.brain.create({
      data: {
        name: 'Halloween Special',
        share: true,
        stars: Math.floor(Math.random() * 500),

        description:
          'Everything you need for the spookiest time of the year - decorations, costumes, recipes, and more!',
        userId: users[5].id,
        Contents: {
          connect: jackContents.map((content) => ({ id: content.id })),
        },
        Tags: {
          connect: [
            { id: tags.find((t) => t.tag === 'halloween')!.id },
            { id: tags.find((t) => t.tag === 'diy')!.id },
            { id: tags.find((t) => t.tag === 'seasonal')!.id },
          ],
        },
      },
    }),

    // Bookworm42's brain - Book Summaries
    await prisma.brain.create({
      data: {
        name: 'Book Summaries',
        share: true,
        stars: Math.floor(Math.random() * 500),

        description:
          'Concise summaries and key takeaways from popular non-fiction books.',
        userId: users[6].id,
        Contents: {
          connect: bookwormContents.map((content) => ({ id: content.id })),
        },
        Tags: {
          connect: [
            { id: tags.find((t) => t.tag === 'books')!.id },
            { id: tags.find((t) => t.tag === 'summaries')!.id },
            { id: tags.find((t) => t.tag === 'learning')!.id },
          ],
        },
      },
    }),

    // MarketingPro's brain - Digital Marketing Hub
    await prisma.brain.create({
      data: {
        name: 'Digital Marketing Hub',
        share: true,
        stars: Math.floor(Math.random() * 500),

        description:
          'Strategies, case studies, and tools for effective digital marketing in 2024.',
        userId: users[7].id,
        Contents: {
          connect: marketingContents.map((content) => ({ id: content.id })),
        },
        Tags: {
          connect: [
            { id: tags.find((t) => t.tag === 'marketing')!.id },
            { id: tags.find((t) => t.tag === 'social-media')!.id },
            { id: tags.find((t) => t.tag === 'seo')!.id },
          ],
        },
      },
    }),

    // NutritionNerd's brain - Healthy Recipes Collection
    await prisma.brain.create({
      data: {
        name: 'Healthy Recipes Collection',
        share: true,
        userId: users[8].id,
        stars: Math.floor(Math.random() * 500),

        description:
          'Quick, healthy, and delicious recipes for busy professionals.',
        Contents: {
          connect: nutritionContents.map((content) => ({ id: content.id })),
        },
        Tags: {
          connect: [
            { id: tags.find((t) => t.tag === 'food')!.id },
            { id: tags.find((t) => t.tag === 'health')!.id },
            { id: tags.find((t) => t.tag === 'recipes')!.id },
          ],
        },
      },
    }),
  ]);

  console.log(`Created ${brains.length} brains`);

  const links = await Promise.all([
    // Links for original brains
    prisma.link.create({
      data: {
        hash: 'abc123',
        brainId: brains[0].id, // Alice's Development Resources
      },
    }),
    prisma.link.create({
      data: {
        hash: 'def456',
        brainId: brains[2].id, // Bob's Learning Materials
      },
    }),

    // Links for public brains with star counts
    prisma.link.create({
      data: {
        hash: 'prod789',
        brainId: brains[4].id, // Productivity Mastery
      },
    }),
    prisma.link.create({
      data: {
        hash: 'webdev012',
        brainId: brains[5].id, // Web Development Resources
      },
    }),
    prisma.link.create({
      data: {
        hash: 'hween345',
        brainId: brains[6].id, // Halloween Special
      },
    }),
    prisma.link.create({
      data: {
        hash: 'book678',
        brainId: brains[7].id, // Book Summaries
      },
    }),
    prisma.link.create({
      data: {
        hash: 'mktg901',
        brainId: brains[8].id, // Digital Marketing Hub
      },
    }),
    prisma.link.create({
      data: {
        hash: 'food234',

        brainId: brains[9].id, // Healthy Recipes Collection
      },
    }),
  ]);

  console.log(`Created ${links.length} links for shareable brains`);

  console.log('Created links for shareable brains');

  console.log('Database seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
