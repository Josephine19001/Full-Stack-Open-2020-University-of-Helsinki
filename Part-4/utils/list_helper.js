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
  let sumOfBooks = 0;
  let author = "";
  let freqCounter = {}

  for (const key in blogs) {
    if (blogs[key].author) {
      freqCounter[value] = (freqCounter[value] || 0) + 1
    }
  }

  for (const key in freqCounter) {
    
    
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
