export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
  name: 'authorBio',
  title: 'Author Bio',
  type: 'text',
  rows: 3,
  description: 'A brief 1-2 sentence bio shown at the end of the article'
},
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Constitutional Law',
          'Corporate & Business',
          'Criminal Law',
          'IP & Technology',
          'Family & Civil',
          'International Law',
          'Tax & Revenue',
          'Environmental Law',
          'Opinion'
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time (e.g. 8 min)',
      type: 'string',
    },
    {
      name: 'excerpt',
      title: 'Excerpt (short summary)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
  name: 'mainImage',
  title: 'Main Article Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility'
    }
  ]
},
  {
  name: 'body',
  title: 'Body (full article)',
  type: 'array',
  of: [
    { type: 'block' },
    {
  type: 'image',
  options: { hotspot: true },
  fields: [
    { name: 'alt', title: 'Alt Text', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'string' },
    {
      name: 'size',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small (40% width)', value: 'small' },
          { title: 'Medium (70% width)', value: 'medium' },
          { title: 'Full Width', value: 'full' },
        ],
        layout: 'radio'
      },
      initialValue: 'full'
    }
  ]
}
  ]
},
    {
      name: 'featured',
      title: 'Featured Article?',
      type: 'boolean',
      description: 'Toggle on to show this on the homepage hero'
    }
  ]
}