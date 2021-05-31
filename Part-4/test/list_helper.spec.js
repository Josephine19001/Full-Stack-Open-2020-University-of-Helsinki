const listHelper = require("../utils/list_helper");

const blogs = [
  {
    title: "My blog",
    author: "Josephine Gyamera",
    url: "someurl.com",
    likes: 10,
  },
  {
    title: "My blog",
    author: "John Doe",
    url: "someurl.com",
    likes: 1000,
  },
  {
    title: "My blog",
    author: "Josephine Gyamera",
    url: "someurl.com",
    likes: 111110,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("Total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        title: "My blog",
        author: "Josephine Gyamera",
        url: "someurl.com",
        likes: 10,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(10);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(112120);
  });
});

test("author with the most blogs", () => {
  const result = listHelper.mostBlogs(blogs);
  expect(result).toEqual({
    author: "Josephine Gyamera",
    books: 2
  });
});
