class PostsList {

    constructor(posts) {
        this.array = posts;
        this.filter = undefined;
    }

    sortByDate = (o1, o2) => {
        return Date.parse(o2.createdAt) - Date.parse(o1.createdAt);
    };

    getArray = () => {
        return this.array;
    };

    getPage = (skip = 0, top = 10, filter) => {

        if (typeof skip !== "number" || typeof top !== "number") {
            return [];
        }

        let tmp = this.array;

        tmp.sort(this.sortByDate);

        if (filter) {
            if (!(filter.author === '')) {
                tmp = tmp.filter((item) => {
                    return item.author === filter.author;
                });
            }

            if (!(filter.createdAt.toString() === 'Invalid Date')) {
                tmp = tmp.filter((item) => {
                    return item.createdAt.getFullYear() === filter.createdAt.getFullYear() &&
                        item.createdAt.getMonth() === filter.createdAt.getMonth() &&
                        item.createdAt.getDate() === filter.createdAt.getDate();
                });
            }

            if (!(filter.hashtags[0] === '')) {
                tmp = tmp.filter((item) => {
                    return filter.hashtags.every((tag) => {
                        return item.hashtags.includes(tag);
                    })
                });
            }
        }
        return tmp.slice(skip, skip + top);
    };

    get = (id) => {
        if (typeof id == "string" && id.valueOf() >= 0) {
            return this.array.find((item) => item.id === id);
        }
        return -1;
    };

    add = (post) => {
        if (PostsList.validate(post)) {
            this.array.push(post);
            this.array.sort(this.sortByDate);
            return true;
        } else {
            return false;
        }
    };

    edit = (id, post) => {
        let index = this.array.findIndex(item => item.id === id);
        if (typeof this.edit === 'undefined') {
            return false;
        }

        if (post.description) {
            this.array[index].description = post.description;
        }
        if (post.photoLink) {
            this.array[index].photoLink = post.photoLink;
        }
        if (post.hashtags) {
            this.array[index].hashtags = post.hashtags;
        }
        return true;
    };

    remove = (id) => {
        if (typeof id == "string" && id.valueOf() >= 0) {
            this.array.splice(this.array.findIndex(item => item.id === id), 1);
            return true;
        }
        return false;
    };

    removeAll = () => {
        this.array.length = 0;
    };

    static validate = (post) => {
        if (!post) {
            return false;
        }
        if (post.id === "" || typeof post.id !== "string") {
            return false;
        }
        if (post.description === "" || typeof post.description !== "string")
            return false;
        if (post.author === "" || typeof post.author !== "string")
            return false;
        if (post.photoLink === "" || typeof post.photoLink !== "string")
            return false;

        let bool = true;

        post.hashtags.forEach(function (item) {
            if (!(item[0] === '#'))
                bool = false;
        });

        if (bool)
            return true;
        else
            return false;
    };
}