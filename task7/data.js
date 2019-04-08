let posts = [
    {
        id: '1',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-05-02'),
        author: 'Иванов Иван',
        photoLink: 'olya.jpeg',
        hashtags: ['#god'],
        likes: ['god', 'ivan']
    },
    {
        id: '2',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23'),
        author: 'Иванов Иван',
        photoLink: 'olya.jpeg',
        hashtags: ['#god'],
        likes: ['god', 'my']
    },
    {
        id: '3',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23'),
        author: 'ivan',
        photoLink: 'olya.jpeg',
        hashtags: ['#god'],
        likes: ['god', 'my']
    },
    {
        id: '4',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-23'),
        author: 'ivan',
        photoLink: 'olya.jpeg',
        hashtags: ['#god'],
        likes: ['god', 'my']
    },
    {
        id: '5',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-20'),
        author: 'ivan',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#chebur', '#smaga'],
        likes: ['god', 'my']
    },
    {
        id: '6',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-21'),
        author: 'ivan',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '7',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-22'),
        author: 'ivan',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '8',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-23'),
        author: 'ivan',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '9',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-03-20'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '10',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-04-20'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '11',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-05-20'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '12',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-19'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '13',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-01-20'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '14',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-01-21'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '15',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-26'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '16',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-27'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '17',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-28'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '18',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-23'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '19',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-02-24'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '20',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-01-17'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '21',
        description: 'ASDKFKSDFNKSNGFKSJЖенская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2007-01-17'),
        author: 'Vacaboom',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '22',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-01-17'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '23',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2017-01-17'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    },
    {
        id: '24',
        description: 'jsfblnvlrenvlrbvloebvojerbvorbfowbfowbe w vobw owo owebowbefhowebfowvnpwnvowei ow oeb woeb weibfoewbvow ow owv owb',
        createdAt: new Date('2017-01-17'),
        author: 'Vanya',
        photoLink: 'olya.jpeg',
        hashtags: ['#god', '#my'],
        likes: ['god', 'my']
    }
];

let logins = [
    {
        login: 'Vacaboom',
        password: '12345'
    },
    {
        login: 'ivan',
        password: '67890'
    },
    {
        login: 'Иванов Иван',
        password: 'i_am_ivan'
    },
    {
        login: 'Vanya',
        password: 'vanish'
    }
];

let firstScript = (function () {
    let restore = () => {
        localStorage.clear();
        localStorage.setItem('user', 'guest');
        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('logins', JSON.stringify(logins));
    };

    let clear = () => {
        localStorage.clear();
    };

    return {
        restore,
        clear
    }
}());