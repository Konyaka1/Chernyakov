let postModule = (function () {

    let filter = undefined;

    let array = posts;

    let sortByDate = (o1, o2) =>
    {
        return Date.parse(o1.createdAt) - Date.parse(o2.createdAt);
    };

    let getPhotoPosts = (skip = 0, top = 10, filter) =>
    {

        let tmp = array;
        if (typeof skip !== "number" || typeof top !== "number") {
            return [];
        }
        if (!filter) {
            posts.sort(sortByDate);
        }

        if (filter) {
            if (filter.author && (typeof filter.author !== "string" || filter.author.length === 0) ||
                filter.createdAt && !filter.createdAt instanceof Date) {

                return [];
            }

            if (filter.author) {
                tmp = tmp.filter((item) => {
                    return item.author === filter.author;
            })
                ;
            }

            if (filter.createdAt) {
                tmp = tmp.filter((item) => {
                    return Date.parse(item.createdAt) === Date.parse(filter.createdAt);
            })
            }

            if (filter.hashtags) {
                tmp = tmp.filter((item) => {
                    if(typeof item.hashtags === "undefined"
            )
                {
                    return false;
                }
                return filter.hashtags.every((tag) => {
                    return item.hashtags.includes(tag);
            })
            })
            }


        }

        return tmp.slice(skip, skip + top);
    };
    let getPhotoPost = (id) =>
    {
        if (typeof id == "string" && id.valueOf() >= 0) {
            return array.find((item) => item.id == id);
        }
        return -1;
    };
    let validatePost = (post) =>
    {
        if (!post) {
            return false;
        }
        if (post.id === "" || typeof post.id !== "string") {
            return false;
        }
        if (post.description === "" || typeof post.description !== "string")
            return false;
        if (!(post.createdAt instanceof Date))
            return false;
        if (post.author === "" || typeof post.author !== "string")
            return false;
        if (post.photoLink === "" || typeof post.photoLink !== "string")
            return false;
        if (post.rating === null || typeof post.rating !== "number")
            return false;
        return true;
    };
    let addPhotoPost = (post) =>
    {
        if (validatePost(post)) {
            array.push(post);
            array.sort(sortByDate);
            return true;
        } else {
            return false;
        }
    };
    let editPhotoPost = (id, post) =>
    {
        let index = array.findIndex(item => item.id === id
    )
        ;
        if (typeof editPhotoPost === 'undefined') {
            return false;
        }

        if (post.description) {
            array[index].description = post.description;
        }
        if (post.photoLink) {
            array[index].photoLink = post.photoLink;
        }
        if (post.hashtags) {
            array[index].hashtags = post.hashtags;
        }
        return true;
    };
    let removePhotoPost = (id) =>
    {
        if (typeof id == "string" && id.valueOf() >= 0) {
            array.splice(array.findIndex(item => item.id === id), 1
        );
            return true;
        }
        return false;
    };

    return {
        getPhotoPosts,
        getPhotoPost,
        validatePost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }

}());