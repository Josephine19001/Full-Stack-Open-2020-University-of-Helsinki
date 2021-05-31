const dummy = (blogs) => {
  return blogs.push("hello");
};

const totalLikes = (blogs) => {
  const totalLikes = blogs?.reduce((acc, currentBlog) => {
    return acc + currentBlog.likes;
  }, 0);

  return totalLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  let sumOfBooks = 0;
  let author = "";

  for (const key in blogs) {
    if (blogs[key].author) {
      sumOfBooks = sumOfBooks + 1;
      author = blogs[key].author;
    }
  }

  return {
    author: author,
    books: sumOfBooks,
  };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    let sumOfLikes = 0;
    let author = "";

    let freqCounter = {};

    for (const key in blogs) {
        if (blogs[key].author) {
        }
    }
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
};
