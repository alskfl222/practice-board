const dummyPostList = new Array(10).fill('').map((_, i) => ({
  id: `${i + 1}`,
  title: `dummy title ${i + 1}`,
  contents: `dummy content ${i + 1}`,
  author: `author ${i + 1}`,
}));
// console.log(dummyPostList)
// const dummyPostList = [
//   {
//     id: 1,
//     title: '불러오고 있습니다',
//     contents: '',
//     author: '1',
//   },
// ];

export default dummyPostList;
